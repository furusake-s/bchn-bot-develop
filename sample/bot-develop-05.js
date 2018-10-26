// APIで色々やってみる（１）
var pub = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/public.js');
var io_stream = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/realtime-socketio-client.js');

var product_code = 'FX_BTC_JPY';
var decimal_alignment = 4;
var board_num = 10;
var interval = 10000;

var board = {
  mid_price : null,
  asks : {},
  bids : {}
};
var sorted_board = {
	mid_price : null,
	asks : {},
	bids : {}
};

pub.getBoard(product_code, function(err, res, payload){
  if (err) {
    console.log(err);
    return;
  }

  var message = JSON.parse(payload);
  //console.log(message);
  
  board.mid_price = message.mid_price;
    
  for (var i in message.asks.length) {
    var price = message.asks[i].price;
    var size = message.asks[i].size;
    var key = String(price);
    var value = Math.floor(size * Math.pow(10,decimal_alignment))/Math.pow(10,decimal_alignment);
    board.asks[key] = value;
  }
  //console.log(board.asks);
  
  for (var i in message.bids.length) {
    var price = message.bids[i].price;
    var size = message.bids[i].size;
    var key = String(price);
    var value = Math.floor(size * Math.pow(10,decimal_alignment))/Math.pow(10,decimal_alignment);
    board.bids[key] = value;
  }
  //console.log(board.bids);

  io_stream.board(product_code, function(message){
    //console.log(message);
    board.mid_price = message.mid_price;
    
    for (var i in message.asks) {
      var price = message.asks[i].price;
      var size = message.asks[i].size;
      var key = String(price);

      if (size == 0) {
        delete board.asks[key];
      } else {
        var value = Math.floor(size * Math.pow(10,decimal_alignment))/Math.pow(10,decimal_alignment);
        board.asks[key] = value;
      }
    }

    for (var i in message.bids) {
      var price = message.bids[i].price;
      var size = message.bids[i].size;
      var key = String(price);

      if (size == 0) {
        delete board.bids[key];
      } else {
        var value = Math.floor(size * Math.pow(10,decimal_alignment))/Math.pow(10,decimal_alignment);
        board.bids[key] = value;
      }
    }
    sort();
  });
});

function sort() {
  sorted_board.mid_price = board.mid_price;

	var asks_keys = Object.keys(board.asks);
  asks_keys.sort(function(a,b){
    var i = parseInt(a);
    var j = parseInt(b);
    if (i<j) return -1;
    if (i>j) return 1;
  });
  var asks_array = asks_keys.slice(0, board_num);
  var asks = [[],[]];
  for (var i in asks_array) {
    var price = asks_array[i];
    asks[0].push(Number(price));
    asks[1].push(board.asks[price]);
  }
  sorted_board.asks = asks;

  var bids_keys = Object.keys(board.bids);
  bids_keys.sort(function(a,b){
    var i = parseInt(a);
    var j = parseInt(b);
    if (i<j) return 1;
    if (i>j) return -1;
  });
  var bids_array = bids_keys.slice(0, board_num);
  var bids = [[],[]];
  for (var i in bids_array) {
    var price = bids_array[i];
    bids[0].push(Number(price));
    bids[1].push(board.bids[price]);
  }
  sorted_board.bids = bids;
}

setInterval(function(){
  console.log(sorted_board);

  var diff = (sorted_board.asks[0][0] + sorted_board.bids[0][0])/2;
  console.log('diff:',diff,'mid_price:',sorted_board.mid_price);
},interval);

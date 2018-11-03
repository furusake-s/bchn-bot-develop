// APIで色々やってみる（２）
var Decimal = require('decimal.js');
var pub = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/public.js');
var io_stream = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/realtime-socketio-client.js');

// 外部から上書きされる設定変数
var product_code = 'FX_BTC_JPY';
var decimal_alignment = 8;
var board_num = 10;

var board = {
  mid_price : null,
  asks : {},
  bids : {}
};
var sorted_board = {
	mid_price : null,
  unixtime : 0,
  diff : 1,
	asks : [[],[],[]],
	bids : [[],[],[]]
};

exports.start = function(query, callback) {
  // 設定変数の上書き
  product_code = query.product_code;
  decimal_alignment = query.decimal_alignment;
  board_num = query.board_num;

  pub.getBoard(product_code, function(err, res, payload){
    if (err) {
      console.log(err);
      return;
    }

    var data = JSON.parse(payload);
    //console.log(data);
  
    board.mid_price = data.mid_price;
    
    for (var i in data.asks.length) {
      var price = data.asks[i].price;
      var size = data.asks[i].size;
      var key = String(price);
      var value = Math.floor(size * Math.pow(10,decimal_alignment))/Math.pow(10,decimal_alignment);
      board.asks[key] = value;
    }
    //console.log(board.asks);
  
    for (var i in data.bids.length) {
      var price = data.bids[i].price;
      var size = data.bids[i].size;
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
      sorted_board.mid_price = board.mid_price;

	    var asks_keys = Object.keys(board.asks);
      asks_keys.sort(function(a,b){
        var i = parseInt(a);
        var j = parseInt(b);
        if (i<j) return -1;
        if (i>j) return 1;
      });
      var asks_array = asks_keys.slice(0, board_num);
      var asks = [[],[],[]];
      var ask_total_size = new Decimal(0);
      for (var i in asks_array) {
        var price = asks_array[i];
        asks[0].push(Number(price));
        asks[1].push(board.asks[price]);
        ask_total_size = ask_total_size.plus(board.asks[price]);
        asks[2].push(ask_total_size.toNumber());
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
      var bids = [[],[],[]];
      var bid_total_size = new Decimal(0);
      for (var i in bids_array) {
        var price = bids_array[i];
        bids[0].push(Number(price));
        bids[1].push(board.bids[price]);
        bid_total_size = bid_total_size.plus(board.bids[price]);
        bids[2].push(bid_total_size.toNumber());
      }
      sorted_board.bids = bids;

      sorted_board.diff = sorted_board.asks[0][0] - sorted_board.bids[0][0];
      var now = new Date();
      sorted_board.unixtime = now.getTime();

      callback(sorted_board);
    });
  });
};


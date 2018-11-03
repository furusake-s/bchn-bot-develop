// APIで色々やってみる（２）
var b = require("/home/ubuntu/bchn-bot-develop/lib/bitFlyer/board.js");

// 設定変数
var query = {
  product_code : "FX_BTC_JPY",
  decimal_alignment : 4,
  board_num : 5
};

function debug(board) {
  console.log(board);
};

var max_diff = {
  date : Date(),
  diff : 0,
};

function maxDiff(board) {
  if (max_diff.diff <= board.diff) {
    max_diff.date = Date();
    max_diff.diff = board.diff;
    console.log("max_diff:", max_diff);
  }
};

// 設定変数
var trigger_diff = 40;

function triggerDiff(board) {
  if (board.diff >= trigger_diff) {
    console.log("trigger_diff:", trigger_diff, "board:", board);
  }
};

// 設定変数
var x_btc = 10;

function xBtcPrice(board) {
  var x_btc_board = {
    mid_price: board.mid_price,
    diff : 1,
    ask : {
      price : 0,
      size : 0
    },
    bid : {
      price : 0,
      size : 0
    }
  };
  for (var i = 0; i < board.asks[0].length; i++) {
    x_btc_board.ask.price = board.asks[0][i];
    x_btc_board.ask.size = board.asks[2][i];
    if (x_btc_board.ask.size >= x_btc) {
      break;
    }
  }
  for (var j = 0; j < board.bids[0].length; j++) {
    x_btc_board.bid.price = board.bids[0][j];
    x_btc_board.bid.size = board.bids[2][j];
    if (x_btc_board.bid.size >= x_btc) {
      break;
    }
  }
  x_btc_board.diff = x_btc_board.ask.price - x_btc_board.bid.price;
  console.log("x_btc:", x_btc, "board:", x_btc_board);
};

// 設定変数
var tick_interval = 10 * 1000; // 10 * 1000で10秒間隔

function getTicker(start) {
  var now = new Date();
  var time = now.getTime();
  return {
    t : time,  //time
    s : start, //start
    e : start, //end
    h : start, //high
    l : start  //low
  };
};

var ticker = getTicker(null);

function tickerLog(board) {
  if (ticker.s == null) {
    ticker.s = board.mid_price;
    ticker.e = board.mid_price;
    ticker.h = board.mid_price;
    ticker.l = board.mid_price;
  }
  var time = parseInt(ticker.t / tick_interval);
  var now = parseInt(board.unixtime / tick_interval);
  if (now > time) {
    var date = new Date(ticker.t);
    console.log(date, ticker.s, ticker.e, ticker.h, ticker.l);
    ticker = getTicker(ticker.e);
  } else {
    ticker.e = board.mid_price;
    ticker.h = Math.max(ticker.h, board.mid_price);
    ticker.l = Math.min(ticker.l, board.mid_price);
  }
}

b.start(query, function(board){
  debug(board);
  //maxDiff(board);
  //triggerDiff(board);
  //xBtcPrice(board);
  //tickerLog(board);
  return;
});

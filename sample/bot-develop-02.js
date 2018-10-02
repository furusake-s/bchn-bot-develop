// bitFlyerのHTTP Public APIを試してみる
var pub = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/public.js');

// デバッグ用のcallback関数を用意する
function apiDebug(err, res, payload) {
  if (err) {
    console.log(err);
    return;
  }
  var data = JSON.parse(payload);
  console.log(data);
};

// product_codeを設定する
var product_code = 'BTC_JPY';

// queryを設定する
var query = {
  product_code : product_code,
  count : 3
};

// aliasを設定する
var alias = 'BTCJPY_MAT3M';

// from_dateを設定する
var from_date = '2018-10-1';

//pub.getMarkets(apiDebug);
//pub.getBoard(product_code,apiDebug);
//pub.getTicker(product_code,apiDebug);
//pub.getExecutions(query,apiDebug);
//pub.getBoardState(product_code,apiDebug);
//pub.getHealth(product_code,apiDebug);
//pub.getChats(from_date,apiDebug);


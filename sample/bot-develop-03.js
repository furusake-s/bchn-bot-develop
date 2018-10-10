// bitFlyerのHTTP Private APIを試してみる
var pri = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/private.js');

// API Keyの読み込み
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('/home/ubuntu/bchn-bot-develop/config/bitFlyer.json'));

// デバッグ用のcallback関数を用意する
function apiDebug(err, res, payload) {
  if (err) {
    console.log('err:',err);
    return;
  }
  
  console.log('statusCode:', res.statusCode);
  
  if (payload) {
    var data = JSON.parse(payload);
    console.log('payload:', data);
  }
};

//pri.getPermissions(config.all, apiDebug);
//pri.getBalance(config.all, apiDebug);
//pri.getCollateral(config.all, apiDebug);
//pri.getCollateralAccounts(config.all, apiDebug);
//pri.getAddresses(config.all, apiDebug);
/*
var query1 = {
  count : 3,
//  after : '',
//  before : ''
};
pri.getCoinIns(config.all, query1, apiDebug);
*/
/*
var query2 = {
  count : 3,
//  after : '',
//  before : ''
};
pri.getCoinOuts(config.all, query2, apiDebug);
*/
//pri.getBankAccounts(config.all, apiDebug);
/*
var query3 = {
  count : 3,
//  after : '',
//  before : ''
};
pri.getDeposits(config.all, query3, apiDebug);
*/
/*
var body1 = JSON.stringify({
  currency_code : 'JPY',
  bank_account_id : '1234',
  amount : '10000'
});
pri.withdraw(config.all, body1, apiDebug);
*/
/*
var query4 = {
  count:3,
//  after : '',
//  before : ''
};
pri.getWithdrawals(config.all, query4, apiDebug);
*/
/*
var body2 = JSON.stringify({
  product_code : 'FX_BTC_JPY',
  child_order_type : 'LIMIT',
  side : 'BUY',
  price : 730000,
  size : 0.01,
  minute_to_expire : 10,
  time_in_force : 'GTC'
});
pri.sendChildOrder(config.all, body2, apiDebug);
*/
/*
var body3 = JSON.stringify({
  product_code : 'FX_BTC_JPY',
  //child_order_id : '',
  //child_order_acceptance_id : ''
});
pri.cancelChildOrder(config.all, body3, apiDebug);
*/

// 730000を下回った場合0.01BTCを成行で売注文
/*
var body4_1 = JSON.stringify({
  order_method : 'SIMPLE',
  minute_to_expire : 10,
  time_in_force : 'GTC',
  parameters : [
    {
      product_code : 'FX_BTC_JPY',
      condition_type : 'STOP',
      side : 'SELL',
      price : 0,
      size : 0.01,
      trigger_price : 730000
    }
  ]
});
*/
/*
// 760000に0.01BTC売り指値、740000に0.01BTC買い指値して、どちらかが約定したタイミングで片方をキャンセルする
var body4_2 = JSON.stringify({
  order_method : 'OCO',
  minute_to_expire : 10,
  time_in_force : 'GTC',
  parameters : [
    {
      product_code : 'FX_BTC_JPY',
      condition_type : 'STOP_LIMIT',
      side : 'SELL',
      price : 760000,
      size : 0.01,
      trigger_price : 760000
    },
    {
      product_code : 'FX_BTC_JPY',
      condition_type : 'STOP_LIMIT',
      side : 'BUY',
      price : 740000,
      size : 0.01,
      trigger_price : 740000
    }
  ]
});
*/
/*
// 730000に0.01BTC買い指値して、約定したら1000値幅0.01BTCのTRAIL注文（※）を出す
// （※）TRAIL注文：今回の場合、約定後の高値から1000円値下がりしたタイミングで0.01BTCの成行売り注文を出す
var body4_3 = JSON.stringify({
  order_method : "IFD",
  minute_to_expire : 10,
  time_in_force : "GTC",
  parameters : [
    {
      product_code : "FX_BTC_JPY",
      condition_type : "LIMIT",
      side : "BUY",
      price : 730000,
      size : 0.01,
    },
    {
      product_code : "FX_BTC_JPY",
      condition_type : "TRAIL",
      side : "SELL",
      price : 0,
      size : 0.01,
      offset : 1000
    }
  ]
});
*/
/*
// 730000で0.01BTCの買い指値を出し、約定後OCO注文（※）を出す
// （※）OCO注文：今回の場合、729500になったら0.01BTC成行売り注文を出すSTOP注文と、1000値幅0.01BTCのTRAIL注文を出す
var body4_4 = JSON.stringify({
  order_method : 'IFDOCO', // SIMPLE, IFD, OCO, IFDOCO
  minute_to_expire : 10, // 分単位で指定、最大43200(30days)
  time_in_force : 'GTC', // 執行数量条件、GTC, IOC, FOK
  parameters : [ 
    {
      product_code : 'FX_BTC_JPY',
      condition_type : 'LIMIT', // LIMIT, MARKET, STOP, STOP_LIMIT, TRAIL
      side : 'BUY', // BUY or SELL
      price : 730000, // condition_typeがLIMIT or STOP_LIMITの場合は必須
      size : 0.01, // 注文数量
    },
    {
      product_code : "FX_BTC_JPY",
      condition_type : "STOP",
      side : "SELL",
      price : 0,
      size : 0.01,
      trigger_price : 729500, // STOP or STOP_LIMITの場合は必須
    },
    {
      product_code : "FX_BTC_JPY",
      condition_type : "TRAIL",
      side : "SELL",
      price : 0,
      size : 0.01,
      offset : 1000 // TRAILの場合は必須
    }
  ] // order_methodに応じた子注文の内容を記述する
});
*/
//pri.sendParentOrder(config.all, body4_1, apiDebug);
/*
var body5 = JSON.stringify({
  product_code : 'FX_BTC_JPY',
  //parent_order_id : '',
  //parent_order_acceptance_id : ''
});
pri.cancelParentOrder(config.all, body5, apiDebug);
*/

/*
var body6 = JSON.stringify({
  product_code : 'FX_BTC_JPY'
});
pri.cancelAllChildOrders(config.all, body6, apiDebug);
*/
/*
var query5 = {
  product_code : 'FX_BTC_JPY',
  //count : 5,
  child_order_state : 'ACTIVE',
  //parent_order_id : '',
  //after : '',
  //before : '',
};
pri.getChildOrders(config.all, query5, apiDebug);
*/
/*
var query6 = {
  product_code : 'FX_BTC_JPY',
  count : 5,
  //after : '',
  //before : '',
  //parent_order_state : 'CANCELED'
};
pri.getParentOrders(config.all, query6, apiDebug);
*/
/*
var query7 = {
  product_code : 'FX_BTC_JPY',
  //parent_order_id : '',
  parent_order_acceptance_id : 'JRF20181010-042457-934574'
};
pri.getParentOrder(config.all, query7, apiDebug);
*/
/*
var query7 = {
  product_code : 'FX_BTC_JPY',
  count : 5,
  //after : '',
  //before : '',
  //child_order_id : '',
  //child_order_acceptance_id : ''
};
pri.getExecutions(config.all, query7, apiDebug);
*/
/*
var query8 = {
  product_code : 'FX_BTC_JPY'
};
pri.getPositions(config.all, query8, apiDebug);
*/
/*
var query9 = {
  count : 5,
  //after : '',
  //before : ''
};
pri.getCollateralHistory(config.all, query9, apiDebug);
*/
/*
var query10 = {
  product_code : 'FX_BTC_JPY'
};
pri.getTradingCommission(config.all, query10, apiDebug);
*/







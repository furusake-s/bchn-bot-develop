var request = require('request');
var crypto = require('crypto');
var qs = require('querystring');

var base_url = 'https://api.bitflyer.jp';
var getOptions = function(conf, method, path, query) {
  var timestamp = Date.now().toString();
  var text = timestamp + method + path + query;
  var sign = crypto.createHmac('sha256', conf.secret).update(text).digest('hex');
      
  var options = {
    method: method,
    headers: {
      'ACCESS-KEY': conf.key,
      'ACCESS-TIMESTAMP': timestamp,
      'ACCESS-SIGN': sign,
      'Content-Type': 'application/json'
    }
  };

  if (method == "GET") {
    options.url = base_url + path + query;
  } else if (method == "POST") {
    options.url = base_url + path;
    options.body = query;
  }
  return options;
};

exports.getPermissions = function(config, callback){
  var method = 'GET';
  var path = '/v1/me/getpermissions';
  options = getOptions(config, method, path, "");
  request(options, callback);
};

exports.getBalance = function(config, callback){
  var method = 'GET';
  var path = '/v1/me/getbalance';
  options = getOptions(config, method, path, "");
  request(options, callback);
};

exports.getCollateral = function(config, callback){
  var method = 'GET';
  var path = '/v1/me/getcollateral';
  options = getOptions(config, method, path, "");
  request(options, callback);
};

exports.getCollateralAccounts = function(config, callback){
  var method = 'GET';
  var path = '/v1/me/getcollateralaccounts';
  options = getOptions(config, method, path, "");
  request(options, callback);
};

exports.getAddresses = function(config, callback){
  var method = 'GET';
  var path = '/v1/me/getaddresses';
  options = getOptions(config, method, path, "");
  request(options, callback);
};

exports.getCoinIns = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getcoinins';
  query = "?"+qs.stringify(query); // count, before, after
  options = getOptions(config, method, path, query);
  request(options, callback);
};

/* 廃止
exports.sendcoin = function(config, body, callback){
  var method = 'POST';
  var path = '/v1/me/sendcoin';
  
  //body = JSON.stringify({
  //  'currency_code' : 'BTC', // BTC or ETH
  //  'amount' : 0.1234, // 単位はBTC, ETH
  //  'address' : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 
    // 送付先アドレス, ETHの場合、コントラクトアドレスには送付出来ません。
    // ここで指定したアドレスは、自動的に外部アドレスとして登録される。
  //  'additional_fee' : 0.0001, 
    // データサイズに応じた基本手数料に加えて負担する追加手数料を指定する。
    // 上限は0.0005BTCである。
    // ETHの場合は指定できない。
  //});
  options = getOptions(config, method, path, body);
  request(options, callback);
};
*/

exports.getCoinOuts = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getcoinouts';
  query = "?"+qs.stringify(query); // count, before, after
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.getBankAccounts = function(config, callback){
  var method = 'GET';
  var path = 'v1/me/getbankaccounts';
  options = getOptions(config, method, path, "");
  request(options, callback);
};

exports.getDeposits = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getdeposits';
  query = "?"+qs.stringify(query); // count, before, after
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.withdraw = function(config, body, callback){
  var method = 'POST';
  var path = 'v1/me/withdraw';
  /*
  body = JSON.stringify({
    'currency_code' : 'JPY', // 現在はJPYのみ
    'bank_account_id' : 1234, // 出金先口座のid
    'amount' : 12000, // 解約する数量
  });
  */
  options = getOptions(config, method, path, body);
  request(options, callback);
};

exports.getWithdrawals = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getwithdrawals';
  query = "?"+qs.stringify(query); // count, before, after
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.sendChildOrder = function(config, body, callback){
  var method = 'POST';
  var path = '/v1/me/sendchildorder';
  /*
  body = JSON.stringify({
    "product_code": "BTC_JPY", // BTC_JPY, FX_BTC_JPY, ETH_BTC
    "child_order_type: "LIMIT", // LIMIT or MARKET
    "side": "BUY", // BUY or SELL
    "price": 30000, // LIMITの場合は必須
    "size": 0.1, // 注文数量
    "minute_to_expire": 10000, // 分単位で指定、最大525600(365day)
    "time_in_force": "GTC", // 執行数量条件 "GTC", "IOC", "FOK"
  })
  */
  options = getOptions(config, method, path, body);
  request(options, callback);
};

exports.cancelChildOrder = function(config, body, callback){
  var method = 'POST';
  var path = '/v1/me/cancelchildorder';
  /*
  // 注文IDからキャンセルする場合
  body = JSON.stringify({
    "product_code": "BTC_JPY", // BTC_JPY, FX_BTC_JPY, ETH_BTC
    "child_order_id": "JOR20150707-055555-022222" // or "child_order_acceptance_id": "xxx"
  })
  */
  options = getOptions(config, method, path, body);
  request(options, callback);
};

exports.sendParentOrder = function(config, body, callback){
  var method = 'POST';
  var path = '/v1/me/sendparentorder';
  /*
  body = JSON.stringify({
    "order_method": "IFDOCO", // SIMPLE, IFD, OCO, IFDOCO
    "minute_to_expire": 10000, // 分単位で指定、最大525600(365day)
    "time_in_force": "GTC", // 執行数量条件、GTC, IOC, FOK
    "parameters": [ 
      {
        "product_code": "BTC_JPY",
        "condition_type": "LIMIT", // LIMIT, MARKET, STOP, STOP_LIMIT, TRAIL
        "side": "BUY" // BUY or SELL
        "price": 30000, // condition_typeがLIMIT or STOP_LIMITの場合は必須
        "size": 0.1, // 注文数量
      },
      {
        "product_code": "BTC_JPY",
        "condition_type": "STOP_LIMIT",
        "side": "SELL",
        "price": 32000,
        "size": 0.1,
        "trigger_price": 29000, // STOP or STOP_LIMITの場合は必須
      },
      {
        "product_code": "BTC_JPY",
        "condition_type": "TRAIL",
        "side": "SELL",
        "price": "28800",
        "size": 0.1
        "offset": 100 // TRAILの場合は必須
      }
    ] // order_methodに応じた子注文の内容を記述する
  })
  */
  /*
  body = JSON.stringify({
    "order_method": "IFD",
    "minute_to_expire": 10000,
    "time_in_force": "GTC",
    "parameters": [
      {
        "product_code": "BTC_JPY",
        "condition_type": "LIMIT",
        "side": "BUY",
        "price": 30000,
        "size": 0.1,
      },
      {
        "product_code": "BTC_JPY",
        "condition_type": "TRAIL",
        "side": "SELL",
        "offset": 1000
      }
    ]
  })
  */
  options = getOptions(config, method, path, body);
  request(options, callback);
};

exports.cancelParentOrder = function(config, body, callback){
  var method = 'POST';
  var path = '/v1/me/cancelparentorder';
  /*
  // 親注文のIDでキャンセルする場合
  body = JSON.stringify({
    "product_code": "BTC_JPY",
    "parent_order_id": "JCO20150902-055555-022222"   
  })
  */
  /*
  // 新規の親注文を出すAPIの受付IDでキャンセルする場合
  body = JSON.stringify({
    "product_code": "BTC_JPY",
    "parent_order_acceptance_id": "JRF20150902-033333-099999"
  })
  */
  options = getOptions(config, method, path, body);
  request(options, callback);
};

exports.cancelAllChildOrders = function(config, body, callback){
  var method = 'POST';
  var path = '/v1/me/cancelallchildorders';
  /*
  body = JSON.stringify({
    "product_code": "BTC_JPY"
  })
  */
  options = getOptions(config, method, path, body);
  request(options, callback);
};

exports.getChildOrders = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getchildorders';
  /*
  query = {
    product_code = 'BTC_JPY',
    count: 1,
    //after:100 or before: 100,
    //child_order_state: "ACTIVE", // ACTIVE, COMPLETED, CANCELED, EXPIRED, REJECTED
    //parent_order_id: "JCO20150902-033333-022222",
  }
  */
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.getParentOrders = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getparentorders';
  /*
  query = {
    product_code: 'BTC_JPY',
    count: 1,
    //after: 100 or before: 100,
    //parent_order_state: "ACTIVE", // ACTIVE, COMPLETED, CANCELED, EXPIRED, REJECTED
  }
  */
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback)
};

exports.getParentOrder = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getparentorder';
  /*
  query = {
    product_code: 'BTC_JPY',
    parent_order_id: "JCO20150902-033333-022222", // or parent_order_acceptance_id: "JRF2015-099999-055555",
  }
  */
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.getExecutions = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getexecutions';
  /*
  query = {
     product_code: 'BTC_JPY',
     //count: 1,
     //before: 100, //or after:100,
     //child_order_id: "xxx", //or child_order_acceptance_id: "xxx",
  }
  */
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.getPositions = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getpositions';
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.getCollateralHistory = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/getcollateralhistory';
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback);
};

exports.getTradingCommission = function(config, query, callback){
  var method = 'GET';
  var path = '/v1/me/gettradingcommission';
  query = "?"+qs.stringify(query);
  options = getOptions(config, method, path, query);
  request(options, callback);
};


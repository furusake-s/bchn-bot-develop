const WebSocket = require("rpc-websockets").Client;
const ws = new WebSocket("wss://ws.lightstream.bitflyer.com/json-rpc");

exports.board_snapshot = function(product_code, callback){
  var channelName = "lightning_board_snapshot_" + product_code;
  ws.on("open", function(){
    ws.call("subscribe", {
      channel : channelName
    });
  });
  ws.on("channelMessage", function(notify){
    callback(notify);
  });
};

exports.board = function(product_code, callback){
  var channelName = "lightning_board_" + product_code;
  ws.on("open", function(){
    ws.call("subscribe", {
      channel : channelName
    });
  });
  ws.on("channelMessage", function(notify){
    callback(notify);
  });
};

exports.ticker = function(product_code, callback){
  var channelName = "lightning_ticker_" + product_code;
  ws.on("open", function(){
    ws.call("subscribe", {
      channel : channelName
    });
  });
  ws.on("channelMessage", function(notify){
    callback(notify);
  });
};

exports.executions = function(product_code, callback){
  var channelName = "lightning_executions_" + product_code;
  ws.on("open", function(){
    ws.call("subscribe", {
      channel : channelName
    });
  });
  ws.on("channelMessage", function(notify){
    callback(notify);
  });
};


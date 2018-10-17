const io = require('socket.io-client');
const socket = io("https://io.lightstream.bitflyer.com", { transports: ["websocket"] });

exports.board_snapshot = function(product_code, callback){
  var channelName = "lightning_board_snapshot_" + product_code;
  socket.on("connect", function(){
    socket.emit("subscribe", channelName);
  });
  socket.on(channelName, function(message){
    callback(message);
  });
};

exports.board = function(product_code, callback){
  var channelName = "lightning_board_" + product_code;
  socket.on("connect", function(){
    socket.emit("subscribe", channelName);
  });
  socket.on(channelName, function(message){
    callback(message);
  });
};

exports.ticker = function(product_code, callback){
  var channelName = "lightning_ticker_" + product_code;
  socket.on("connect", function(){
    socket.emit("subscribe", channelName);
  });
  socket.on(channelName, function(message){
    callback(message);
  });
};

exports.executions = function(product_code, callback){
  var channelName = "lightning_executions_" + product_code;
  socket.on("connect", function(){
    socket.emit("subscribe", channelName);
  });
  socket.on(channelName, function(message){
    callback(message);
  });
};

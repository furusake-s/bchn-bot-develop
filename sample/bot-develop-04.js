// Socket.IO 2.0 (WebSocket)を用いたサンプルコード
var io_stream = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/realtime-socketio-client.js');


io_stream.board_snapshot('FX_BTC_JPY', function(message){
  console.log(message);
});

/*
io_stream.board('FX_BTC_JPY', function(message){
  console.log(message);
});
*/
/*
io_stream.ticker('FX_BTC_JPY', function(message){
  console.log(message);
});
*/
/*
io_stream.executions('FX_BTC_JPY', function(message){
  console.log(message);
});
*/


// JSON-RPC 2.0 over WebSocketを用いたサンプルコード
//var ws_stream = require('/home/ubuntu/bchn-bot-develop/lib/bitFlyer/realtime-rpc-websockets.js');

/*
ws_stream.board_snapshot('FX_BTC_JPY', function(notify){
  console.log(notify.message);
});
*/
/*
ws_stream.board('FX_BTC_JPY', function(notify){
  console.log(notify.message);
});
*/
/*
ws_stream.ticker('FX_BTC_JPY', function(notify){
  console.log(notify.message);
});
*/
/*
ws_stream.executions('FX_BTC_JPY', function(notify){
  console.log(notify.message);
});
*/

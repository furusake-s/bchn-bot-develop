var request = require('request');
var qs = require('querystring');

var method = 'GET';
var base_url = 'https://api.bitflyer.jp';
var query = {};
var options = {
  url: '',
  method: method,
  headers: {
    'Content-Type': 'application/json'
  }
};

exports.getMarkets = function(callback) {
  var path = '/v1/getmarkets';
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function(err, response, payload){
    callback(err, response, payload);
  });
};

exports.getBoard = function(product_code, callback) {
  var path = '/v1/getboard';
  if (product_code) {
    query.product_code = product_code;
  }
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function(err, response, payload) {
    callback(err, response, payload);
  });
};

exports.getTicker = function(product_code, callback){
  var path = '/v1/getticker';
  if (product_code) {
    query.product_code = product_code;
  }
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function (err, response, payload) {
    callback(err, response, payload);
  });
};

exports.getExecutions = function(query, callback){
  var path = '/v1/getexecutions';
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function (err, response, payload) {
    callback(err, response, payload);
  });
};

exports.getBoardState = function(query, callback){
  var path = '/v1/getboardstate';
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function (err, response, payload) {
    callback(err, response, payload);
  });
};

exports.getHealth = function(query, callback){
  var path = '/v1/gethealth';
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function (err, response, payload) {
    callback(err, response, payload);
  });
};

exports.getChats = function(from_date, callback){
  var path = '/v1/getchats';
  if (from_date) {
    query.from_date = from_date;
  }
  options.url = base_url + path + "?" + qs.stringify(query);
  request(options, function (err, response, payload) {
    callback(err, response, payload);
  });
};


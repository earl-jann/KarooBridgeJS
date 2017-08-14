'use strict';

var debug = require('debug')('KarooBridge::Client');
var RpcBuilder = require('kurento-jsonrpc');
var JsonRpcClient = RpcBuilder.clients.JsonRpcClient;

var names = require('./RpcMethods');

function Client (configuration) {

  if (configuration === undefined) {
    console.error('Configuration is required.');
    return;
  }

  var identifier;
  if (configuration && configuration.identifier) {
    identifier = configuration.identifier;
  }

  var jsonRpcClientWs;

  var connect = () => {
    jsonRpcClientWs = new JsonRpcClient(configuration);
  }

  var close = () => {
    jsonRpcClientWs.close();
  }

  var reconnect = () => {
    jsonRpcClientWs.reconnect();
  }

  var forceClose = () => {
    jsonRpcClientWs.forceClose();
  }

  var request = (identifier) => (method, params, callback) => {
    var _id = identifier + configuration.id + (0 | Math.random() * 1000);
    debug('method: ' + configuration.namespace + '.' + method + ', params: ' + params);
    jsonRpcClientWs.send(configuration.namespace + '.' + method, params, callback);
  }

  var methods = {};
  names.forEach((method) => {
    methods[method] = (identifier, params, callback) => {
      debug('identifier: ' + identifier);
      if (identifier && typeof identifier === 'object') {
        callback = params;
        params = identifier;
        identifier = false;
      }
      request(identifier)(method, params, callback)
    }
  })

  methods.connect = connect;
  methods.request = request(identifier);
  return methods;
}

module.exports = Client;

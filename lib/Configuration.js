'use strict';
var debug = require('debug')('KarooBridge::Configuration');

function Configuration() {

  var connected = false;
  function connectCallback() {
    connected = true;
    debug('connected!');
  }

  function disconnectCallback() {
    connected = false;
    debug('disconnected!');
  }

  function errorCallback(error) {
    debug("Error: " + error);
  }

  function treeStopped(error, response) {
    if(error) {
      debug("Error: " + error);
      return;
    }
    debug("Response: " + response);
  }

  function remoteOnIceCandidate(error, response) {
    if(error) {
      debug("Error: " + error);
      return;
    }
    debug("Response: " + response);
  }

  function sessionStatusChanged(error, response) {
    if(error) {
      debug("Error: " + error);
      return;
    }
    debug("Response: " + response);
  }

  var configuration = {
        hearbeat: 5000,
        sendCloseMessage : false,
        ws : {
          uri : 'temp',
          useSockJS: false,
          onconnected : connectCallback,
          ondisconnect : disconnectCallback,
          onreconnecting : disconnectCallback,
          onreconnected : connectCallback,
          onerror : errorCallback
        },
        rpc : {
          requestTimeout : 15000
          // sessionStatusChanged : sessionStatusChanged
        }
      };

  return configuration;
}

module.exports = Configuration;

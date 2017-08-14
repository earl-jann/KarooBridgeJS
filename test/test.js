'use strict';
var KarooBridge = require('..');
var async = require('async');
var ws_uri = 'ws://localhost:8070';
var debug = require('debug')('karoobridgejs::test');
var config = KarooBridge.Configuration();
// we replace with our configuration
config.identifier = 'earl';
config.namespace = 'namespace';
config['ws']['uri'] = ws_uri;

// this is how the configuration is set up
// var configuration = {
//       namespace : 'namespace',
//       hearbeat: 5000,
//       sendCloseMessage : false,
//       ws : {
//         uri : ws_uri,
//         useSockJS: false,
//         onconnected : connectCallback,
//         ondisconnect : disconnectCallback,
//         onreconnecting : disconnectCallback,
//         onreconnected : connectCallback,
//         onerror : errorCallback
//       },
//       rpc : {
//         requestTimeout : 15000,
//         // treeStopped : treeStopped,
//         // iceCandidate : remoteOnIceCandidate,
//         // sessionStatusChanged : sessionStatusChanged
//       }
//     };

  config['ws']['onconnected'] = function connectCallback() {
    async.series([
      function(){
        // sample for paginated request
        var params = {
          offset : 100,
          limit : 50,
          order_column : 'last_update',
          order_direction : 'ascending'
        };
        client.getListeners(null, params, function(error, response) {
          if (error) {
            debug('Error: ' + error);
            return;
          }
          debug('Response: ' + response);
        });
      },
      function(){
        client.updateListeners(null, null, function(error, response) {
          if (error) {
            debug('Error: ' + error);
            return;
          }
          debug('Response: ' + response);
        });
      }
   ]);
  }

  var client = KarooBridge.Client(config);
  client.connect();

var ws_uri = 'ws://localhost:8070';

var Client = KarooBridgeJS.Client;
var config = KarooBridgeJS.Configuration();
console.log(config);
console.log(JSON.stringify(config));
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
    // sample for paginated request
    var params = {
      offset : 100,
      limit : 50,
      order_column : 'last_update',
      order_direction : 'ascending'
    };
    client.getListeners(null, params, function(error, response) {
      if (error) {
        console.log('Error: ' + error);
        return;
      }
      console.log('Response: ' + response);
    });

    client.updateListeners(null, null, function(error, response) {
      if (error) {
        console.log('Error: ' + error);
        return;
      }
      console.log('Response: ' + response);
    });
  }

  var client = Client(config);
  client.connect();

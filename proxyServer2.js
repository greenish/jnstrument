    var httpProxy = require('http-proxy');
    var url = require('url');
     
    httpProxy.createServer(function(req, res, proxy) {
     
      var urlObj = url.parse(req.url);
      
      req.headers['host'] = urlObj.host;
      req.headers['url'] = urlObj.href;
     
      proxy.proxyRequest(req, res, {
        host: urlObj.host,
        port: 80,
        enable : { xforward: true }
      });
    }).listen(9000, function () {
      console.log("Waiting for requests...");
    });
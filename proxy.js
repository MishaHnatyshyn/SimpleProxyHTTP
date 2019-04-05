const http = require('http');
const request = require('request');

class ProxyServer {
  constructor(){
    this.handler = this.handler.bind(this);
    this.request = this.request.bind(this);
  }

  run(port){
    return http.createServer(this.handler).listen(port);
  }

  request(req, res, options){
    return req.pipe(request(options, (err) => {
      if(err) res.end(JSON.stringify(err));
    }));
  }

  handler(req, res){
    const { method, url, headers } = req;
    const options = {
      method: method,
      url: url.length > 1 && url[0] === '/' ? url.replace('/', '') : url,
      headers: headers
    };
    const proxyRequestStream = this.request(req, res, options);
    proxyRequestStream.pipe(res);
  }
}

module.exports = ProxyServer;

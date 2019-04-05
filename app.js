'use strict';

const ProxyServer = require('./proxy');

const proxyServer = new ProxyServer();
proxyServer.run(8080);

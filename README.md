## simple-express-proxy🗜📡

#### This is simple express proxy web server using https protocol.
Following is simple guide and usage example for quick start.

1. Install package in your application
`
npm install simple-express-proxy
`
2. Write code in your entry point code section

```javascript
const createProxy = require("simple-express-proxy");
const fs = require("fs");

// https server security configuration
const  privateKey  =  fs.readFileSync('./secure/key.pem', 'utf-8');
const  certificate  =  fs.readFileSync('./secure/cert.pem', 'utf-8');

// proxy setup configuration
const passphrase = 'your custom password'; //security key
const target = 'https://google.com'; //target address to serve
const whitelist = ['0.0.0.0', '95.180.41.194']; // ip list to allow access to proxy service

// create proxy server
const proxy = createProxy(privateKey, certificate, passphrase, target, whitelist);

// host proxy
proxy.listen((port, host) => {
	console.log(`https proxy server is running on port ${port} and host ${host}`)
})

```

3. Host your application . 💻

#### Contact to cyberstorm2007@gmail.com, enemymaycry2007@gmail.com to get more supports and utility packages
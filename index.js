const https = require('https'),
    httpProxy = require('http-proxy'),
    fs = require('fs');


const config = require('./config.json');

const privateKey = fs.readFileSync('./secure/key.pem', 'utf-8');
const certificate = fs.readFileSync('./secure/cert.pem', 'utf-8');

const credentials = { key: privateKey, cert: certificate, passphrase: 'jug200712' };

const proxy = httpProxy.createServer({
    changeOrigin: true,
    ssl: credentials,
    secure: true,
});


const server = https.createServer({ ...credentials, rejectUnauthorized: false }, (req, res) => {
    if (config.whitelist.indexOf(req.socket.remoteAddress) >= 0) {
        proxy.web(req, res, { target: config.target, changeOrigin: true });
        console.log(`User IP: ${req.socket.remoteAddress} was accessed.`);
    } else {
        res.end("Sorry, You are not in whitelist");
        console.log(`User IP: ${req.socket.remoteAddress} was kicked.`)
    }
})
server.listen(config.port, config.host, () => {
    console.log(`Proxy server running on port ${config.port}, IP ${config.host}`)
});
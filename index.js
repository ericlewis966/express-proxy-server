const https = require('https'),
    httpProxy = require('http-proxy');

const createProxyServer = (privateKey, certificate, passphrase, target, whitelist) => {
    const credentials = { key: privateKey, cert: certificate, passphrase };

    const proxy = httpProxy.createServer({
        changeOrigin: true,
        ssl: credentials,
        secure: true,
    });

    const server = https.createServer({ ...credentials, rejectUnauthorized: false }, (req, res) => {
        if (whitelist.indexOf(req.socket.remoteAddress) >= 0) {
            proxy.web(req, res, { target: target, changeOrigin: true });
            console.log(`User IP: ${req.socket.remoteAddress} was accessed.`);
        } else {
            res.end("Sorry, You are not in whitelist");
            console.log(`User IP: ${req.socket.remoteAddress} was kicked.`)
        }
    })

    return server
}

module.exports = createProxyServer
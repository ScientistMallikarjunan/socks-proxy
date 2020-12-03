//SOCKS Proxy agent

const SocksClient = require('socks').SocksClient;


class SocksProxy 
{
    constructor()
    {
        this.destinationHost = "100.106.93.113";
        this.destinationPort = 443;
        this.proxyHost = "100.106.93.104";
        this.proxyPort = 1080;
        this.options = {
            proxy: {
                host: this.proxyHost,
                port: this.proxyPort,
                type: 5
            },
            command: 'connect',
            destination: {
                host: this.destinationHost,
                port: this.destinationPort
            }
        };
        this.__initialize();
    }

    __initialize()
    {
        this.__connect(this.options);
    }

    async __connect(options)
    {
        // Async/Await
        try 
        {
            const info = await SocksClient.createConnection(options);
            console.log(info.socket);
            // <Socket ...>  (this is a raw net.Socket that is established to the destination host through the given proxy server)
        } 
        catch (err) 
        {
            // Handle errors
            console.log(err);
        }
    }
}

new SocksProxy();
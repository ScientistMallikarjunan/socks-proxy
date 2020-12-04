/**
 * 
 * 1. Extending the https.Agent
 * 2. Creating a connection to the socks proxy server using socks library
 * 3. Upgrade the socks connection to TLS connection
 * 
 */

const https = require('https');
const url = require('url');
const tls = require('tls');
const { SocksClient } = require('socks');

const { SOCKS_CONSTANTS } = require('./Enums');


class SocksProxyAgent extends https.Agent
{
    constructor(proxyOptions)
    {
        this.proxyOptions = this.parseSocksProxy(proxyOptions);
    }

    /**
     * 
     * Default SOCKS port is consideres as 1080
     * Default type is SOCKS5
     * 
     */
    parseSocksProxy(options)
    {
        let socksProxyOptions = {
            hostname: "",
            port: 1080,
            type: 5
        }
        try
        {
            if(typeof options === 'object')
            {
                socksProxyOptions.hostname = options.hostname;
                if(options.port)
                {
                    socksProxyOptions.port = options.port;
                }
                if(options.type)
                {
                    socksProxyOptions.type = options.type;
                }
                socksProxyOptions.userId = options.userId || options.username;
                socksProxyOptions.password = options.password;
            }
            else if(typeof options === 'string')
            {
                let opts = url.parse(options);
                if(opts.protocol)
                {
                    switch(opts.protocol)
                    {
                        case SOCKS_CONSTANTS.SOCKS4:
                            socksProxyOptions.type = 4;
                            break;
                        case SOCKS_CONSTANTS.SOCKS4A:
                            socksProxyOptions.type = 4;
                            break;
                        case SOCKS_CONSTANTS.SOCKS5:
                        case SOCKS_CONSTANTS.SOCKS5H:
                            socksProxyOptions.type = 5;
                            break;
                        default:
                            socksProxyOptions.type = 5;
                            break;
                    }
                }
                socksProxyOptions.userId = opts.userId || opts.username;
                socksProxyOptions.password = opts.password;
                if (opts.auth) 
                {
                    const auth = opts.auth.split(':');
                    socksProxyOptions.userId = auth[0];
                    socksProxyOptions.password = auth[1];
                }
            }
        }
        catch(err)
        {
            console.log(err);
        }
        console.log(socksProxyOptions);
        return socksProxyOptions;
    }


    async __initialize()
    {
        try
        {
            let socksOptions = {
                proxy: this.proxyOptions,
                command: 'connect',
                destination: ''
            };
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

export default SocksProxyAgent;
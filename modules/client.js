const net = require('net'); const fs = require('fs'); const websocket = require('ws'); const axios = require('axios'); const events = require('events');
const { resolve } = require('path'); const http = require('http');
const { emitWarning, emit } = require('process');


var emitter = new events.EventEmitter(); 
const sleep = s => new Promise(e => setTimeout(e, s)); 


class SonicClient {
    constructor () {
        this.api_url = `https://discord.com/api/v9`;
        this.gateway_url = `wss://gateway.discord.gg/?v=6&encoding=json?=&compress=true`;
        this.events = emitter;
        this.user = {}
    }

    async login(token) {
        this.token = token;
        this.headers = this.get_headers();
        if (await this.check_client_token()) {
            this.check_client_guilds()
            this.conect_to_gateway();
        } else {
            throw new Error('An Invalid Token Was Provided!')
        }
    }

    async conect_to_gateway () {
        this.websocket = new websocket(this.gateway_url);
        
        this.websocket.on('open', async () => {
            this.websocket.send(JSON.stringify({
                op: 2,
                d: {
                    token: this.token,
                    properties: {
                        $os: 'linux',
                        $browser: 'chrome',
                        $device: 'chrome'
                    },
                    
                    presence: {
                        status: 'online',
                        since: 0,
                        activities: [],
                        afk: false
                    }
                }
            }));
        })

        this.websocket.onmessage = function (event) {
            let response = JSON.parse(event.data);
            
            if (response.op === 10) {  send_heartbeat(response.d.heartbeat_interval); }

            switch (response.t) {
                case "READY":
                    emitter.emit('ready', this)
                break;
                //case "MESSAGE_CREATE":
                //    emitter.emit('messageCreate', response.d)
                //break;
                //case "MESSAGE_DELETE":
                //    emitter.emit('messageDelete', response.d)
                vbreak;
                //case "MESSAGE_UPDATE":
                    emitter.emit('messageUpdate', response.d)
                //break;

                case "GUILD_UPDATE":
                    emitter.emit('guildUpdate', response.d)
                break;

            }
        }

        this.websocket.onclose = function (event) {
            console.log(event)
        }
        
        const send_heartbeat = (ms) => { return setInterval(() => { this.websocket.send(JSON.stringify({ op: 1, d: null })); emitter.emit('heartbeat') }, ms ); };      

    }

    async check_client_token() {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get(`${this.api_url}/users/@me`, {
                    headers: this.headers
                });

                this.user.id = response.data.id;
                this.user.username = response.data.username;
                this.user.discriminator = response.data.discriminator;
                this.user.tag = response.data.username + '#' + response.data.discriminator;
                this.user.flags = response.data.flags
    
                if (response.status == 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            } catch (e) {
                resolve(false)
            }
        });
    }

    async check_client_guilds() {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.get(`${this.api_url}/users/@me/guilds`, {
                    headers: this.headers
                });
                //console.log(response.data)
                this.guilds = response.data.length
            } catch (e) {
                console.log(e)
                resolve(false)
            }
        });
    }

    
    

    async change_vanity(guild_id, vanity, token) {
        return new Promise(async (resolve, reject) => {
            try {
                let response = await axios.patch(`${this.api_url}/guilds/${guild_id}/vanity-url`, {
                    code: vanity
                }, {
                    headers: {
                        //'Accept': '*/*', 
                        'Host': 'discord.com', 
                        'Connection': 'keep-alive',
                        'sec-ch-ua': '"Chromium";v="114", " Not A;Brand";v="99", "Google Chrome";v="114"',
                        'X-track': `eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA3LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL2Rhc2hib2FyZC5ib3RnaG9zdC5jb20vIiwicmVmZXJyaW5nX2RvbWFpbiI6ImRhc2hib2FyZC5ib3RnaG9zdC5jb20iLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTYxNjQyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==`,
                        'Accept-Language': 'en-US', 
                        'sec-ch-ua-mobile': '?0',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                        'Content-Type': 'application/json', 
                        'Authorization': token,
                        'Origin': 'https://discord.com',
                        'Sec-Fetch-Site': 'same-origin', 
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Dest': 'empty', 
                        'Referer': 'https://discord.com/channels/@me',
                        'X-Debug-Options': 'bugReporterEnabled',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Cookie': 'OptanonConsent=version=6.17.0; locale=th'
                    }
                });
                //console.log(response.data)
                resolve(response.data)
            } catch (e) {
                console.log(e)
                resolve(false)
            }
        });
    }


    get_headers() {
        return {
            'Accept': '*/*', 
            'Host': 'discord.com', 
            'Connection': 'keep-alive',
            'sec-ch-ua': '"Chromium";v="114", " Not A;Brand";v="99", "Google Chrome";v="114"',
            'X-Super-Properties': `eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNy4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTA3LjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiJodHRwczovL2Rhc2hib2FyZC5ib3RnaG9zdC5jb20vIiwicmVmZXJyaW5nX2RvbWFpbiI6ImRhc2hib2FyZC5ib3RnaG9zdC5jb20iLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTYxNjQyLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==`,
            'Accept-Language': 'en-US', 
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Content-Type': 'application/json', 
            'Authorization': this.token,
            'Origin': 'https://discord.com',
            'Sec-Fetch-Site': 'same-origin', 
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty', 
            'Referer': 'https://discord.com/channels/@me',
            'X-Debug-Options': 'bugReporterEnabled',
            'Accept-Encoding': 'gzip, deflate, br',
            'Cookie': 'OptanonConsent=version=6.17.0; locale=th'
        }
    }
}

module.exports.SonicClient = SonicClient;
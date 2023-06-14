const Logger = require('./modules/logger'); const Webhook = require('./modules/webhook'); 
const config = require('./config.json'); const { SonicClient } = require('./modules/client.js');

;(async () => {

    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }
    
    let ratelimit_webhook = new Webhook(config.logging.ratelimit.id, config.logging.ratelimit.token)
    let success_webhook = new Webhook(config.logging.successs.id, config.logging.successs.token)
    let error_webhook = new Webhook(config.logging.errror.id, config.logging.errror.token)
    let logger = new Logger();

    logger.Success('Successfully loaded logging webhooks.')

    let client = new SonicClient();

    //console.log(config.upgraded_servers.random())

    client.events.on('ready', async () => {

        let target_vanities = ``;

        config.target_servers.forEach(w => {
            target_vanities += `\n> <:5251onlinestatus:1112014422416838788> Server: \`${w}\` • Vanity: \`${config.target_vanity[w]}\``
        })

        logger.Success(`Successfully logged in as : ${client.user.tag} | Guilds : ${client.guilds}`)
        success_webhook.send_success_message('Sniper Websocket Started 🟢', `<a:Discord:1087300413084155924> • \`Username\` » \`${client.user.tag}\`\n<a:Discord:1087300413084155924> • \`Guilds\` » \`${client.guilds}\`\n<a:Discord:1087300413084155924> • \`Websocket Stable\` » \`True\`\n<a:Discord:1087300413084155924> • \`Heartbeat Inverval\` » \`Enabled\`\n\n**Sniping List:**${target_vanities}`, '#303037')
    })

    client.events.on('guildUpdate', async (data) => {
        if (config.target_servers.includes(data.id)) {
            if (!data.vanity_url_code) {
                let time = new Date()
                let random_server_data = config.upgraded_servers.random()
                let time_snipe =  Math.abs(new Date() - time)/1000 + 's'
                let change_response = await client.change_vanity(random_server_data.server_id, config.target_vanity[data.id], random_server_data.token)
                let time_response = Math.abs(new Date() - time)/1000 + 's'

                if (change_response !== false) {
                    success_webhook.send_success_message('Vanity Sniped 🎊 | Server\'s Vanity Was Removed!', `<a:Discord:1087300413084155924> • \`Server\` » \`${data.id}\`\n<a:Discord:1087300413084155924> • \`Vanity\` » \`${config.target_vanity[data.id]}\`\n<a:Discord:1087300413084155924> • \`Token\` » \`${random_server_data.token.split('.')[0]}.*********\`\n<a:Discord:1087300413084155924> • \`Fetch Time\` » \`${time_snipe}\`\n<a:Discord:1087300413084155924> • \`Response Time\` » \`${time_response}\``, '#303037')
                    logger.Success(`Successfully sniped ${config.target_vanity[data.id]} | ${data.id} | ${change_response} | ${time_snipe} | ${time_response}`)
                }

                return;
            }

            if (data.vanity_url_code != config.target_vanity[data.id]) {
                let time = new Date()
                let random_server_data = config.upgraded_servers.random()
                let time_snipe =  Math.abs(new Date() - time)/1000 + 's'
                let change_response = await client.change_vanity(random_server_data.server_id, config.target_vanity[data.id], random_server_data.token)
                let time_response = Math.abs(new Date() - time)/1000 + 's'

                if (change_response !== false) {
                    success_webhook.send_success_message('Vanity Sniped 🎊 | Server\'s Vanity Changed', `<a:Discord:1087300413084155924> • \`Server\` » \`${data.id}\`\n<a:Discord:1087300413084155924> • \`Vanity\` » \`${config.target_vanity[data.id]}\`\n<a:Discord:1087300413084155924> • \`Token\` » \`${random_server_data.token.split('.')[0]}.*********\`\n<a:Discord:1087300413084155924> • \`Fetch Time\` » \`${time_snipe}\`\n<a:Discord:1087300413084155924> • \`Response Time\` » \`${time_response}\``, '#303037')
                    logger.Success(`Successfully sniped ${config.target_vanity[data.id]} | ${data.id} | ${change_response} | ${time_snipe} | ${time_response}`)
                }
            }

            return;
        }
    })

    client.login(config.sniping_token).catch(e => { logger.Error(e); error_webhook.send_error_message(e) })
})()
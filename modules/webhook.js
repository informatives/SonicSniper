const { WebhookClient, MessageEmbed } = require('discord.js'); const config = require('../config.json')

class Webhook {
    constructor(id, token) {
        this.id = id;
        this.token = token;
        this.client = new WebhookClient({ id: id, token: token });
    }


    send_error_message(message) {
        let embed = new MessageEmbed()
        .setTitle('Error Occured ❌')
        .setDescription(`\`\`\`${message}\`\`\``)
        .setColor('RED')
        .setTimestamp()
        .setFooter('» Sonic Sniper | v1.0.0')

        this.client.send({ embeds: [embed] })
    }

    send_success_message(title, message, color) {
        let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(`\`\`\`${message}\`\`\``)
        .setColor(color)
        .setTimestamp()
        .setFooter('» Sonic Sniper v1.0.0')

        this.client.send({ embeds: [embed] })
    }

    send_success_message(title, message, color) {
        let embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(`${message}`)
        .setColor(color)
        .setTimestamp()
        .setFooter('» Sonic Sniper v1.0.0')

        this.client.send({ content: `||@everyone||`, embeds: [embed] })
    }
}


module.exports = Webhook;
const lineReplyNoMention = require('discord-reply');
module.exports = {
    name: 'ping',
    permissions: ["SEND_MESSAGES"],
    clientpermissions: ["SEND_MESSAGES"],
    cooldown: 2,
    description: "this is a ping command!",
    async execute(client, message, cmd, args, Discord) {
        const fakping = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('#c30202')
            .setAuthor(`${message.author.username} 🏓 PONG!`, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Why Da F@k You Ping Me? \nIF You Need Help You Can Do \`x!help\` And Get My CMDS!**`)
        return message.lineReplyNoMention(fakping)
    }
}
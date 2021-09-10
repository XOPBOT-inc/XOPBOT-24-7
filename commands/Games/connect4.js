const { XOPConnect4 } = require("xoppack")

module.exports = {
    name: "connect4",
    cooldown: 10,
    permissions: ["SEND_MESSAGES"],
    clientpermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    description: "connect4 in discord!",
    async execute(client, message, cmd, args, Discord) {
        if (!args[0]) {
            const noch = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('#c30202')
                .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`**\`(prefix)connect4 <@user>\`**`)
            return message.lineReplyNoMention(noch)
        }
        new XOPConnect4({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: 'Connect 4 v2',
                color: '#c30202',
            },
            emojis: {
                player1: '🔴',
                player2: '🟡'
            },
            turnMessage: 'Its Now **{player}** Turn!',
            winMessage: '**{winner}** Won The Game!',
            gameEndMessage: 'The Game Was Unfinished!',
            drawMessage: 'The Game Ended With A Draw!',
            askerMessage: 'Hey **{opponent}**, **{challenger}** Challenged You For A Game Of Connect 4!',
            cancelMessage: 'Looks Like They Didn\`t Want To Play!',
            timerEndMessage: 'Since The Opponent Didnt Answer, I Ended The Game!',
        }).startGame();
    },
};
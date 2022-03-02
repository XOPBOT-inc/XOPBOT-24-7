const lineReplyNoMention = require('discord-reply');
const color = process.env.Color;
const { MessageButton, MessageActionRow } = require("discord-buttons");
module.exports = {
  name: "ticket",
  cooldown: 10,
  aliases: ['ticket-set'],
  permissions: ["SEND_MESSAGES"],
  clientpermissions: ["SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS"],
  description: "open a ticket!",
  async execute(client, message, cmd, args, Discord) {

    if (cmd === 'ticket-set') {
      message.guild.channels.create("Tickets", {
        type: "category",
        topic: "All the tickets will be here :D",
      })
      const succestxtc = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(`${color}`)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('**The \`Ticket`s\` Category Is Now Setup! 😉**')

      message.lineReplyNoMention(succestxtc)
    }

    else if (cmd === 'ticket') {
      const category = message.guild.channels.cache.find((x) => x.name == "Tickets")

      if (!category) {
        return message.lineReplyNoMention({ content: "**XOPBOT Ticket System Not Setup! Do `(prefix)ticket-set`**" })
      }

      const channel = await message.guild.channels.create(`ticket: ${message.author.tag}`, {
        type: 'text',
        parent: category.id,
        topic: `Ticket Made For ${message.author.username}`
      });

      channel.updateOverwrite(message.guild.id, {
        SEND_MESSAGE: false,
        VIEW_CHANNEL: false,
      });
      channel.updateOverwrite(message.author, {
        SEND_MESSAGE: true,
        VIEW_CHANNEL: true,
      });
      const button11 = new MessageButton()
        .setStyle('green')
        .setID('yes')
        .setLabel('Lock')
        .setEmoji('🔒')

      const button1 = new MessageButton()
        .setStyle('red')
        .setID('no')
        .setLabel('Close')
        .setEmoji('⛔')

      const row = new MessageActionRow()
        .addComponents(button11, button1);

      const supportembedy = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(`${color}`)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('**Hello There, You Contacted Support. Please Wait! \nAccidentely Opened This? React With \`⛔\` To Close It!**')

      await channel.send(supportembedy, row);

      const deltxtc = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(`${color}`)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription('**Incoming Air Strike ✈️💣! Channel Delteting In 5 Seconds!**')
        .setFooter(`Say Goodbye To ${channel.name}!`)

      const locktxtc = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(`${color}`)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**The Channel Has Now Been Locked 🔒! The Staff Will Reply Soon!**`)
        .setFooter('Successfully Locked The Channel!')

      client.on("clickButton", async (button) => {
        if (button.id === 'yes') {
          channel.send(locktxtc).then(() => {
            setTimeout(() => locktxtc.delete(), 10000)
          })
        } else if (button.id === 'no') {
          channel.send(deltxtc);
          setTimeout(() => channel.delete(), 5000)
        }
        button.reply.defer();
      });

      const embed101 = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(`${color}`)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Hey, The Server Moderator(s) Will Be Right Wth You! \nMake Sure To Check The TXTC ${channel} For Responses!**`)
        .setFooter(`Opened By ${message.author.username}`)

      message
        .lineReplyNoMention(embed101)
        .then(() => {
          setTimeout(() => message.delete(), 7000);
          // setTimeout(() => message.delete(), 3000);
        })
        .catch((err) => {
          throw err;
        });
    }
  },
};

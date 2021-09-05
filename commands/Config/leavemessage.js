const Discord = require("discord.js")
const LeaveMsgSchema = require("../../models/leavemessage");
const lineReplyNoMention = require('discord-reply');
module.exports = {
  name: "leavemessage",
  cooldown: 10,
  permissions: ["MANAGE_CHANNELS"],
  clientpermissions: ["MANAGE_CHANNELS", "SEND_MESSAGES", "EMBED_LINKS"],
  description: "Change the welcome message per server!",
  aliases: ["leavemsg", "goodbyemsg", "lmsg"],
  async execute(client, message, cmd, args, Discord) {
    const text = args.join(" ");
    if (!args[0]) {
      const nopr = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor('#c30202')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**\`(prefix)leavemessage <text/off>\`**`)
      return message.lineReplyNoMention(nopr)
    }
    if (text !== "off") {
      const data = await LeaveMsgSchema.findOne({
        GuildID: message.guild.id,
      });

      if (data) {
        await LeaveMsgSchema.findOneAndRemove({
          GuildID: message.guild.id,
        });
        let newData = new LeaveMsgSchema({
          ByeMsg: args.join(" "),
          GuildID: message.guild.id,
        });
        newData.save();
        const lvmsg1 = new Discord.MessageEmbed()
          .setTimestamp()
          .setColor('#c30202')
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`**Leave Message Set To \`${newData.ByeMsg}\`!**`)
        message.lineReplyNoMention(lvmsg1)

      } else if (!data) {

        let newData = new LeaveMsgSchema({
          ByeMsg: args.join(" "),
          GuildID: message.guild.id,
        });
        newData.save();
        const lvmsg2 = new Discord.MessageEmbed()
          .setTimestamp()
          .setColor('#c30202')
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`**Leave Message Set To \`${newData.ByeMsg}\`!**`)
        message.lineReplyNoMention(lvmsg2)

      }
    } else if (text === "off") {
      const data2 = await LeaveMsgSchema.findOne({
        GuildID: message.guild.id,
      });

      if (data2) {
        await LeaveMsgSchema.findOneAndRemove({
          GuildID: message.guild.id,
        });

        const lvnoset = new Discord.MessageEmbed()
          .setTimestamp()
          .setColor('#c30202')
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`**Leave Message Has Been \`🔴 Disabled\`!**`)
        return message.lineReplyNoMention(lvnoset)

      } else if (!data2) {
        const lvsetno = new Discord.MessageEmbed()
          .setTimestamp()
          .setColor('#c30202')
          .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`**Leave Message Not Even Setup Bot!**`)
        return message.lineReplyNoMention(lvsetno)
      }
    }
  },
};
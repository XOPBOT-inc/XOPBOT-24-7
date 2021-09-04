const lineReplyNoMention = require('discord-reply');
const errorChannel = process.env.errorChannel;
module.exports = {
  name: 'kick',
  clientpermissions: ["KICK_MEMBERS", "SEND_MESSAGES", "EMBED_LINKS"],
  permissions: ["KICK_MEMBERS"],
  cooldown: 5,
  description: "This Command Kicks Member",
  async execute(client, message, cmd, args, Discord) {
    try {
      const member = message.mentions.users.first()
      if (!args[0]) {
        return message.lineReplyNoMention({ content: '**`(prefix)kick <@user> <reason>`**' })//, allowedMentions: { repliedUser: true } })
      }
      const reason = args.slice(1).join(" ")
      if (!reason) return message.lineReplyNoMention({ content: "**Please Specify A Reason!**" })//, allowedMentions: { repliedUser: true } })

      if (message.author.id === member.id) {
        return message.lineReplyNoMention({ content: '**Are You Alright? You Can Not Kick Yourself!**' })//, allowedMentions: { repliedUser: true } });
      }
      if (member.id === client.user.id) {
        return message.lineReplyNoMention({ content: `**You Can Not Ban Me Through Me Lol!**` })
      }

      // if (message.member.roles.highest.position < member.roles.highest.position) {
      //   return message.lineReplyNoMention({ content: '**That User Has Higher Role Than Me!**' })
      // }

      if (member.id === message.guild.owner.id) {
        return message.lineReplyNoMention({
          content:
            '**You Jerk, How You Can Kick Server Owner! 👿**' //, allowedMentions: { repliedUser: true }
        });
      }

      if (member) {
        const memberTarger = message.guild.members.cache.get(member.id);
        const embed = new Discord.MessageEmbed()
          .setTimestamp()
          .setColor('#c30202')
          .setTitle(`You Were Kicked From ${message.guild.name}`)
          .setDescription(`**Kicked By: ${message.author.username} \nReason: \`${reason}\`**`)
        memberTarger.send(embed).catch(() => message.lineReplyNoMention({ content: `**Could Not Send To <@${memberTarger.user.id}> Reason Of Kick!**` }))
        message.guild.member(memberTarger).kick({ reason: `**Kicked By ${message.author.username} \nReason: \`${reason}\`**` }).catch(() => message.lineReplyNoMention({ content: `**Could Not Kick <@${memberTarger.user.id}>!**` }))
          .then(() => message.lineReplyNoMention({ content: `**<@${memberTarger.user.id}> Has Been Kicked For ${reason}!**` }))
      } else {
        message.lineReplyNoMention({ content: '**You Cant Kick This Member Because It Dont Exist!**' });
      }
    } catch (err) {
      const errorlogs = client.channels.cache.get(errorChannel);
      message.lineReplyNoMention({ content: "**Looks Like An Error Has Occured!**" });
      errorlogs.send({ content: `**Error On Kick Command!\n\nError:\n\n ${err}**` })
    }
  }
}
const fetch = require("node-fetch");
const lineReplyNoMention = require('discord-reply');
module.exports = {
  name: "anime",
  permissions: ["SEND_MESSAGES"],
  clientpermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  cooldown: 10,
  category: "info",
  aliases: ["kitsu"],
  description: "Get anime information",
  usage: "`a!anime <anime_name>`",
  async execute(client, message, cmd, args, Discord) {

    if (!args.length) {

      return message.lineReplyNoMention({ content: "**`(prefix)anime <animename>`**" })

    }
    await message.lineReplyNoMention({ content: "**Loading Anime....**" })

    try {

      let body = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${args.join(" ")}`)

      body = await body.json()

      const embed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle(body.data[0].attributes.slug)
        .setColor('#c30202')
        .setDescription(body.data[0].attributes.synopsis)
        .setThumbnail(body.data[0].attributes.posterImage.original)
        .addField("Ratings", body.data[0].attributes.averageRating)
        .addField("TOTAL EPISODES", body.data[0].attributes.episodeCount)
        .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL())

      //.setImage(body.data[0].attributes.coverImage.large)

      //try it
      message.lineReplyNoMention(embed)
    } catch (err) {


      return message.lineReplyNoMention({ content: "**XOPBOT Was Unable To Find This Anime Series!**" });

    }

  }

}
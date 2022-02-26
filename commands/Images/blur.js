const lineReplyNoMention = require("discord-reply");
const color = process.env.Color;
const DIG = require("discord-image-generation");
module.exports = {
    name: "blur",
    cooldown: 10,
    permissions: ["SEND_MESSAGES"],
    clientpermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    description: "just blur a photo",
    async execute(client, message, cmd, args, Discord) {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ dynamic: true, format: 'png' });
        const img = await new DIG.Blur().getImage(`${avatar}`, 2);
        const attachment = new Discord.MessageAttachment(img, "xopbotblur.png")
        return message.lineReplyNoMention({ files: [attachment] });
    }
}
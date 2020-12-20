const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")

module.exports.run = async (Bot, message, args) => {
    let Prefix = BotConfig.PREFIX;
        let sIcon = message.guild.iconURL;
        let hEmbed = new Discord.MessageEmbed()
            .setDescription(`<@${message.author.id}> has asked for my commands!`)
            .setThumbnail(sIcon)
            .setColor("#111111")
            .addField(`${Prefix}AddRecipient`, `Shortened to: ${Prefix}addrecip\n Add a person to the list of recipients`)
            .addField(`${Prefix}Recipients`, `Shortened to: ${Prefix}recips\n Prints out a list of the recipients in the server`)
            .addField(`${Prefix}SendPoll`, `Shortened to: ${Prefix}poll\n Sends a poll with the parameters given`)
            .addField(`${Prefix}RemoveRecipient`, `Shortened to: ${Prefix}rrecip Removes a person from the list of recipients`)
            
        message.channel.send(hEmbed)
}

module.exports.Help = {
    Name: "help"
}

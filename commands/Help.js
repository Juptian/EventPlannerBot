const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")

module.exports.run = async (Bot, message, args) => {
    console.log("help");
    let Prefix = BotConfig.PREFIX;
    message.delete();
    let sIcon = message.guild.iconURL;
    let hEmbed = new Discord.MessageEmbed()
        .setDescription(`<@${message.author.id}> has asked for my commands!`)
        .setThumbnail(sIcon)
        .setColor("#111111")
        .addField(`${Prefix}AddRecipient`, "Add a person to the list of recipients")
        .addField(`${Prefix}Recipients`, "Prints out a list of the recipients in the server")
        .addField(`${Prefix}SendPoll`, "Sends a poll with the parameters given")
        
    message.channel.send(hEmbed)
}

module.exports.Help = {
    Name: "help"
}
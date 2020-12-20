const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")
const path = require("path");
const fs = require("fs");

module.exports.run = async (Bot, message, args) => {
    let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));
    if(Recipients[message.guild.id].length == null | undefined | 0) {
        return message.reply("There are no users on the list")
    }
    if(message.guild.member.id != 451858675087441920) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You do not have the permissions to do that!");
        }
    }
    let subject = args[0];
    let text = args.slice(1).join(" ");
    let list = [...Recipients[message.guild.id]]

    let pollEmbed = new Discord.MessageEmbed()
        .setTitle(subject)
        .addField(`${subject}`, `${text}`);

    for(let i = 0; i < list.length; i++) {
        if(Recipients[message.guild.id][i] == null) {
            continue;
        }
        let user = message.guild.members.cache.get(Recipients[message.guild.id][i]);
        user.send("", pollEmbed).react(':thumbsup:').react(':thumbsdown:');
    }
}

module.exports.Help = {
    Name: "sendpoll",
    Alternative: "poll"
}

const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")
const Recipients = require("./JSON/Recipients.json")
const fs = require("fs")

module.exports.run = async (Bot, message, args) => {
    let Recipts = JSON.parse(fs.readFileSync("./JSON/Recipients.json", "utf8"));
    if(!Recipts[message.guild.id]) {
        Recipts[message.guild.id] = {};
    }

    let rEmbed = new Discord.MessageEmbed()
        .hexColor("#111111")
        .setTitle("Recipients in this server")

}

module.exports.Help = {
    Name: "recipients"
}

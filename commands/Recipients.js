const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json");
const path = require("path");
const fs = require("fs");

let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));

module.exports.run = async (Bot, message, args) => {

    if(!Recipients[message.guild.id]) {
        Recipients[message.guild.id] = {
            "List": []
        };
    }
    if(Recipients[message.guild.id].List.length == null | 0)
    {
        return message.channel.send("There are no recipients currently.");
    }

    let recipEmbed = new Discord.MessageEmbed()
        .setTitle("Current recipients")
        .setColor("#ffffff")
    
    for(var i = 0; i < Recipients[message.guild.id].List.length; i++)
    {
        let rMember = message.guild.members.get(Recipients[message.guild.id].List[i])
        recipEmbed.addfield(`${rMember.username}`)
    }
    message.channel.send(recipEmbed)
}

module.exports.Help = {
    Name: "recipients",
    Alternative: "recips"
}

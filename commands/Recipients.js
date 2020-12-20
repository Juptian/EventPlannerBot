const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json");
const path = require("path");
const fs = require("fs");

module.exports.run = async (Bot, message, args) => {
    let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));

    if(Recipients[message.guild.id][1] == undefined | null)
    {
        return message.reply("you need to add a user to the list first!");
    } else if(Recipients[message.guild.id][1].length == null | 0)
    {
        return message.channel.send("There are no recipients currently.");
    }

    let recipEmbed = new Discord.MessageEmbed()
        .setTitle("Current recipients")
        .setColor("#ffffff");
    
    let x = 0;
    for(var i = 0; i < Recipients[message.guild.id][1].length; i++)
    {
        let rMember = message.guild.members.cache.get(Recipients[message.guild.id][1][i]);
        if(Recipients[message.guild.id][1][i] == null) {
            continue;
        } else {
            recipEmbed.addField(`User ${x}`, `${rMember}`)
            x++;
        }
        
    }
    message.channel.send(recipEmbed)
}

module.exports.Help = {
    Name: "recipients",
    Alternative: "recips"
}

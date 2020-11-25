const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json");
const Recipients = require("./Recipients.json");
const path = require("path");
const fs = require("fs");

/**
 * Takes in a tagged user
 * Adds it to a JSON file 
*/
module.exports.run = async (Bot, message, args) => {

    if(args === null | 0)
    {
        return message.reply("You need to provide a user to add!");
    }
    
    let Recipts = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8")); 
    if(!Recipts[message.guild.id]) {
        Recipts[message.guild.id] = {};
    }

    if(!message.member.hasPermission("MANAGE_SERVER")) {
        return message.reply("You do not have the permissions to do that!");
    }

    Recipts[message.guild.id] = {
        Recipts: args[0]
    }

    fs.writeFile(path.resolve(__dirname, "./Recipients.json"), JSON.stringify(Recipts), (err) => {
        if(err) console.log(err);
    })

    message.channel.send(`Added ${Recipients.Recipts[Recipts.length - 1]} to the recipient list! It Has ${Recipts.length} recipients`);
}

module.exports.Help = {
    Name: "addrecipient"
}
const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")
const Recipients = require("./JSON/Recipients.json")
const fs = require("fs");

/**
 * Takes in a tagged user
 * Adds it to a JSON file 
*/
module.exports.run = async (Bot, message, args) => {
    //if(Recipients) console.log("true");

    let Recipts = JSON.parse(fs.readFileSync(`${Recipients}`, "utf8"));
    if(!Recipts[message.guild.id]) {
        Recipts[message.guild.id] = {};
    }

    if(!message.member.hasPermission("MANAGE_SERVER")) {
        return message.reply("You do not have the permissions to do that!");
    }

    Recipts[message.guild.id] = {
        Recipts: args[0]
    }

    fs.writeFile(`${Recipients}`, JSON.stringify(Recipts), (err) => {
        if(err) console.log(err);
    })

    message.reply(`Added <@!${Recipts[Recipts.length]}>`);
}

module.exports.Help = {
    Name: "addrecipient"
}
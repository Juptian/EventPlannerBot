const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")
const fs = require('fs')
const path = require('path');

module.exports.run = async (Bot, message, args) => {
    let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));
    const RecipList = Recipients;
    if(message.guild.member.id != 451858675087441920) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You do not have the permissions to do that!");
        }
    }

    let nMember = message.mentions.users.first().id || message.guild.members.cache.get(args[0]);
    let nMemberName = message.mentions.users.first().username || message.guild.members.cache.get(args[0]).username;
    
    if(args.length == null | 0 || nMember == null)
    {
        return message.reply("You need to provide a user to add to the list!");
    }

    const index = Recipients[message.guild.id].indexOf(nMember);
    console.log(index);
    if(index > -1) {
        delete Recipients[message.guild.id][index];
        Recipients[message.guild.id].slice(index, 1)
        let arr = JSON.stringify(Recipients, null, 4);
        fs.writeFileSync('./commands/Recipients.json', arr);
        return message.reply(`${nMemberName} has been removed from the list`);
    }
    
    return message.reply("Could not find user or there was an error removing the user from the list");
}

module.exports.Help = {
    Name: "removerecip",
    Alternative: "rrecip"
}

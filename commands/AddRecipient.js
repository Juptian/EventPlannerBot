const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json");
const path = require("path");
const fs = require("fs");

let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));

/**
 * Takes in a tagged user
 * Adds it to a JSON file 
 */

module.exports.run = async (Bot, message, args) => {
    
    if(!message.member.hasPermission("MANAGE_SERVER")) {
        return message.reply("You do not have the permissions to do that!");
    }

    let nMember = message.mentions.users.first().id || message.guild.members.get(args[0]);
    let nMemberName = message.mentions.users.first().username || message.guild.members.get(args[0]).username;
    
    if(args.length == null || args.length == 0 || nMember == null)
    {
        return message.reply("You need to provide a user to add to the list!");
    }
    
    if(!Recipients[message.guild.id]) {
        Recipients[message.guild.id] = {
            "List": []
        };
        JSON.stringify(Recipients[message.guild.id])
    }
    
    let list = Recipients[message.guild.id].List;
    
    for(var i = 0; i < list.length + 1; i++)
    {
        if(Recipients[message.guild.id].List[i] == nMember)
        {
            return message.reply("user is already on the list!");
        }
    }
    
    Recipients[message.guild.id].List.push(`${nMember}`);

    try {
        //fs.writeFileSync(path.resolve(__dirname, "./Recipients.json"), Recipients, 'utf8')
        JSON.stringify(Recipients[message.guild.id], null, 2);
    } catch (error) {
        console.log(error);
        message.channel.send(`There was an error adding ${nMemberName} to the list`);
        return;
    }

    message.channel.send(`Added ${nMemberName}`);
}

module.exports.Help = {
    Name: "addrecipient",
    Alternative: "addrecip"
}
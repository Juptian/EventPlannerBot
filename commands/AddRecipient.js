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
            "List": {

            }
        };
    }

    for(var i = 0; i < Recipients[message.guild.id]; i++)
    {
        if(Recipients[message.guild.id].List[i] == nMember)
        {
            return message.reply("user is already on the list!");
        }
    }

    Recipients[message.guild.id] = {
        "List": {
            
        }
    };
    let list = Recipients[message.guild.id].List;
    //Recipients[message.guild.id].push(`${nMember}`);

    list[list.length - 1] = `${nMember}`;
    list.length++;

    await fs.writeFile(path.resolve(__dirname, "./Recipients.json"), JSON.stringify(Recipients, null, 2), (err) => {
        if(err) console.log(err);
    })

    //message.channel.send(`Added ${Recipts[message.guild.id].length - 1} to the recipient list! It Has ${Recipts.length} recipients`);
    message.channel.send(`Added ${nMemberName}`);
}

module.exports.Help = {
    Name: "addrecipient",
    Alternative: "addrecip"
}
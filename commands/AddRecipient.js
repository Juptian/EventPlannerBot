const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json");
const path = require("path");
const fs = require("fs");


/**
 * Takes in a tagged user
 * Adds it to a JSON file 
 */

module.exports.run = async (Bot, message, args) => {

    let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));
    const RecipList = Recipients;
    module.exports = RecipList;
    if(message.guild.member.id != 451858675087441920) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You do not have the permissions to do that!");
        }
    }

    let nMember = message.mentions.users.first().id || message.guild.members.cache.get(args[0]);
    let nMemberName = message.mentions.users.first().username || message.guild.members.cache.get(args[0]).username;
    if(message.guild.members.cache.get(nMember).user.bot) {
        return message.reply("Cannot add a bot to the list!");
    } else if(args.length == null || args.length == 0 || nMember == null)
    {
        return message.reply("You need to provide a user to add to the list!");
    }
    
    if(!Recipients[message.guild.id]) {
        Recipients[message.guild.id] = [
            polls = [
                0
            ],
            users = [
                null,
            ],
            answers = [
                null
            ]
        ];
    }
    let list = Recipients[message.guild.id][1];
    for(var i = 0; i < list.length + 1; i++)
    {
        if(Recipients[message.guild.id][1][i] == nMember)
        {
            return message.reply(`${nMemberName} is already on the list!`);
        }
    }

    for(let i = 0; i < list.length; i++) {
        if(Recipients[message.guild.id][1][i] == null) {
            Recipients[message.guild.id][1][i] = nMember;
            let arr = JSON.stringify(Recipients, null, 4);
            fs.writeFileSync('./commands/Recipients.json', arr);
            return message.channel.send(`Added ${nMemberName}`);
        }
    }
    Recipients[message.guild.id][1].push(nMember);
    let arr = JSON.stringify(Recipients, null, 4);
    fs.writeFileSync('./commands/Recipients.json', arr);
    return message.channel.send(`Added ${nMemberName}`);
}

module.exports.Help = {
    Name: "addrecipient",
    Alternative: "addrecip"
}


const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json");
const Recipients = require("./Recipients.json");
const path = require("path");
const fs = require("fs");

module.exports.run = async (Bot, message, args) => {
    let Recipts = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));
    if(!Recipts[message.guild.id]) {
        Recipts[message.guild.id] = {};
    }
    if(Recipts[message.guild.id].length == null | 0)
    {
        return message.channel.send("There are no recipients currently.");
    }

    let ReciptList = "";

    for(var i = 0; i < Recipts[message.guild.id].length; i++)
    {
        ReciptList += `<@${Recipts[i]}>, `;
    }

    message.channel.send(`The current recipients are: ${ReciptList}.`)
}

module.exports.Help = {
    Name: "recipients"
}

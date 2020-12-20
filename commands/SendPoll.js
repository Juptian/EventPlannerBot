const Discord = require("discord.js");
const Bot = require("../Main");
const BotConfig = require("../Hidden.secrets/botconfig.json")
const path = require("path");
const fs = require("fs");

let day = 86400;
let workWeek = 5 * day;


module.exports.run = async (Bot, message, args) => {
    let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));
    if(Recipients[message.guild.id].length == null | undefined | 0) {
        return message.reply("There are no users on the list")
    }
    if(message.guild.member.id != 451858675087441920) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You do not have the permissions to do that!");
        }
    }
    let subject = args[0];
    let text = args.slice(1).join(" ");
    let list = Recipients[message.guild.id][0]
    let pollID = 90824 + Recipients[message.guild.id][0][Recipients[message.guild.id][0].length - 1];

    Recipients[message.guild.id][0].push(pollID);
    let arr = JSON.stringify(Recipients, null, 4);
    fs.writeFileSync('./commands/Recipients.json', arr);

    let pollEmbed = new Discord.MessageEmbed()
        .setTitle(subject)
        .addField(`${subject}`, `${text}`)
        .addField("IDs", `ServerID: ${message.guild.id}, PollID: ${pollID}`);

    for(let i = 0; i < list.length; i++) {
        if(Recipients[message.guild.id][1][i] == null) {
            continue;
        }
        user = await message.guild.members.fetch(Recipients[message.guild.id][1][i], true);
        user.send("", pollEmbed);
    }
    //sleep(workWeek)
    
    await sleep(day)
    Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./Recipients.json"), "utf-8"));

    let results = new Discord.MessageEmbed()
        .setTitle(`${subject} answers`);
    
    for(let i = 0; i < Recipients[message.guild.id][2][1].length; i++) {
        if(Recipients[message.guild.id][2][1][i] == null) {
            continue
        }
        x = i+1;
        let answer = Recipients[message.guild.id][2][1][i].split(", ")
        let rMember = message.guild.members.cache.get(answer[1])
        results.addField(`Answer #${x}`, `User: ${rMember} \nAnswer: ${answer[0]}`);
    }
    
    message.channel.send(results);
    Recipients[message.guild.id][2] = [
        null
    ];
    arr = JSON.stringify(Recipients, null, 4)
    fs.writeFileSync('./commands/Recipients.json', arr);
}

module.exports.Help = {
    Name: "sendpoll",
    Alternative: "poll"
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
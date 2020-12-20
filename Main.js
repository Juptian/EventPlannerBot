//Base requirements
const Botconfig = require('./Hidden.secrets/botconfig.json');
const Discord = require('discord.js');
const Bot = new Discord.Client({disableEveryone: true});

//Modules
const fs = require("fs");
const SuperAgent = require("superagent");
const path = require('path');

//Other
Bot.Commands = new Discord.Collection();

/**
  * TODO :
  * * get this started!
  * * Make more commands
  * * Get back into the groove of js
  * ! Look like you know what you're doing !
*/
// JOIN LINK //
// https://discord.com/oauth2/authorize?client_id=780176716211421225&scope=bot&permissions=8 //
// JOIN LINK //

//Reading the commands directory
fs.readdir("./commands/", (err, files) => {
	if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		return console.log("couldn't find commands");
	};

	jsfile.forEach((f, i) =>{
		let Props = require(`./commands/${f}`);
		console.log(`${f} loaded`);
        Bot.Commands.set(Props.Help.Name, Props);
        Bot.Commands.set(Props.Help.Alternative, Props);
	});
});

//Setting activity & notifying me that its on
//async so that it can do multiple things at once
Bot.on("ready", () => {
    console.log(`Logged in as ${Bot.user.username}`);
    Bot.user.setActivity("Event Planner simulator");
});

//Runs when a message is sent
//async so that it can do multiple things at once
Bot.on("message", async message => {
    //Prefix and check
    let prefix = Botconfig.PREFIX;

    if(!message.content.startsWith(`${prefix}`) && message.channel.type != "dm") { return; }
    //Ignoring bots and DMS
    if(message.author.bot) { return; } 
    if(message.channel.type == "dm" && message.content.includes(':thumbsup:' | ':thumbsdown:')) { 
        try {
            let Recipients = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./commands/Recipients.json"), "utf-8"))
            let text = message.content.split(" ");
    
            let answerArr = [`${text[1]}, ${message.author.id}`]
            if(Recipients[text[0]][2][1] != null) {
                Recipients[text[0]][2][1].push(`${text[1]}, ${text[1]}`)
            } else {
                Recipients[text[0]][2].push(answerArr);
            }
            let arr = JSON.stringify(Recipients, null, 4);
            fs.writeFileSync('./commands/Recipients.json', arr);
            
        } catch (err) {
            console.log(err);
            return message.reply('There was an error submitting your answer!');
        }
        return message.reply('Successfully aded your message!')
    }

    //Variables
    let MessageArray = message.content.split(" ");
    let Command = MessageArray[0].toLowerCase();
    let args = MessageArray.slice(1);

    let CommandFile = Bot.Commands.get(Command.slice(prefix.length));
    
    //Running the command
    if(CommandFile) { 
        CommandFile.run(Bot, message, args); 
    }
    else { 
        message.channel.send(`Cannot find the \`${Command}\` command. It might not exist, double check spelling`);
    }
});

Bot.on('messageReactionAdd', (reaction, user) => { 
    if(reaction.message.channel.type != "dm") { return; }

});

//Logging in
Bot.login(Botconfig.TOKEN);


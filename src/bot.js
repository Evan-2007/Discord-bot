const { REST } = require('@discordjs/rest');
require("dotenv").config();
const { Client, GatewayIntentBits, Routes } = require("discord.js");

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.login(TOKEN);

client.on('ready', ()=> {
    console.log('the bot is ready')
})

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()){
        console.log('did it work? i guess it did.')
        //interaction.reply({ content: 'hi'})
    }
})

client.on('messageCreate', message =>{
    if (message.content === 'ping') {
        message.reply('pong');
        
    }
});

async function main() {
    const commands = [
        {
            name: "test",
            description: "test command"
        }
    ];
    try{
        console.log('Started refreshing application (/) commands.');
        Routes.applicationGuildCommands
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { 
            body: commands
        });
        client.login(TOKEN);
    } catch (error){
        console.log(error);
    }
}

main();



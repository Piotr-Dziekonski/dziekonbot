const Discord = require('discord.js');
const client = new Discord.Client();
const KEY = require('./key')
const tms = require('./modules/tms')
const spooder = require('./modules/spooder')
const vis = require('./modules/vis')
const voice = require('./modules/vos')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`ID: ${client.user.id}!`);
  console.log(`------`);
});

client.on('message', async msg => {

  let answer = ":)"

  if (msg.content === '!vis') {

    answer = await vis()
    msg.reply(answer);

  } else if (['!vos'].includes(msg.content)) {

    answer = await voice()
    msg.reply(answer);

  } else if (['!spidre', '!spooder', '!araxxi', '!araxxor', '!rax'].includes(msg.content)) {

    answer = await spooder()
    msg.reply(answer);
  } else if (['!tms', '!merchant'].includes(msg.content)) {

    answer = await tms()
    msg.reply(answer);
  }

});

client.login(KEY);
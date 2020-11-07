const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const KEY = require('./key.js')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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

  } else if (['!spidre', '!spooder', '!araxxi', '!araxxor', '!rax'].includes(msg.content)) {

    answer = await spooder()
    msg.reply(answer);
  }


});

client.login(KEY);


/*
 *
 *  SPOODER
 *
 */
const spooder = async () => {
  const seconds_in_day = 24 * 60 * 60
  const seconds_in_minute = 60
  const interval = 4
  const rotation_count = 3
  const offset = 3

  const days_after_utc = Math.floor((Date.now() / 1000) / seconds_in_day)
  const days_into_period = (days_after_utc + offset) % (interval * rotation_count)

  const rotation = Math.floor(days_into_period / interval) + 1
  const days_until_next_rotation = interval - days_into_period % interval

  const openPaths = ["Minion", "Acid", "Darkness"]

  const closedPathString = openPaths[rotation - 1]

  const embed = {
    embed: {

      "title": "Araxxor",
      "description": `Currently closed path: **${closedPathString}**\n\n**${days_until_next_rotation}** days until next rotation`,
      "color": 1604096,
      "author": {
        "name": "Dziekonbot",
        "icon_url": "https://media.discordapp.net/attachments/428186648199561218/771483063501979648/unknown.png"
      },
      "thumbnail": {
        "url": "https://runescape.wiki/images/thumb/f/f2/Araxxor.png/1200px-Araxxor.png?9f535"
      }

    }
  }


  return embed

}

/*
 *
 * VISWAX
 *
 */
const vis = async () => {
  return await fetch('https://secure.runescape.com/m=forum/a=13/sl=0/forums?75,76,378,66118165,goto,1')
    .then(response => response.text())
    .then(data => {
      const dom = new JSDOM(data);
      const div = dom.window.document.querySelector("article.forum-post")
      const span = div.querySelector("span.forum-post__body")
      const brs = span.querySelectorAll('br');

      const regex = /(?<=(\/div>))(<br>)*(.*?)(<br>)*(?=<div)/gm
      const str = span.innerHTML
      const groupToMatch = 3
      let matchIndex = 1
      const slots = {Slot1: "", Slot2: ""}

      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
          if(groupIndex === groupToMatch){
            slots[`Slot${matchIndex}`] = match.split('<br>').join('\n');
          }
        });

        matchIndex++
      }

      const embed = {
        embed: {
          "title": "Viswax",
          "color": 12433191,
          "fields": [{
              "name": "Slot 1:",
              "value": slots.Slot1
            },
            {
              "name": "Slot 2:",
              "value": slots.Slot2
            }
          ],
          "author": {
            "name": "Dziekonbot",
            "icon_url": "https://media.discordapp.net/attachments/428186648199561218/771483063501979648/unknown.png"
          },
          "thumbnail": {
            "url": "https://vignette.wikia.nocookie.net/runescape2/images/4/49/Vis_wax_detail.png/revision/latest/window-crop/width/200/x-offset/0/y-offset/0/window-width/725/window-height/725?cb=20140915115106"
          }
        }
      }

      return embed
    });

}
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

      const regex = /(?<=\/div>)<br><br>.*?(?=<div)/gm
      const str = span.innerHTML

      let matchIndex = 1
      const slots = {Slot1: "", Slot2: ""}

      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        m.forEach((match) => {
          slots[`Slot${matchIndex}`] = match.split('<br>').join('\n');
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

/*
 *
 *  VoS
 *
 */
const voice = async () => {
  
  return await fetch('https://api.weirdgloop.org/runescape/vos/history')
    .then(response => response.json())
    .then(data => {
      
      const voices = [data.data[0].district1, data.data[0].district2]
      voices.forEach((voice, index) => {
        switch (voice) {
          case "Hefin":
            voices[index] = "```diff\n- Hefin -```"
            break;
          case "Crwys":
            voices[index] = "```fix\n- Crwys -```"
            break;
          case "Ithell":
            voices[index] = "```xl\n- Ithell -```"
            break;
          case "Meilyr":
            voices[index] = "```prolog\n' Meilyr '```"
            break;
          case "Amlodd":
            voices[index] = "```md\n# Amlodd #```"
            break;
          case "Iorwerth":
            voices[index] = "```py\n# Iorwerth #```"
            break;
          case "Trahaearn":
            voices[index] = "```cs\n# Trahaearn #```"
            break;
          case "Cadarn":
            voices[index] = "```css\n- Cadarn -```"
            break;
  
          default:
            break;
        }
      })

      const embed = {
        embed: {
          "title": "Voice of Seren",
          "color": 39077,
          "fields": [
            {
              "name": "District 1:",
              "value": voices[0],
              "inline": true
            },
            {
              "name": "District 2:",
              "value": voices[1],
              "inline": true
            }
          ],
          "author": {
            "name": "Dziekonbot",
            "icon_url": "https://media.discordapp.net/attachments/428186648199561218/771483063501979648/unknown.png"
          },
          "thumbnail": {
            "url": "https://vignette.wikia.nocookie.net/runescape2/images/a/a3/Seren_symbol.png/revision/latest?cb=20130811072849"
          }
        }
      }

      return embed
    });

}

/*
 *
 * TRAVELLING MERCHANT'S SHOP
 *
 */
const tms = async () => {
  return await fetch('https://runescape.wiki/w/Template:Travelling_Merchant')
    .then(response => response.text())
    .then(data => {
      const dom = new JSDOM(data);
      const table = dom.window.document.querySelector("table.wikitable")
      const trs = table.querySelectorAll("tr")

      const stock = []

      trs.forEach((elem, index) => {
        if(index !== 0){
          const tds = elem.querySelectorAll("td")
          stock.push([tds[1].textContent, tds[2].textContent]) // [itemName, itemValue] 
        }
      });

      const validDate = dom.window.document.querySelector("i").textContent

      const embed = {
        embed: {
          "title": "Travelling Merchant's Shop",
          "description": `*${validDate}* \n\u200b`,
          "color": 370943,
          "fields": [{
              "name": stock[0][0],
              "value": stock[0][1] + " coins",
            },
            {
              "name": stock[1][0],
              "value": stock[1][1] + " coins",
            },
            {
              "name": stock[2][0],
              "value": stock[2][1] + " coins",
            },
            {
              "name": stock[3][0],
              "value": stock[3][1] + " coins",
            }
          ],
          "author": {
            "name": "Dziekonbot",
            "icon_url": "https://media.discordapp.net/attachments/428186648199561218/771483063501979648/unknown.png"
          },
          "thumbnail": {
            "url": "https://static.wikia.nocookie.net/runescape2/images/e/e5/Travelling_merchant.png/revision/latest/scale-to-width-down/830?cb=20180312233003"
          }
        }
      }

      return embed
    });

}
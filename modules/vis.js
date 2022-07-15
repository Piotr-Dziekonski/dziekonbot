/*
 *
 * VISWAX
 *
 */
const fetch = require('node-fetch');
const { JSDOM } = require("jsdom");

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
      const slots = { Slot1: "", Slot2: "" }

      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        m.forEach((match) => {
          slots[`Slot${matchIndex}`] = match.split('<br>').join('\n');
        });

        matchIndex++
      }

      return {
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
    });
}

module.exports = vis;
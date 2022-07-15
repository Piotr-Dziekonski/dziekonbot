/*
 *
 *  VoS
 *
 */
const fetch = require('node-fetch');

const voice = async () => {

  return await fetch('https://api.weirdgloop.org/runescape/vos/history')
    .then(response => response.json())
    .then(data => {

      const voices = [data.data[0].district1, data.data[0].district2]
      const formattedVoices = voices.map(voice => formatDistrict(voice))

      return {
        embed: {
          "title": "Voice of Seren",
          "color": 39077,
          "fields": [
            {
              "name": "District 1:",
              "value": formattedVoices[0],
              "inline": true
            },
            {
              "name": "District 2:",
              "value": formattedVoices[1],
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
    });
}

const formatDistrict = voice => {
  switch (voice) {
    case "Hefin":
      voice = "```diff\n- Hefin -```"
      break;
    case "Crwys":
      voice = "```fix\n- Crwys -```"
      break;
    case "Ithell":
      voice = "```xl\n- Ithell -```"
      break;
    case "Meilyr":
      voice = "```prolog\n' Meilyr '```"
      break;
    case "Amlodd":
      voice = "```md\n# Amlodd #```"
      break;
    case "Iorwerth":
      voice = "```py\n# Iorwerth #```"
      break;
    case "Trahaearn":
      voice = "```cs\n# Trahaearn #```"
      break;
    case "Cadarn":
      voice = "```css\n- Cadarn -```"
      break;
    default:
      break;
  }
  return voice;
}

module.exports = voice;
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

      return {
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
    });
}

module.exports = voice;
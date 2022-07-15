/*
 *
 * TRAVELLING MERCHANT'S SHOP
 *
 */
const fetch = require('node-fetch');
const { JSDOM } = require("jsdom");

const tms = async () => {
  return await fetch('https://runescape.wiki/w/Template:Travelling_Merchant')
    .then(response => response.text())
    .then(data => {
      const dom = new JSDOM(data);
      const table = dom.window.document.querySelector("table.wikitable")
      const trs = table.querySelectorAll("tr")

      const stock = []

      trs.forEach((elem, index) => {
        if (index !== 0) {
          const tds = elem.querySelectorAll("td")
          stock.push([tds[1].textContent, tds[2].textContent]) // [itemName, itemValue] 
        }
      });

      const validDate = dom.window.document.querySelector("i").textContent

      return {
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
    });
}

module.exports = tms;
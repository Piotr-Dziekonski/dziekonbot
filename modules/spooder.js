/*
 *
 *  SPOODER
 *
 */
const { getCurrentTime } = require("../lib/utility");

const spooder = async () => {
  const secondsInDay = 24 * 60 * 60
  const interval = 4
  const rotationCount = 3
  const offset = 3

  const daysAfterUtc = Math.floor((getCurrentTime() / 1000) / secondsInDay)
  const daysIntoPeriod = (daysAfterUtc + offset) % (interval * rotationCount)

  const closedPathIndex = Math.floor(daysIntoPeriod / interval)
  const daysUntilNextRotation = interval - daysIntoPeriod % interval

  const closedPathString = getClosedPath(closedPathIndex)

  return {
    embed: {

      "title": "Araxxor",
      "description": `Currently closed path: **${closedPathString}**\n\n**${daysUntilNextRotation}** days until next rotation`,
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
}

const getClosedPath = (closedPathIndex) => {
  const openPaths = ["Minion", "Acid", "Darkness"]
  return openPaths[closedPathIndex]
}

module.exports = spooder;
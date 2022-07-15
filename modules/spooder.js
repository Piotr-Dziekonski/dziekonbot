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

  return {
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
}

module.exports = spooder;
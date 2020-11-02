const json = require('./top100abuseporn2.json')
const fs = require('fs-extra')

const shortStr = str => {
  const maxStringLength = 30
  if (str.length > maxStringLength) {
    return str.substring(0,maxStringLength) + '…'
  } else return str
}

function shortDay(date) {
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
   return shortDays[date.getDay()];
}

const prefix = `| Author | Title | Link | Date |
|---|---|---|---|
`

const results = json.data.map(post => {
  const { author, permalink, title, url, created_utc } = post
  const date = new Date(Number(created_utc + '000'))
  const  formattedDate = `${shortDay(date)} ${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
  const formattedUrl = shortStr(url.replace('https://', ''))
  return { author, permalink, title, url, formattedDate, formattedUrl }
})

const formattedList = results.map(r =>
  `| [u/${r.author}](https://reddit.com/u/${r.author}) | [${r.title.replace('|', '\\|')}](${r.permalink}) | [${r.formattedUrl}](${r.url}) | ${r.formattedDate} |`).join('\n')

// const mapped = results.map(x => '| ' + Object.values(x).join(' | ') + ' |').join('\n')
// console.log(mapped)

fs.writeFileSync('ap.md', prefix + formattedList)
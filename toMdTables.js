const fs = require('fs-extra')
const fileList = fs.readdirSync('results').filter(filename => filename.substring(0,1) !== '_')
const objs = fileList.map(filename => require('./results/' + filename))

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

const toMdTable = obj => {
  const sub = obj[0].subreddit
  const prefix = `# Top 100 posts from /r/${sub}

| Author | Title | Link | Date |
|---|---|---|---|
`

  const results = obj.map(post => {
    const { author, permalink, title, url, created_utc } = post
    const date = new Date(Number(created_utc + '000'))
    const  formattedDate = `${shortDay(date)} ${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
    const formattedUrl = shortStr(url.replace('https://', ''))
    return { author, permalink, title, url, formattedDate, formattedUrl }
  })

  const formattedList = results.map(r =>
    `| [u/${r.author}](https://reddit.com/u/${r.author}) | [${r.title.replace('|', '\\|')}](${r.permalink}) | [${r.formattedUrl}](${r.url}) | ${r.formattedDate} |`).join('\n')
  return prefix + formattedList
}

Promise.all(objs.map(obj => {
  obj = obj.data ? obj.data : obj
  const md = toMdTable(obj)
  return fs.writeFile('tables/' + obj[0].subreddit + '.md', md)
})).then(() => console.log('success'))
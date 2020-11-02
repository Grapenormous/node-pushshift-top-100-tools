const rp = require('request-promise')
const fs = require('fs-extra')
// const subList = fs.readFileSync("./sublistPending.txt", 'utf8')
// const subList = fs.readFileSync("results/_pending.txt", 'utf8')
const subList = '/r/degradedfemales'
const { head, tail, append } = require('ramda')
const logPass = (v) => (console.log(v), v)

const rateLimit = async (res = [], fn, args) => {
  if (args.length > 0) {
    const subRes = await fn(head(args))
    const addedResults = append(subRes, res)
    return rateLimit(addedResults, fn, tail(args))
  } else if (res.length > 0) {
    return res
  }
}

const promiseSleepyLog = str => 
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(str)
      resolve(str)
    }, 500)
  })

const testRateLimit = () => rateLimit([], promiseSleepyLog, [1, 3, 5, 6, 7]).then(console.log)

const processedList = subList.trim().split('\r\n').map(s => s.substring(3).trim())

console.log(processedList)

const lookup = sub =>
  rp(`https://api.pushshift.io/reddit/search/submission/?subreddit=${sub}&size=100&sort_type=score`)

const lookupAndSave = async sub => {
    try {
      const res = await lookup(sub)
      const data = (JSON.parse(res)).data
      if (data && Array.isArray(data) && data.length > 0) {
        await fs.writeFile('results/' + sub + '.json', JSON.stringify(data, null, 2))
        return logPass({ sub, status: 'saved' })
      } else return logPass({ sub, status: 'empty, not saved' })
    } catch (err) { logPass({ sub, status: 'api error', errorCode: err.code }) }
}

rateLimit([], lookupAndSave, processedList)
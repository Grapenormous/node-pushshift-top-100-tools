const fs = require('fs-extra')

const successRecord = [
{ "sub": 'rektwhores', "status": 'saved' },
{ "sub": 'strugglefucking', "status": 'saved' },
{ "sub": 'degradedfemales', "status": 'api error', errorCode: 502 },
{ "sub": 'fuckmeat', "status": 'saved' },
{ "sub": 'abusedsluts', "status": 'saved' },
{ "sub": 'ropedancers', "status": 'saved' },
{ "sub": 'misogynyfetish', "status": 'api error', errorCode: 502 },
{ "sub": 'deadeyes', "status": 'saved' },
{ "sub": 'sex_violence_art', "status": 'api error', errorCode: 502 },
{ "sub": 'dolcettkingdom', "status": 'saved' },
{ "sub": 'brokenfucktoys', "status": 'api error', errorCode: 502 },
{ "sub": 'womenintrouble', "status": 'api error', errorCode: 502 },
{ "sub": 'putinherplace', "status": 'saved' },
{ "sub": 'slasherchicks', "status": 'saved' },
{ "sub": 'cryingcunts', "status": 'saved' },
{ "sub": 'MisogynyFetishGW', "status": 'saved' },
{ "sub": 'rapekink', "status": 'api error', errorCode: 502 },
{ "sub": 'rapeconfessions', "status": 'saved' },
{ "sub": 'rapefantasy', "status": 'api error', errorCode: 502 },
{ "sub": 'rapeworld', "status": 'saved' },
{ "sub": 'rapestories', "status": 'saved' }
]

fs.writeFile('results/_successRecord.json', JSON.stringify(successRecord, null, 2)).then(() => console.log('success'))
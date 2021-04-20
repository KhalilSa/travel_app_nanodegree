const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('dist'))
console.log(path.join(__dirname))

app.get('/', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
const port = 8081 || process.env.port
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})

// server routes
app.get('/data', (req, res) => {
    res.send(projectData);
});

app.post('/addData', (req, res) => {
    projectData = {...req.body };
    console.log(projectData);
});

app.post('/text', async(req, res) => {
    await analyzeText(req.body.text).then(data => {
        const projectData = {
            agreement: data.agreement,
            confidence: data.confidence,
            subjectivity: data.subjectivity,
            irony: data.irony,
            scoreTag: data.score_tag
        }
        res.send(projectData)
    })
})

app.get('/analyzedtxt', (req, res) => {
    console.log(projectData)
    res.send(projectData)
})

async function analyzeText(txt, key = process.env.API_KEY, lang = 'en') {
    const res = await fetch(`https://api.meaningcloud.com/sentiment-2.1?` +
        `key=${key}&txt=${txt}&lang=${lang}`, {
            method: 'POST',
            redirect: 'follow'
        })
    try {
        const data = await res.json()
        return data
    } catch (e) {
        console.log(`ERROR: ${e}`)
    }
}

module.exports = app
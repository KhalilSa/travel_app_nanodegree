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

app.post('/loc', async(req, res) => {
    await getLocation(req.body.place).then(data => {
        res.send(data)
    }).catch((e) => console.log(`SOMETHING HAS GONE WRONG \n${e}`))
})

app.post('/forecast', async(req, res) => {
    await getWeather(req.body.loc, req.body.current)
        .then(data => {
            res.send(data)
        }).catch(e => console.log(`SOMETHING HAS GONE WRONG \n${e}`))
})

app.post('/image', async(req, res) => {
    await getImage(req.body.loc[0], req.body.loc[1])
        .then(data => {
            res.send(data)
        }).catch(e => console.log(`SOMETHING HAS GONE WRONG \n${e}`))
})

// Geonames API Request Function
async function getLocation(loc, user = process.env.GEONAMES_KEY) {
    const res = await fetch(`http://api.geonames.org/searchJSON?formatted=true&q=${loc}&username=${user}`)
    try {
        const data = await res.json()
        const location = {
            lat: data.geonames[0].lat,
            lng: data.geonames[0].lng,
            cn: data.geonames[0].countryName
        }
        return location
    } catch (e) {
        console.log(`Error while fetching api in getLocation func: \n${e}`)
    }
}

// Weatherbit API Request Function
async function getWeather(loc, current, key = process.env.WEATHERBIT_API_KEY, unit = 'M') {
    const baseUrl = current ? `https://api.weatherbit.io/v2.0/current?lat=${loc.lat}&lon=${loc.lng}&key=${key}&units=${unit}` : `https://api.weatherbit.io/v2.0/forecast/daily?lat=${loc.lat}&lon=${loc.lng}&key=${key}&units=${unit}&days=17`
    const res = await fetch(baseUrl)
    try {
        const data = await res.json()
        return data
    } catch (e) {
        console.log(`Error while fetching api in getWeather func: \n${e}`)
    }
}

// Pixabay API Request Function
async function getImage(city, country, key = process.env.PIXABAY_API_KEY) {
    let res = await fetch(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo&pretty=true`)
    try {
        let data = await res.json()
        const totalHits = data.hits.length
        if (totalHits == 0) {
            res = await fetch(`https://pixabay.com/api/?key=${key}&q=${country}&image_type=photo&pretty=true`)
            if (res.ok) {
                data = await res.json()
                return { url: data.hits[randomInt(totalHits)].webformatURL }
            }
        }
        return { url: data.hits[randomInt(totalHits)].webformatURL }
    } catch (e) {
        console.log(`Error while fetching api in getImage func: \n${e}`)
    }
}

// helper function
// chooses random integer from 0 to the input integer
function randomInt(i) {
    return Math.floor(Math.random() * i)
}

module.exports = app
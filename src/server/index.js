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

// server routes
const projectData = {
    trips: []
}

app.get('/trips', (req, res) => {
    res.status(200).send(projectData);
})

app.get('/clear', (req, res) => {
    projectData.trips = []
    res.status(200).send({ code: 200, status: 'Data Cleared Successfully' })
})

app.post('/addtrip', (req, res) => {
    if (!checkSameTrip(req.body)) {
        projectData.trips.push(req.body)
        console.log(projectData)
        res.status(201).send({ code: 201, status: 'CREATED' })
    } else {
        res.status(202).send({ code: 202, status: 'ACCEPTED' })
    }
})

app.post('/removetrip', (req, res) => {
    const index = checkSameTrip(req.body)
    if (index) {
        removeItem(projectData.trips[index])
        console.log(projectData)
        res.status(202).send({ code: 202, status: 'DELETED' })
    } else {
        res.status(200).send({ code: 200, status: 'OK' })
    }
})


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
    let res = await fetch(`https://pixabay.com/api/?key=${key}&q=${city}&image_type=photo&category=places&pretty=true`)
    try {
        let data = await res.json()
        const totalHits = data.hits.length
        const randInt = randomInt(totalHits)
        if (totalHits == 0) {
            res = await fetch(`https://pixabay.com/api/?key=${key}&q=${country}&image_type=photo&category=places&pretty=true`)
            if (res.ok) {
                data = await res.json()
                return {
                    url: data.hits[randInt].webformatURL,
                    abs: heightGreater(data.hits[randInt].webformatHeight, data.hits[randInt].webformatWidth)
                }
            }
        }
        return {
            url: data.hits[randInt].webformatURL,
            abs: heightGreater(data.hits[randInt].webformatHeight, data.hits[randInt].webformatWidth)
        }
    } catch (e) {
        console.log(`Error while fetching api in getImage func: \n${e}`)
    }
}

// helper functions

// chooses random integer from 0 to the input integer
function randomInt(i) {
    return Math.floor(Math.random() * i)
}
// Compares Width and Height and returns true if height is greater than the width
function heightGreater(h, w) {
    if (Math.max(h, w) === h) return true
    return false
}
// Check for the same trip object
function checkSameTrip(obj, trips = projectData.trips) {
    let index = 0
    for (let t of trips) {
        if (obj.location === t.location &&
            obj.daysLeft === t.daysLeft &&
            obj.duration === t.duration
        ) return index
        index++
    }
    return 0
}
// removes specific item from array 
function removeItem(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

module.exports = {
    app,
    randomInt,
    heightGreater,
    checkSameTrip,
    removeItem
}
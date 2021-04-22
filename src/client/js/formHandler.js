import { post } from "jquery"
import { updateUI } from "./updateUI"

// animations slide up for the header and fade in/ fade out for the form
$(() => {
    $('#add-trip').click(() => {
        $('#form').toggle('fast')
        $('header').first().animate({ marginTop: 0 }, 500, () => {
            $(this).css({ marginTop: '' })
        })
    })

    $('.btn-remove').click(() => {
        $('.card').hide('fast', () => {
            $(this).remove()
        })
    })
})

const trip = {}

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    const locationName = document.getElementById('location').value
    const startInput = document.getElementById('start').value
    const endInput = document.getElementById('end').value
    const startDate = new Date(startInput)
    const endDate = new Date(endInput)
    const tripWithinWeek = Client.checkDate(startInput)

    trip.start = startDate.toGMTString().slice(0, 16)
    trip.end = endDate.toGMTString().slice(0, 16)
    trip.daysLeft = Client.daysBetween(new Date(), startDate)
    trip.duration = Client.daysBetween(startDate, endDate)
    trip.location = locationName

    if (locationName && startInput && endInput) {
        postData('http://localhost:8081/loc', { place: locationName })
            .then(info => {
                trip.location += `, ${info.cn}`
                return info
            })
            .then(loc =>
                postData('http://localhost:8081/forecast', {
                    loc: loc,
                    current: tripWithinWeek
                }))
            .then(data => {
                if (tripWithinWeek) {
                    trip.win = data.data[0]["wind_spd"]
                    trip.temp = data.data[0].temp
                    trip.wd = data.data[0].weather.description
                } else if (trip.daysLeft > 16) {
                    trip.win = data.data[16]["wind_spd"]
                    trip.temp = data.data[16].temp
                    trip.wd = data.data[16].weather.description
                } else {
                    trip.win = data.data[trip.daysLeft]["wind_spd"]
                    trip.temp = data.data[trip.daysLeft].temp
                    trip.wd = data.data[trip.daysLeft].weather.description
                }
                postData('http://localhost:8081/image', {
                        loc: trip.location.split(', ')
                    })
                    .then(imgURL => {
                        trip.imgSrc = imgURL.url
                        updateUI(trip)
                    })
            })
            .catch(e => console.log(`Error: ${e}`))
    } else {
        alert("You need to enter some location and date before submiting")
    }
    console.log('trip', trip)
}

// async post function
async function postData(url = '', dataObj = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
    })
    try {
        const newData = await response.json()
        return newData
    } catch (e) {
        console.log('something went wrong.\n' + e)
    }
}

export { handleSubmit }
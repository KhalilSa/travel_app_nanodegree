const alertify = require('alertifyjs')
const lodash = require('lodash')

document.addEventListener('DOMContentLoaded', () => {
    // add event listener to submit button
    document.getElementById('submit').addEventListener('click', handleSubmit)
    document.getElementById('form').addEventListener('submit', handleSubmit)

    // For changing input size accordingly
    let root = document.documentElement;
    root.style.setProperty('--width', window.outerWidth + "px");
    root.style.setProperty('--height', window.outerHeight + "px");
    window.addEventListener("resize", e => {
        root.style.setProperty('--width', window.outerWidth + "px");
        root.style.setProperty('--height', window.outerHeight + "px");
    });
    // animations slide up for the header and fade in/ fade out for the form
    $('#add-trip').click(() => {
        $('#form').toggle('fast')
        $('header').first().animate({ marginTop: 0 }, 500, () => {
            $(this).css({ marginTop: '' })
        })
    })

    // Clear local storage when the clear All div is clicked
    setTimeout(() => {
        document.getElementById('clear').addEventListener('click', (event) => {
            event.preventDefault()
            $(event.target).hide('fast')
            $('#saved-trips').hide('fast')
            $('#sv-tr').hide('fast')
            Client.getData('http://localhost:8081/clear').then(res => {
                alertify.success(res.status)
            })
            localStorage.clear()
        })
    }, 3500);
    // hide found result string on refresh
    $(document).on('', (event) => {
        event.preventDefault()
        $('.re-st').first().hide('fast')
    });
    // Load Saved
    Client.loadSaved()
})

let trip = {}

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
                    trip.win = data.data[15]["wind_spd"]
                    trip.temp = data.data[15].temp
                    trip.wd = data.data[15].weather.description
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
                        trip.abs = imgURL.abs
                        Client.updateUI(trip)
                    })
            })
            .catch(e => console.log(`Error: ${e}`))
    } else {
        alertify
            .alert("You need to enter some location and date before submiting", function() {
                alertify.message('Please, Fill The Form First');
            })
    }
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

// save Button Event Handler
let tripsArray = localStorage.getItem('trips') ?
    JSON.parse(localStorage.getItem('trips')) : []
localStorage.setItem('trips', JSON.stringify(tripsArray))

function saveBtnHandler(trp) {
    const saveBtn = document.querySelector('#save-btn')
    saveBtn.addEventListener('click', () => {
        postData('http://localhost:8081/addtrip', trp)
            .then((res) => {
                if (res.code === 201) {
                    alertify.success('Trip Saved Successfully!')
                    Client.updateUI(trip, Client.savedTripsElm)
                    let tripClone = lodash.cloneDeep(trip)
                    tripsArray.push(tripClone)
                    localStorage.setItem('trips', JSON.stringify(tripsArray))
                } else {
                    alertify.message('Trip Already Saved')
                }
            })
            .catch((e) => {
                console.log(`Error: ${e}`)
                alertify.error(`Error ${e.message}`)
            })
    })
}

export { handleSubmit, saveBtnHandler }
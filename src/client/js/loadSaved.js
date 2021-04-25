const savedTripsElm = document.getElementById('saved-trips')

function loadSaved() {
    $('.re-st').first().hide('fast')
    const savedTrips = JSON.parse(localStorage.getItem('trips'))
    if (savedTrips === []) {
        getData('http://localhost:8081/trips')
            .then(data => {
                console.log(data, data.trips)
                if (data.trips !== []) {
                    $('#sv-tr').show('fast')
                    $('#clear').css({ visibility: 'visible' })
                    for (const trip of data.trips) {
                        Client.updateUI(trip, savedTripsElm)
                    }
                    localStorage.setItem('trips', JSON.stringify(data.trips))
                } else {
                    $('#sv-tr').hide('fast')
                }
            })
            .catch(e => console.log(e))
    } else {
        $('#sv-tr').show('fast')
        $('#clear').css({ visibility: 'visible' })
        savedTrips.forEach(elm => {
            Client.updateUI(elm, savedTripsElm)
        })
    }
}

// async get function
async function getData(url = '') {
    const response = await fetch(url)
    try {
        const data = response.json()
        return data
    } catch (e) {
        console.log(e)
    }
}

export { loadSaved, savedTripsElm, getData }
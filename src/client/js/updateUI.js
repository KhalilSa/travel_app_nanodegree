const results = document.getElementById('results')

function updateUI(trip) {
    const src = trip.imgSrc ? trip.imgSrc : './media/travelbg.jpg'
    const resUI = `
    <div class="card">
        <div class="card-img">
            <img src="${src}">
        </div>
        <div class="card-main">
            <h4>Trip To: ${trip.location}</h4>
            <strong>Departure: ${trip.start}</strong>
            <strong>Return: ${trip.end}</strong>
            <strong>Duration: ${trip.duration}</strong>
            <div class="btn-group">
                <button class="btn btn-save">Save Trip</button>
                <button class="btn btn-remove">Remove Trip</button>
            </div>
            <span>${trip.location} is ${trip.DaysLeft} days away</span>
            <span>Typical weather for then is:</span>
            <span class="small-txt">Temperature - ${trip.temp}, Wind Speed - ${trip.win}</span>
            <span class="small-txt">Mostly ${trip.wd} throughout the day</span>
        </div>
    </div>
`.trim()
    $('.re-st').first().show('fast')
    results.innerHTML = resUI
}

export { updateUI }
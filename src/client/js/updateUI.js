const results = document.getElementById('results')
const resStr = $('.re-st').first()

function updateUI(trip, elm = results) {
    const src = trip.imgSrc ? trip.imgSrc : './media/travelbg.jpg'
    const abs = trip.abs ? 'position: initial' : 'position: absolute'
    const saveBtn = elm === results ? '<button class="btn btn-save" id="save-btn">Save Trip</button>' : ''
    const resUI = `
    <div class="card">
        <div class="card-img">
            <img src="${src}" style="${abs}" alt="Image of ${trip.location}">
        </div>
        <div class="card-main">
            <h4>Trip To: ${trip.location}</h4>
            <strong>Departure: ${trip.start}</strong>
            <strong>Return: ${trip.end}</strong>
            <strong>Duration: ${trip.duration}</strong>
            <div class="btn-group">
                ${saveBtn}
                <button class="btn btn-remove">Remove Trip</button>
            </div>
            <span>${trip.location} is ${trip.DaysLeft} days away</span>
            <span>Typical weather for then is:</span>
            <span class="small-txt">Temperature - ${trip.temp}, Wind Speed - ${trip.win}</span>
            <span class="small-txt">Mostly ${trip.wd} throughout the day</span>
        </div>
    </div>
`.trim()
    resStr.show('fast')
        // update the DOM
    if (elm === results) {
        elm.innerHTML = resUI
        Client.saveBtnHandler(trip)
    } else {
        elm.innerHTML += resUI
    }
    // add event listener to remove button
    $('.btn-remove').on('click', (event) => {
        $(event.target).closest('.card').hide('fast', () => {
            $(this).remove()
            resStr.hide('fast')
        })
    })
}

export { updateUI }
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
        console.log('clicked')
    })
})

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('textarea').value
    if (formText) {
        postData('http://localhost:8081/text', { text: formText })
            .then(data => Client.updateUI(data))
            .catch((e) => {
                console.log(`Error: ${e}`)
            })
    } else {
        alert("You need to enter some text before submiting")
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
        console.log(newData)
        return newData
    } catch (e) {
        console.log('something went wrong.\n' + e)
    }
}

export { handleSubmit }
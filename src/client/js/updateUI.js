const results = document.getElementById('results')

function updateUI(data) {
    const resUI = `
            <ul>
                <li> <b> Agreement: </b> ${data.agreement.toLowerCase()}
                <li> <b> Confidence: </b> ${data.confidence.toLowerCase()}
                <li> <b> Subjectivity: </b> ${data.subjectivity.toLowerCase()}
                <li> <b> Irony: </b> ${data.irony.toLowerCase()}
                <li> <b> Score Tag: </b> ${data.scoreTag.toLowerCase()}
            </ul>`.trim()
    results.innerHTML = resUI
}

export { updateUI }
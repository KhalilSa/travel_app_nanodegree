function checkDate(startInput) {
    const currentDate = new Date()
    const StartDate = new Date(startInput)
    let FutureDate = new Date()
    FutureDate.setDate(currentDate.getDate() + 7)

    if (StartDate >= currentDate && StartDate <= FutureDate) return true
    return false
}

function daysBetween(start, end) {
    const oneDay = 24 * 60 * 60 * 1000 // milliseconds
    const startDate = new Date(start)
    const endDate = new Date(end)

    return Math.round(Math.abs((startDate - endDate) / oneDay))
}

export { checkDate, daysBetween }
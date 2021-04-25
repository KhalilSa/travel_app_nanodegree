// I split the server code into two files to avoid timeout errors while running jest tests
// designates what port the app will listen to for incoming requests
const { app } = require("../server/index")

const port = 8081 || process.env.port
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})
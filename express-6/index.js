const express = require('express')
const app = express()
const fs = require('fs')

app.use(loggIt)

app.get('/', middlewareOnlyForThisPath, (req, res) => {
    res.write("Hej besökare")
    res.send()
})

app.get('*', (req, res) => {
    res.write("404")
    res.status(404)
    res.send()
})

app.listen(3000, () => {
    console.log("Du lyssnar på 3000, de bästa låtarna...")
})

function middlewareOnlyForThisPath(req, res, next) {
    console.log("---" + req.path)
    next()
}

function loggIt(req, res, next) {
    let loggData = req.hostname + req.path + " " + Date.now() + "\l\r"
    fs.appendFile("log.txt", loggData, (err) => {
        if (err) console.error(err)
        else {
            console.log("Logg uppdaterad")
        }
    })
    next()
}
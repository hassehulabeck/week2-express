const express = require('express')
const app = express()
const router = require('./router.js')
const fs = require('fs')

app.use('/', (req, res, next) => {
    let data = req.url + " visited at " + new Date().toISOString() + "\r"
    fs.appendFile('./access.log', data, (err) => {
        if (err) console.error(err)
    })
    next()
})

app.use('/', router)

app.listen(3000, () => {
    console.log("Du lyssnar på 3000, de bästa låtarna från övning 10...")
})
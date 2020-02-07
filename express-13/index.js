const express = require('express')
const alphaApp = express()
const betaApp = express()
const http = require('http')

alphaApp.get('/', (req, res) => {
    res.send("Hej")
})

alphaApp.get('/gotoBeta', (req, res) => {
    http.get('http://localhost:3010/gotoAlpha')
    res.send("went to beta")
})

alphaApp.get('/gotoAlpha', (req, res) => {
    console.log("call from beta " + req.hostname)
})

betaApp.get('/', (req, res) => {
    res.send("Heja")
    console.log(req.headers.host + " Beta")
})

betaApp.get('/gotoAlpha', (req, res) => {
    http.get('http://localhost:3000/gotoAlpha')
    res.send("went to alpha" + http.res)
    console.log(req.headers.host + " Beta II")
})

alphaApp.listen(3000, () => {
    console.log("Lyssnar på 3000")
})

betaApp.listen(3010, () => {
    console.log("Lyssnar på 3010")
})
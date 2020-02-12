const express = require('express')
const app = express()
const errorFunctions = require('./functions.js')
const prodRoutes = require('./products.js')

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.use('/products', prodRoutes)

app.use(function (err, req, res, next) {
    if (err) {
        if (err.message == "noproduct") {
            errorFunctions.informUser(req, res, next)
            errorFunctions.loggIt(req, res, next)
        }
    }
    next()
})


app.listen(3000, () => {
    console.log("Nu lyssnar vi på 3000")
})
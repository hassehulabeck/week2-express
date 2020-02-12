// REST-API
const express = require('express')
const app = express()
const userRoutes = require('./userRoutes.js')

// Kunna hantera postningar från Postman
app.use(express.urlencoded({
    extended: true
}))

// URL som matchar blir localhost:3000/users osv (med id-värden eller liknande)
app.use('/', userRoutes)

app.listen(3000, () => {
    console.log("Nu spinner vi på 3000")
})
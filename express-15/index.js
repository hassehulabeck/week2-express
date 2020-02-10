const express = require('express')
const app = express()
const prodRoutes = require('./products.js')

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.use('/products', prodRoutes)

app.use(function (err, req, res, next) {
    if (err) {
        if (err.message == "noproduct") {
            let text = `Ingen produkt matchade din sökning!<p>
            <a href="/products">Till produktlistan</a>`
            res.status(404).send(text)
        }
    }
    next()
})


app.listen(3000, () => {
    console.log("Nu lyssnar vi på 3000")
})
const users = require('./users.json')
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.write("<html>")
    console.log(req.query)
    // Kolla om vi har någon query i URLen
    if (req.query.userid) {
        console.log("Query finns")
        console.log(req.query)
        res.write(req.query.userid)
    } else {
        res.sendFile('index.html')
    }
    res.end()
})


app.listen(3000, () => {
    console.log("lyssnar nu på 3000")
})
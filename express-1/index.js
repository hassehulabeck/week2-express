const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hej')
})

app.listen(3000, () => {
    console.log("lyssnar nu på 3000")
})
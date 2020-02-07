const express = require('express')
const app = express()
const router = require('./router.js')

app.use('/', router)

app.listen(3000, () => {
    console.log("Du lyssnar på 3000, de bästa låtarna från övning 9...")
})
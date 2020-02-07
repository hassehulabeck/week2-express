const express = require('express')
const router = express.Router()

let options = {
    root: 'public/'
}

router.get('/', (req, res) => {
    res.sendFile('index.html', options)
})

router.get('/about', (req, res) => {
    res.sendFile('about.html', options)
})

// Allt övrigt som inte "fastnar" i någon route ovanför.
router.get('*', (req, res) => {
    res.status(404)
    res.sendFile('404.html', options)
})

module.exports = router
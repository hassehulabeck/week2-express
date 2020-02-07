const express = require('express')
const app = express()

let options = {
    root: 'public/'
}

app.get('/', (req, res) => {
    res.sendFile('index.html', options)
})

app.get('/about', (req, res) => {
    res.sendFile('about.html', options)
})

// Allt övrigt som inte "fastnar" i någon route ovanför.
app.get('*', (req, res) => {
    res.status(404)
    res.sendFile('404.html', options)
})

app.listen(3000, () => {
    console.log("Du lyssnar på 3000, de bästa låtarna...")
})
const express = require('express')
const app = express()
const uuidv1 = require('uuid/v1');
let users
const fs = require('fs')

// Kunna hantera postningar från Postman
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.get('/', (req, res) => {
    if (req.query.present == "true") {
        // Visa enbart de som återstår att göra
        let present = users.filter((user) => {
            return user.state == 1
        })
        res.json(present)
    } else {
        // Visa alla users
        res.json(users)
    }
    res.end()
})

app.post('/', (req, res) => {
    // Ingen säkerhetskontroll, bara in med uppgiften
    // Däremot "friserar" vi den.
    let newUser = {}
    newUser.id = uuidv1()
    newUser.name = req.body.name
    newUser.state = 0
    users.push(newUser)
    fs.writeFile('./present.json', JSON.stringify(users), (err) => {
        if (err)
            console.error(err)

    })
    res.json(users).end()
})

// Ändra närvaro
app.patch('/:state', (req, res) => {
    // Hämta ut en users index i arrayen utifrån medskickat id.
    let index = users.findIndex((user => user.id == req.body.id))
    users[index].state = req.params.state
    fs.writeFile('./present.json', JSON.stringify(users), (err) => {
        if (err)
            console.error(err)

    })
    res.json(users[index]).end()
})


app.listen(3000, () => {
    console.log("Närvarolistan snurrar.")
    // Läs fil, placera innehåll i users.
    fs.readFile('./present.json', 'utf8', (err, data) => {
        if (err)
            console.error(err)
        else
            users = JSON.parse(data)
    })
})
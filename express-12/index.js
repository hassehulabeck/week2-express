const express = require('express')
const app = express()

let users = require('./users.js')
let initString = "<html><head><meta charset ='utf-8'>"

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.end(initString + "Välkommen till users-sidan")
})

app.get('/users', (req, res) => {
    let data = initString + "<ul>"
    users.forEach(user => {
        data += `<li>${user.name} ${user.credits}</li>`
    })
    res.end(data)
})

app.get('/users/:userid', (req, res) => {
    let data = initString + "<ul>"
    let user = users.filter(user => {
        // Två likhetstecken eftersom user.id är number och req.params.x är string.
        // Alternativt gör en Number.parse på req.params.userid
        return user.id == req.params.userid
    })
    if (user) {
        for (let val in user[0]) {
            data += `<li>${val}: ${user[0][val]}</li>`
        }
    }
    res.end(data)
})

app.post('/users', (req, res) => {
    let newUser = {}
    // Gå igenom inskickad data och fyll upp newUser.
    console.log(req.body)
    users.push(req.body)
    res.end("User inserted")
})


app.listen(3000, () => {
    console.log("Lyssnar nu på övning 12, at famous port 3000!!!!")
})
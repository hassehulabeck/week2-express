const express = require('express')
const router = express.Router()
let users = require('./users.json')

function getUser(req) {
    // Hämta ut en användare utifrån id.
    let user = users.filter(user => {
        return user.id == req.params.userID
    })
    return user
}

router.route('/users')
    .get((req, res, next) => {
        res.json(users)
    })
    .post((req, res, next) => {
        // Vi förutsätter att all data är OK...
        users.push(req.body)
        res.end("User inserted")
    })
    .delete((req, res, next) => {
        users = []
        res.end("Galning, du har raderat alla användare!")
    })

router.route('/users/:userID')
    .get((req, res, next) => {
        res.json(getUser(req))
    })
    .put((req, res, next) => {
        // Hämta ut en användare utifrån id.
        let user = getUser(req)

        if (user.length == 1) {
            // Skriv över samtliga egenskaper.
            let index = users.findIndex((u => u == user[0]))
            users[index] = req.body
            res.end("Överskrivningen lyckades")
        }

    })
    .patch((req, res, next) => {
        // Hämta ut en användare utifrån id.
        let user = getUser(req)

        if (user.length == 1) {
            let success = true
            // Gå igenom request-datan och uppdatera den som matchar med aktuellt user-objekt.
            for (let property in req.body) {
                // Om egenskapen finns i user-objektet...
                if (property in user[0]) {
                    // ...så ersätt värdet med det inskickade.
                    user[0][property] = req.body[property]
                } else {
                    success = false
                }
            }
            if (success) res.end("Den partiella uppdateringen lyckades")
        }

    })
    .delete((req, res, next) => {
        // Hämta ut en användare utifrån id.
        let user = getUser(req)

        if (user.length == 1) {
            // Få fram index för användaren
            let index = users.findIndex((u => u == user[0]))
            users.splice(index, 1)
            res.end("Användaren är raderad")
        }
    })


module.exports = router
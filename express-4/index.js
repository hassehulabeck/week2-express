const users = require('./users.json')
/* En json-fil går att ta in med require, men då får vi INTE använda 'module.exports' och filen måste heta .json och vara .json-formaterad, dvs med citationstecken runt alla strängar, enbart siffror och true/false utan fnuttar. */

const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

// Ta emot parametrar i form av userID
app.get('/user/:userID', (req, res) => {
    res.write("<html>")

    // Filtrera ut en användare. Om ingen finns får vi en tom array.
    let user = users.filter(user => user.userID == req.params.userID)

    if (user.length == 0)
        res.write("No user")
    else {
        res.write(user[0].name)
    }
    res.end()
})


app.listen(3000, () => {
    console.log("lyssnar nu på 3000")
})
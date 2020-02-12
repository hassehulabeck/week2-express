const fs = require('fs')

function informUser(req, res, next) {
    let text = `Ingen produkt matchade din sökning!<p>
            <a href="/products">Till produktlistan</a>`
    res.status(404).send(text)
    next()
}

function loggIt(req, res, next) {
    let data = req.url + " visited at " + new Date().toISOString() + "\r"
    fs.appendFile('./access.log', data, (err) => {
        if (err) console.error(err)
    })
    next()
}

module.exports = {
    informUser,
    loggIt
}
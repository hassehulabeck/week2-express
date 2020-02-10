const express = require('express')
const router = express.Router()
const products = require('./products.json')

function sortProds() {

}

router.get('/', (req, res) => {
    // Kolla om vi fått med någon sorteringsquery
    let sortorder = "ASC"
    let sortproperty = "id"

    if (req.query.sortorder) {
        sortorder = req.query.sortorder
    }
    if (req.query.sortproperty) {
        sortproperty = req.query.sortproperty
    }

    if (sortorder || sortproperty) {
        products.sort((a, b) => {

            // return-satsen får sitt resultat via en ternary-operator
            if (a[sortproperty] > b[sortproperty])
                return sortorder == "DESC" ? -1 : 1
            else
                return sortorder == "DESC" ? 1 : -1
        })
    }

    res.json(products)
})
router.get('/:prodID', (req, res) => {
    let product = products.filter(product => {
        return product.id == req.params.prodID
    })
    if (product.length == 0) {
        throw new Error('noproduct')
    }
    res.json(product)
})



module.exports = router
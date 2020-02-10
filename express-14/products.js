const express = require('express')
const router = express.Router()
const products = require('./products.json')


router.get('/', (req, res) => {
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
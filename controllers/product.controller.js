

const productController = {};
const pool = require("../connection");

productController.getProductById = async (req, res) => {
    console.log(req.params.id)
     const id = parseInt(req.params.id)
     pool.query('SELECT * FROM producto WHERE productoid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).json(results.rows)
         }
     })
}

productController.createProduct = async (req, res) => {
    console.log(req.body)
    const { name, description, price, stock, categoryid } = req.body
     pool.query('INSERT INTO producto (name, description, price, stock, categoryid) VALUES ($1, $2, $3, $4, $5)', [name, description, price, stock, categoryid], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(201).send(`Product added`)
         }
     })
}

productController.updateProduct = async (req, res) => {
    console.log(req.body)
    const id = parseInt(req.params.id)
    const { name, description, price, stock, categoryid } = req.body
     pool.query('UPDATE producto set name = $1, description = $2, price = $3, stock = $4 , categoryid = $5 WHERE productoid = $6', [name, description, price, stock, categoryid, id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Product modified with ID: ${id}`)
         }
     })
}

productController.deleteProduct = async (req, res) => {
    const id = parseInt(req.params.id)
     pool.query('DELETE FROM producto WHERE productoid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Product deleted with ID: ${id}`)
         }
     })
}

module.exports = productController;
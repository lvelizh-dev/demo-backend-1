

const customerController = {};
const pool = require("../connection");

customerController.getCustomerById = async (req, res) => {
    console.log(req.params.id)
     const id = parseInt(req.params.id)
     pool.query('SELECT * FROM customer WHERE customerid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).json(results.rows)
         }
     })
}

customerController.createCustomer = async (req, res) => {
    console.log(req.body)
    const { name, email, phone, address } = req.body
     pool.query('INSERT INTO customer (name, email, phone, address) VALUES ($1, $2, $3, $4)', [name, email, phone, address], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(201).send(`Customer added`)
         }
     })
}

customerController.updateCustomer = async (req, res) => {
    console.log(req.body)
    const id = parseInt(req.params.id)
    const { name, email, phone, address } = req.body
     pool.query('UPDATE customer set name = $1, email = $2, phone = $3, address = $4 WHERE customerid = $5', [name, email, phone, address, id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Customer modified with ID: ${id}`)
         }
     })
}

customerController.deleteCustomer = async (req, res) => {
    const id = parseInt(req.params.id)
     pool.query('DELETE FROM customer WHERE customerid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Customer deleted with ID: ${id}`)
         }
     })
}

module.exports = customerController;
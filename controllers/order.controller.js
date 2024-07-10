

const orderController = {};
const pool = require("../connection");

orderController.getOrderById = async (req, res) => {
    console.log(req.params.id)
     const id = parseInt(req.params.id)
     pool.query('SELECT * FROM orders WHERE orderid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).json(results.rows)
         }
     })
}

orderController.createOrder = async (req, res) => {
    console.log(req.body)
    let last = await pool.query('SELECT orderid FROM orders ORDER BY orderid DESC LIMIT 1');
    let lastId = last.rows[0].orderid +1
    console.log("last", last)
    console.log("last", last.rows[0].orderid)
    const { customerid, status, products } = req.body
     pool.query('INSERT INTO orders (customerid, status) VALUES ($1, $2)', [customerid, status], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            for (let index = 0; index < products.length; index++) {
                //pool.query('INSERT INTO orderdetails (orderid, productid, quantity, total) VALUES ($1, $2, $3, $4)', [results.rows[0].orderid], (err, results) => {
                pool.query('INSERT INTO orderdetails (orderid, productid, quantity, total) VALUES ($1, $2, $3, $4)', [lastId, products[index].id, products[index].quantity, products[index].total], (err, results) => {
                })
                //res.status(201).send(`Order added`)
             }
             res.status(201).send(`Order added`)
         }
     })
}

orderController.updateOrder = async (req, res) => {
    console.log(req.body)
    const id = parseInt(req.params.id)
    const { name, description, price, stock, categoryid } = req.body
     pool.query('UPDATE orders set name = $1, email = $2, phone = $3, address = $4 WHERE orderid = $5', [name, description, price, stock, categoryid], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Order modified with ID: ${id}`)
         }
     })
}

orderController.deleteOrder = async (req, res) => {
    const id = parseInt(req.params.id)
     pool.query('DELETE FROM orders WHERE orderid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Order deleted with ID: ${id}`)
         }
     })
}

module.exports = orderController;
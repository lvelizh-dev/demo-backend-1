

const categoryController = {};
const pool = require("../connection");

categoryController.getCategoryById = async (req, res) => {
    console.log(req.params.id)
     const id = parseInt(req.params.id)
     pool.query('SELECT * FROM category WHERE id = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).json(results.rows)
         }
     })
}

categoryController.createCategory = async (req, res) => {
    console.log(req.body)
    const { name, description } = req.body
     pool.query('INSERT INTO category (name, description) VALUES ($1, $2)', [name, description], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(201).send(`Category added`)
         }
     })
}

categoryController.updateCategory = async (req, res) => {
    console.log(req.body)
    const id = parseInt(req.params.id)
    const { name, description } = req.body
     pool.query('UPDATE category set name = $1, description = $2 WHERE id = $3', [name, description, id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Category modified with ID: ${id}`)
         }
     })
}

categoryController.deleteCategory = async (req, res) => {
    const id = parseInt(req.params.id)
     pool.query('DELETE FROM category WHERE categoryid = $1', [id], (err, results) => {
         if (err) {
             console.log(err)
         } else {
            res.status(200).send(`Category deleted with ID: ${id}`)
         }
     })
}

module.exports = categoryController;
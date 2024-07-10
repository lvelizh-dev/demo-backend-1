// var pg = require("pg");
// var conString = "postgres://postgres:admin@localhost:5432/tarea-backend";

// var client = new pg.Client(conString);
// const connectToDB = async () => {
// await client.connect();

// // var query = await client.query("SELECT * FROM category");
// // query.rows.forEach(row=>{
// //     console.log(row);
// // });

// //await client.end();
// }
// //module.exports = connectToDB
// module.exports = client

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tarea-backend',
  password: 'admin',
  port: 5432,
})

module.exports = pool
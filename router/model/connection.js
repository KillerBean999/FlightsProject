const mysql2 = require('mysql2')
require('dotenv').config()

const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
//KNEX is query builder for node.js
const knex = require('knex').knex({
  client: 'mysql2',
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  }
});
// const knex = require('knex').knex({
//   client: 'mysql2',
//   connection: {
//     host : process.env.host,
//     port : process.env.port,
//     user : 'root',
//     password : process.env.password,
//     database : process.env.database
//   }
// });

connection.connect((err)=>{     
    if (err) {
        console.log(err);
    } else {
        console.log("connected to the database");
    }
})

module.exports={
    connection,
    knex
}
const e = require("express");
const mysql = require("mysql2");
var colors = require("colors");

const mysqlconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "employedbd"
});

mysqlconnection.connect((err) => {
  if (err) {
    console.log("Error in DB Conection" + JSON.stringify(err, undefined, 2));
  } else {
    console.log("DataBase Conectioned Successfully".underline.bgMagenta.bold);
  }
});

module.exports = mysqlconnection;

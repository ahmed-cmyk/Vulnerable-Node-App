const mysql = require("mysql");

var connection = mysql.createConnection({
  database: "vulnerable_node",
  user: "root",
  password: "",
});

module.exports = connection;

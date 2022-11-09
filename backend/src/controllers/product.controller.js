const connection = require("../services/db");

const get = async (req, res) => {
  connection.query("SELECT * FROM products", (error, results, fields) => {
    if (error) return res.status(400).json({ error: error });

    res.status(200).json(results);
  });
};

module.exports = { get };

const connection = require("../services/db");

const get = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "SELECT * FROM order WHERE customer_id = ?",
    [id],
    (error, results, fields) => {
      if (error) return res.status(400).json({ error: error });

      res.status(200).json(results);
    }
  );
};

const create = async (req, res) => {
  const { id } = req.body;

  await connection.query("INSERT INTO ");
};

module.exports = { get };

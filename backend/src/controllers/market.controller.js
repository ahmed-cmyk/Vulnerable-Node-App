const connection = require("../services/db");

const get = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "SELECT * FROM order WHERE customer_id = ?",
    [id],
    (error, results) => {
      if (error) return res.status(400).json({ error: error });

      res.status(200).json(results);
    }
  );
};

const show = async (req, res) => {
  const { customer_id } = req.params;
};

const create = async (req, res) => {
  const { customer_id, orders } = req.body;

  let order = new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO `order` (customer_id) VALUES (?)",
      [customer_id],
      (error, results, fields) => {
        if (error) return reject(error);

        return resolve(results["insertId"]);
      }
    );
  });

  order
    .then((order_id) => {
      let ordersArr = orders.map((obj) => [order_id, ...Object.values(obj)]);

      connection.query(
        "INSERT INTO orderProducts (order_id, product_id, qty) VALUES ?",
        [ordersArr],
        (error, results) => {
          if (error) return res.status(400).json({ error: error });

          res.status(200).json({ message: "success", order: results });
        }
      );
    })
    .catch((error) =>
      res.status(400).json({ error: error, id: typeof customer_id })
    );
};

module.exports = { get, show, create };

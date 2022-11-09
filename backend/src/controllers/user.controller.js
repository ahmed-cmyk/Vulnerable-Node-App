const connection = require("../services/db");

const get = async (req, res) => {
  await connection.query(
    "SELECT * FROM users",
    function (error, users, fields) {
      if (error)
        return res.status(400).json({ error: "An unknown error occured" });
      res.status(200).json(users);
    }
  );
};

const show = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "SELECT * FROM users WHERE id = ?",
    id,
    function (error, user, fields) {
      if (error)
        return res.status(400).json({ error: "An unknown error occured" });

      res.status(200).json(user);
    }
  );
};

const create = async (req, res) => {
  const { username, name, email, password } = req.body;

  await connection.query(
    "INSERT INTO users (username, name, email, password) VALUES(?,?,?,?)",
    [username, name, email, password],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: error.message });

      req.params = { id: results["insertId"] };
      show(req, res);
    }
  );
};

const update = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  await connection.query(
    "UPDATE users SET password = ? WHERE id = ?",
    [password, id],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: "Something went wrong" });

      show(req, res);
    }
  );
};

const destroy = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: "Something went wrong" });

      res.status(200).json(results);
    }
  );
};

module.exports = {
  get,
  show,
  create,
  update,
  destroy,
};

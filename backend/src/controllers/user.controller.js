const connection = require("../services/db");

const get = async (req, res) => {
  await connection.query("SELECT * FROM users", (error, users) => {
    if (error) return res.status(400).json({ error: error });
    res.status(200).json(users);
  });
};

const show = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "SELECT * FROM users WHERE id = ?",
    id,
    (error, user) => {
      if (error) return res.status(400).json({ error: error });

      res.status(200).json(user);
    }
  );
};

const create = async (req, res) => {
  const { username, name, email, password } = req.body;

  await connection.query(
    "INSERT INTO users (username, name, email, password) VALUES(?,?,?,?)",
    [username, name, email, password],
    (error, results) => {
      if (error) return res.status(400).json({ error: error });

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
    (error) => {
      if (error) return res.status(400).json({ error: error });

      show(req, res);
    }
  );
};

const destroy = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (error, results) => {
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

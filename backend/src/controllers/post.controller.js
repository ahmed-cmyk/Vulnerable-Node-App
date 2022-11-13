const connection = require("../services/db");

const get = async (req, res) => {
  await connection.query(
    "SELECT * FROM `posts`",
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: error });

      res.status(200).json(results);
    }
  );
};

const show = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "SELECT * FROM `posts` WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: error });

      res.status(200).json(results);
    }
  );
};

const create = async (req, res) => {
  const { title, body } = req.body;

  await connection.query(
    "INSERT INTO posts (title, body) VALUES(?,?)",
    [title, body],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: error });

      req.params = { id: results["insertId"] };
      show(req, res);
    }
  );
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  await connection.query(
    "UPDATE posts SET title = ?, body = ? WHERE id = ?",
    [title, body, id],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: error });

      req.params = { id: results["insertId"] };
      show(req, res);
    }
  );
};

const destroy = (req, res) => {
  const { id } = req.params;
  console.log(`--------${typeof id}`);
  connection.query(
    "DELETE FROM posts WHERE id = ?",
    [Number(id)],
    (error, results) => {
      if (error) return res.status(400).json({ error: error });

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

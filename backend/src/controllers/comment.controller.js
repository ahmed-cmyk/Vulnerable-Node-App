const connection = require("../services/db");

const get = async (req, res) => {
  const { id } = req.params;

  await connection.query(
    "SELECT * FROM comments WHERE post_id = ?",
    [id],
    function (error, comments, fields) {
      if (error) return res.status(404);

      res.status(200).json({ comments, status: 200 });
    }
  );
};

const show = async (req, res) => {
  const id = req.body;
  console.log(`---------------${id}`);
  await connection.query(
    "SELECT * FROM comments WHERE id = ?",
    [id],
    function (error, comment, fields) {
      if (error) return res.status(404);

      res.status(201).json({ comment, status: 201 });
    }
  );
};

const store = async (req, res) => {
  const { post_id, comment, author } = req.body;

  await connection.query(
    "INSERT INTO comments (post_id, comment, author) VALUES(?,?,?)",
    [post_id, comment, author],
    function (error, results, fields) {
      if (error) return res.status(404);

      req.body = results.insertId;
      show(req, res);
    }
  );
};

module.exports = {
  get,
  store,
};

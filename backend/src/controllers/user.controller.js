const connection = require("../services/db");

const get = async (req, res) => {
  //   const users = await User.find({}).sort({ createdAt: -1 });

  //   res.status(200).json(users);
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

  // const user = await User.findById(id)

  // if(!user) {
  //     return res.status(400).json({ error: 'An unknown error occured' })
  // }

  // res.status(200).json(user)
};

const create = async (req, res) => {
  const { username, name, email, password } = req.body;

  await connection.query(
    "INSERT INTO users (username, name, email, password) VALUES(?,?,?,?)",
    [username, name, email, password],
    function (error, results, fields) {
      if (error) return res.status(400).json({ error: error.message });

      res.status(200).json(results);
    }
  );
  //   try {
  //     const user = await User.create({ username, name, password });
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
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

  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(404).json({ error: "No user found" });
  //   }

  //   const user = await User.findByIdAndUpdate(id, { ...req.body }, { new: true });

  //   if (!user) {
  //     return res.status(400).json({ error: "An unknown error occured" });
  //   }

  //   res.status(200).json(user);
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

  //   if (!mongoose.Types.ObjectId.isValid(id)) {
  //     return res.status(404).json({ error: "No user found" });
  //   }

  //   const user = await User.findByIdAndDelete(id);

  //   if (!user) {
  //     return res.status(400).json({ error: "An unknown error occured" });
  //   }

  //   res.status(200).json(user);
};

module.exports = {
  get,
  show,
  create,
  update,
  destroy,
};

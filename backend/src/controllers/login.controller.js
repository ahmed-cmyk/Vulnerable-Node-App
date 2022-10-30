const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../configs/jwt.config");
const connection = require("../services/db");

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  await connection.query(
    "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1",
    [email, password],
    function (error, user, fields) {
      if (error) {
        return res.status(400).json({ error: "An Error Occured" });
      }

      user = user[0];

      const userForToken = {
        username: user.username,
        email: user.email,
        id: user._id,
      };

      const token = jwt.sign(userForToken, JWT_SECRET);

      res.status(200).json({
        token,
        user,
      });
    }
  );
});

module.exports = loginRouter;

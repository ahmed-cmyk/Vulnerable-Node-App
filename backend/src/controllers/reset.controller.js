const resetRouter = require("express").Router();
const connection = require("../services/db");
const User = require("../models/user.model");

resetRouter.patch("/", async (req, res) => {
  const { email, password } = req.body;

  await connection.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [password, email],
    (error, user, fields) => {
      if (error) {
        return res.status(400).json({
          error,
          errorText: "An unknown error occured",
        });
      }

      return res.status(200).json(user);
    }
  );
});

module.exports = resetRouter;

const forgetRouter = require("express").Router();
const randToken = require("rand-token");
const EMAIL_TRANSPORTER = require("../configs/nodemailer.config");
const connection = require("../services/db");

const generateToken = (s) => {
  var resetToken = randToken.generate(s, "0123456789");
  return Number(resetToken);
};

forgetRouter.post("/", async (req, res) => {
  const { email } = req.body;

  await connection.query(
    "SELECT * FROM users WHERE email = ?",
    email,
    (error, user) => {
      if (error) {
        return res.status(400).json({
          error,
          errorText: "An error occured",
        });
      }

      if (!user) {
        return res.status(400).json("Email does not exist");
      }

      const resetToken = generateToken(4);

      let info = EMAIL_TRANSPORTER.sendMail({
        from: "ikramahmed.test@gmail.com",
        to: email,
        subject: "Password Reset",
        text: `A password reset request was received from this address. Your token is ${resetToken}.`,
        html: `<p>A password reset request was received from this address.</p>
                <br />
                <p>Your token is ${resetToken}.</p>`,
      });

      console.log("Message sent: %s", info.messageId);

      res.status(200).json({
        email: email,
        resetToken: resetToken,
      });
    }
  );
});

module.exports = forgetRouter;

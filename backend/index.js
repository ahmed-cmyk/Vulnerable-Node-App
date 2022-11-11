const { adminJS, router } = require("./src/configs/admin.config");
const cors = require("cors");
const connection = require("./src/services/db");
const express = require("express");
const postsRouter = require("./src/routes/posts.route");
const productsRouter = require("./src/routes/products.route");
const commentsRouter = require("./src/routes/comments.route");
const usersRouter = require("./src/routes/users.route");
const loginRouter = require("./src/controllers/login.controller");
const marketRouter = require("./src/routes/market.route");
const forgetRouter = require("./src/controllers/forget.controller");
const config = require("./src/configs/server.config");
const tokenExtractor = require("./src/middleware/token.middleware");
const userExtractor = require("./src/middleware/user.middleware");
const errorHandler = require("./src/middleware/error.middleware");
const resetRouter = require("./src/controllers/reset.controller");
const app = express();

app.use(cors());
app.use(express.json());

app.use(tokenExtractor);

app.use("/api/comments", commentsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/market", marketRouter);
app.use("/api/forgot", forgetRouter);
app.use("/api/reset", resetRouter);
app.use(adminJS.options.rootPath, router);

app.use(errorHandler);

connection.connect((err) => {
  if (err) {
    console.error("error connecting " + err.stack);
    return;
  }

  console.log("Connection to MySQL database was successful");
  console.log("Connection ID: " + connection.threadId);

  app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`);
  });
});

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     app.listen(config.PORT, () => {
//       console.log(`Server listening on port ${config.PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));

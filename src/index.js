const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const errorHandler = require('./middlewares/errorHandler');
const port = process.env.port;
const host = process.env.host;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use(errorHandler);

app.listen(port, "0.0.0.0", () => {
  console.log(`berhasil cuy ${host}${port}`);
});

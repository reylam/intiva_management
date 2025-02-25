const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const port = process.env.port;
const host = process.env.host;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`berhasil cuy ${host}${port}`);
});

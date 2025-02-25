const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const authRoutes = require("./routes/auth.routes")
const port = process.env.port;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/auth", authRoutes);

app.listen(port,() => {
    console.log(`berhasil cuy http://localhost:${port}`)
})
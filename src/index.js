const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const announceRoutes = require("./routes/announceRoutes");
const tagRoutes = require("./routes/tagRoutes");
const port = process.env.port;
const host = process.env.host;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/announce", announceRoutes);
app.use("/tag", tagRoutes);


app.listen(port, "0.0.0.0", () => {
  console.log(`berhasil cuy ${host}${port}`);
});

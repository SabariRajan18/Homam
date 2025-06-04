import express from 'express';
import routers from "./routes/index";
import path from "path";
const app = express();
require("dotenv").config();
const { PORT } = process.env;

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use(express.static('src/public'));

app.use("/", routers)
// app.get('/', (_req, res) => {
//   res.send("Welcome To Abu's Backend!");
// });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
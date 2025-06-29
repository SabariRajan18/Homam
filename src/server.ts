import express from 'express';
import routers from "./routes/index";
import path from "path";
import { connectDB } from './config';
const app = express();
require("dotenv").config();
const { PORT } = process.env;
connectDB();
app.use(express.json());
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs");
app.use(express.static('src/public'));

app.use("/", routers)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
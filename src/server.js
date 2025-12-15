import express from "express";
import routers from "./routes/index.js";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url"; // <-- add this
import { connectDB } from "./config/index.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { PORT } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000", // dev
  "https://rameswaram-homam.com", // prod
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(new Error("CORS not allowed"));
    },
    credentials: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", routers);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

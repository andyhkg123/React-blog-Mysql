import express from "express";
import mysql from "mysql2";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
const port = 8080;

const app = express();
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // If you need to support cookies or other credentials
  })
);

app.listen(port, () => {
  console.log(` listening on http://localhost:${port}/`);
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});

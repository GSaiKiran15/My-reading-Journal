import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
// import { database, host, password, port } from "pg/lib/defaults";

const PORT = 3000;
const app = express();
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "ReadingJournal",
  password: "saikiran",
  port: 5432,
});

db.connect();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { rows: book } = await db.query("select * from books");
  console.log(book[0].s_desc);

  res.render("index.ejs", { book });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

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
  console.log(book[0]);
  res.render("index.ejs", { book });
});

app.post("/full", async (req, res) => {
  let selectedBookID = parseInt(req.body.clickID);
  console.log(typeof selectedBookID, selectedBookID);
  const { rows: book } = await db.query("select * from books where id = $1", [
    selectedBookID,
  ]);
  res.render("description.ejs", {
    book: book[0],
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

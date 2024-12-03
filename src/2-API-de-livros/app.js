const express = require("express");
const app = express();

app.use(express.json()); // ContentType

let books = [];

app.post("/books", (req, res) => {
  const book = req.body;
  if (
    !book.titulo ||
    !book.autor ||
    !book.edicao ||
    !book.local ||
    !book.ano ||
    !book.editora
  ) {
    return res
      .status(400)
      .json({
        error:
          "Título, autor, edição, localidade, ano de publicação e editora são requiridos",
      });
  }
  book.id = books.length + 1;
  books.push(book);
  res.status(201).json(book);
});

app.get("/books", (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.put("/books/:id", (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.delete("/books/:id", (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.post("/loans", (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.post("/returns", (req, res) => {
  const user = req.body;
  if (!user.name || !user.email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  user.id = users.length + 1;
  users.push(user);
  res.status(201).json(user);
});

app.get("/users", (req, res) => {
  res.json(users);
});

module.exports = { app, users };

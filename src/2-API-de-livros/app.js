const express = require("express");
const app = express();

app.use(express.json()); // ContentType

// Banco de dados
let books = [];

// Para adicionar um novo livro
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
    return res.status(400).json({
      error:
        "Título, autor, edição, localidade, ano de publicação e editora são requeridos",
    });
  }
  book.id = books.length + 1;
  books.push(book);
  res.status(201).json(book);
});

// Para listar todos os livros
app.get("/books", (req, res) => {
  res.status(200);
});

// Para atualizar informações de um livro
app.put("/books/:id", (req, res) => {
  const modBook = req.body;
  const id = req.params.id;
  let index = books.findIndex((obj) => obj.id === id);

  if (
    !modBook.titulo ||
    !modBook.autor ||
    !modBook.edicao ||
    !modBook.local ||
    !modBook.ano ||
    !modBook.editora
  ) {
    return res.status(400).json({
      error:
        "Título, autor, edição, localidade, ano de publicação e editora são requeridos",
    });
  }

  books[index] = modBook;
  res.status(200);
});

// Para remover um livro
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  let index = books.findIndex((obj) => obj.id === id);

  if (!id) return res.status(400).json({ error: "Id é requerido" });

  books.splice(index, 1);
  res.status(200);
});

// Para realizar um empréstimo
app.post("/loans/:id", (req, res) => {
  const id = req.params.id;
  let index = books.findIndex((book) => book.id === id);

  if (!id) return res.status(400).json({ error: "Id é requerido" });

  books[index].emprestado = "sim";
  res.status(200);
});

// Para realizar a devolução de um livro
app.post("/returns/:id", (req, res) => {
  const id = req.params.id;
  let index = books.findIndex((book) => book.id === id);

  if (!id) {
    return res.status(400).json({ error: "Id é requerido" });
  }

  books[index].emprestado = "não";
  res.status(200);
});

module.exports = { app, users };

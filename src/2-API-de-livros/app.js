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
  res.status(200).json(books);
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
  res.status(200).json(books[index]);
});

// Para remover um livro
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  let index = books.findIndex((obj) => obj.id === id);

  if (!id) return res.status(400).json({ error: "Id é requerido" });

  books.splice(index, 1);
  res.status(200).json("Livro " + id + " deletado com sucesso!");
});

// Para realizar um empréstimo
app.post("/loans/:id", (req, res) => {
  const id = req.params.id;
  let index = books.findIndex((obj) => obj.id == id);

  if (index == -1) return res.status(404).json("Livro não foi encontrado!");
  if (books[index].emprestado == "sim")
    return res.status(400).json({ error: "Livro já está sendo emprestado!" });
  if (!id) return res.status(400).json({ error: "Id é requerido" });

  books[index].emprestado = "sim";
  res
    .status(200)
    .json("O livro está sendo emprestado? A: " + books[index].emprestado);
});

// Para realizar a devolução de um livro
app.post("/returns/:id", (req, res) => {
  const id = req.params.id;
  let index = books.findIndex((obj) => obj.id == id);

  if (index == -1)
    return res.status(404).json({ error: "Livro não foi encontrado!" });
  if (books[index].emprestado == "não")
    return res
      .status(400)
      .json({ error: "Livro não foi emprestado para ser devolvido!" });
  if (!id) return res.status(400).json({ error: "Id é requerido" });

  books[index].emprestado = "não";
  res
    .status(200)
    .json("O livro está sendo emprestado? A: " + books[index].emprestado);
});

module.exports = { app, books };

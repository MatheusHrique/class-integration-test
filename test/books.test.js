const request = require("supertest");
const { app, books } = require("../src/2-API-de-livros/app");

describe("API de livros", () => {
  beforeEach(() => {
    books.length = 0; // Limpa o array de usuários antes de cada teste
  });

  it("a adição de um novo livro com dados válidos", async () => {
    const newBook = {
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    };

    const response = await request(app)
      .post("/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id", 1);
    expect(books).toHaveLength(1);
  });

  it("a validação ao tentar adicionar um livro com dados inválidos", async () => {
    const newBook = { titulo: "titulo" };

    const response = await request(app)
      .post("/books")
      .send(newBook)
      .expect(400)
      .expect("Content-Type", /json/);

    expect(response.body).toEqual({
      error:
        "Título, autor, edição, localidade, ano de publicação, editora e id são requeridos",
    });
    expect(books).toHaveLength(0);
  });

  it("a listagem de todos os livros", async () => {
    books.push({
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    });

    const response = await request(app)
      .get("/books")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    });
  });

  it("a atualização das informações de um livro existente", async () => {
    const newBook = {
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    };
    const id = 1;

    const response = await request(app)
      .put("/books/" + id)
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("a remoção de um livro e confirmação de que ele não existe mais", async () => {
    const newBook = {
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    };

    const response = await request(app)
      .post("/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id", 1);
    expect(books).toHaveLength(1);
  });

  it("a realização de um empréstimo, garantindo que o livro não esteja disponível para outro empréstimo", async () => {
    const newBook = {
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    };

    const response = await request(app)
      .post("/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id", 1);
    expect(books).toHaveLength(1);
  });

  it("a realização da devolução de um livro, tornando-o disponível novamente", async () => {
    const newBook = {
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    };

    const response = await request(app)
      .post("/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id", 1);
    expect(books).toHaveLength(1);
  });

  it("o comportamento ao tentar emprestar um livro indisponível ou inexistente", async () => {
    const newBook = {
      titulo: "titulo",
      autor: "autor",
      local: "local",
      edicao: "edicao",
      ano: 2024,
      editora: "editora",
    };

    const response = await request(app)
      .post("/books")
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id", 1);
    expect(books).toHaveLength(1);
  });
});
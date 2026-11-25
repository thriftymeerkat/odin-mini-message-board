// app.js
const express = require("express");
const path = require("node:path");
const app = express();

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New" },
];

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

app.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", links: links, messages: messages })
});

app.get("/new", (req, res) => {
  res.render("new", { title: "New Post", links: links })
});

// Error-handling middleware goes last
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Mini Message Board - listening on port ${PORT}!`);
});
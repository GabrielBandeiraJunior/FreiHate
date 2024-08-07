const express = require("express");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const cors = require('cors'); // Adicionar esta linha

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Adicionar esta linha para permitir CORS

// Configuração da conexão
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '000000',
  database: 'gabrielforum',
});

// Conectar ao banco de dados
db.connect((error) => {
  if (error) {
    console.log("Erro ao conectar ao MySQL:", error);
  } else {
    console.log("MYSQL CONECTADO!");
  }
});

// Rota de Registro
app.post("/register", (req, res) => {
  const { nome, email, password } = req.body;
  console.log("Dados recebidos para cadastro:", { nome, email, password });

  const sql = "INSERT INTO usuarios (usuario, email, password) VALUES (?, ?, ?)";

  db.query(sql, [nome, email, password], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar no banco de dados:", err);
      res.status(500).send("Erro ao cadastrar.");
    } else {
      res.send("Registro realizado com sucesso.");
    }
  });
});

// Rota de Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Erro ao fazer login:", err);
      res.status(500).send("Erro ao fazer login.");
    } else {
      if (result.length > 0) {
        res.send({ existe: true });
      } else {
        res.send({ existe: false });
      }
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

module.exports = db;

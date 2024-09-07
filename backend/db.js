const express = require("express");
/* express é o framework */
const bodyParser = require("body-parser");
/* permite analisar o corpo das requisicoes
 HTTP (dados enviados no corpo da requisição) */
const mysql = require('mysql2');
/* modulo que permite interagir com o mysql*/
 
const cors = require('cors');

// Função para criar e configurar o servidor
const createServer = () => {
  /*define uma funcao createserver que cria e
    configura uma instancia do servidor */
  const app = express();
  /*cria uma aplicacao express*/
  
  app.use(bodyParser.json());
  /*Configura o express para usar o body-parser
     para interpretar JSOn no corpo das requisicoes*/
  app.use(cors());
  /*habilita o Cors , permitindo acesso à API de diferentes
    Origens */
  
  const db = configureDatabase();
  /*Configura a conexao com o banco de dados chamando a
    função "configureDataBase" */

  
  defineRoutes(app, db);
  /* Configuras as rotas da API chmando a 
    função "defineRoutes" */

  return app;
  /*Retorna a instância do servidor Express cofigurada */
};

// Função para configurar a conexão com o banco de dados
const configureDatabase = () => {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '000000',
    database: 'gabrielforum',
  });

  db.connect((error) => {
    if (error) {
      console.log("Erro ao conectar ao MySQL:", error);
    } else {
      console.log("MYSQL CONECTADO!");
    }
  });

  return db;
};

// Função para definir as rotas
const defineRoutes = (app, db) => {
  app.post("/register", async (req, res) => {
    const { nome, email, password } = req.body;
    console.log("Dados recebidos para cadastro:", { nome, email, password });

    try {
      const emailExists = await checkEmailExists(db, email);
      
      if (emailExists) {
        return res.status(400).send("Email já está em uso.");
      }

      await registerUser(db, nome, email, password);//Await espera a funcao registerUser terminar por completo pra depois executar o resto.
      res.send("Registro realizado com sucesso.");
    } catch (error) {
      console.error("Erro ao registraaar:", error);
      res.status(500).send("Erro ao registraaar.");
    }
  });

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const userExists = await verifyUser(db, email, password);
      res.send({ existe: userExists });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      res.status(500).send("Erro ao fazer login.");
    }
  });
};

// Função para verificar se o email já existe
const checkEmailExists = (db, email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) return reject("Este email já está cadastrado! Faça Login ou Cadastre-se usando outro Email",err)
      resolve(result.length > 0)
    })
  })
}

// Função para registrar um novo usuário
const registerUser = (db, nome, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO usuarios (usuario, email, password) VALUES (?, ?, ?)";
    db.query(sql, [nome, email, password], (err) => {
      if (err) return alert("Este email já está cadastrado! Faça Login ou Cadastre-se usando outro Email",err)
      resolve();
    });
  });
};

// Função para verificar se o usuário existe
const verifyUser = (db, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
      if (err) return reject(err);
      resolve(result.length > 0);
    });
  });
};


// Inicializar o servidor
const app = createServer();
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});

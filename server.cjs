const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv")
dotenv.config()

// Configuração do servidor

// Servir arquivos estáticos a partir da pasta 'build'
app.use(express.static(path.join(__dirname, "dist")));

// Configuração da rota para todos os caminhos
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

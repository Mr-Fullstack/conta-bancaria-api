const express = require("express");
const verificarAutenticacao = require("../intermediarios/verificarAutenticacao")
const obterContas = require("../controladores/contas/obter")
const criarConta = require("../controladores/contas/criar")
const atualizarConta = require("../controladores/contas/atualizar")
const deletarConta = require("../controladores/contas/deletar");
const saldo = require("../controladores/contas/saldo");
const extrato = require("../controladores/contas/extrato");
const router = express.Router()

router.get("/contas",verificarAutenticacao,obterContas)
router.get("/contas/saldo",saldo)
router.get("/contas/extrato",extrato)
router.post("/contas",criarConta)
router.put("/contas/:numeroConta/usuario",atualizarConta)
router.delete("/contas/:numeroConta",deletarConta)

module.exports = {
  rotas:router
}



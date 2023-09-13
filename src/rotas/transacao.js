const express = require("express");
const realizarDeposito = require("../controladores/transacoes/depositar")
const realizarSaque = require("../controladores/transacoes/sacar")
const realizarTransferencia = require("../controladores/transacoes/transferir")

const router = express.Router()

router.post("/transacoes/depositar",realizarDeposito)
router.post("/transacoes/sacar",realizarSaque)
router.post("/transacoes/transferir",realizarTransferencia)

module.exports = {
  rotas:router
}



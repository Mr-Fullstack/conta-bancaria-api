const express = require("express");
const conta = require("./rotas/conta");
const transacao = require("./rotas/transacao");
const { emailValido } = require("./utilidades/textos.utilidade");

const port = 3000
const app = express()

app.use(express.json())
app.use(conta.rotas)
app.use(transacao.rotas)

app.listen(port,()=> console.log(`Server is running on port:${port}`))

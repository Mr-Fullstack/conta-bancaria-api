const { depositos } = require("../bancodedados");

async function registrar(dados)
{
  depositos.push(dados)
  return { dados }
}

async function encontrar(numero_conta)
{
  return {dados: depositos.filter( deposito => deposito.numero_conta === numero_conta )}
}

async function encontrarTodos()
{
  return {dados: depositos}
}

module.exports = {
  registrar,
  encontrarTodos,
  encontrar
}
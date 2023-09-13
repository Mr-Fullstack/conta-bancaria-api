const bancodedados = require("../bancodedados");

async function registrar(dados)
{
  bancodedados.saques.push(dados)
  return {dados}
}

async function encontrar(numero_conta)
{
  return {dados:bancodedados.saques.filter( deposito => deposito.numero_conta === numero_conta )}
}

async function encontrarTodos()
{
  return { dados:bancodedados.saques }
} 

module.exports = {
  registrar,
  encontrarTodos,
  encontrar
}
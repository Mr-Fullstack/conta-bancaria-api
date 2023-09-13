const bancodedados = require("../bancodedados");

async function registrar(dados)
{
 bancodedados.transferencias.push(dados)
 return {dados}
}

async function encontrarRealizadas(numero_conta)
{
  return {dados:bancodedados.transferencias.filter( transferencia => transferencia.numero_conta_origem === numero_conta)}
}

async function encontrarTodas()
{
  return {dados:bancodedados.transferencias}
}

async function encontrarRecebidas(numero_conta)
{
  return {dados: bancodedados.transferencias.filter( transferencia => transferencia.numero_conta_destino === numero_conta )}
}
module.exports = {
  registrar,
  encontrarTodas,
  encontrarRealizadas,
  encontrarRecebidas
}
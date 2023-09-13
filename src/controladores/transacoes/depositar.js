const { depositar } = require("../../servicos/conta.servico")
const { sucesso } = require("../../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res)
{
  const {  numero_conta, valor } = req.body
  
  const deposito = await depositar(numero_conta,valor)
  if(deposito.error) return res.status(deposito.error.codigo).json({mensagem:deposito.error.mensagem})
  
  return res.status(sucesso.aceito).end() 
}
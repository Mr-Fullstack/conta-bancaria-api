const { sacar } = require("../../servicos/conta.servico")
const { sucesso } = require("../../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res)
{
  const { numero_conta, valor, senha } = req.body
  
  const saque = await sacar(numero_conta,senha,valor)
  if(saque.error) return res.status(saque.error.codigo).json({mensagem:saque.error.mensagem})

  return res.status(sucesso.aceito).end() 
}
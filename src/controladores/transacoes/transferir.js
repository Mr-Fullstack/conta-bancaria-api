const { sacar, transferencia } = require("../../servicos/conta.servico")
const { sucesso } = require("../../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res)
{
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
  
  const transferir = await transferencia(numero_conta_origem, numero_conta_destino, senha,valor)
  if(transferir.error) return res.status(transferir.error.codigo).json({mensagem:transferir.error.mensagem})

  return res.status(sucesso.aceito).end() 
}


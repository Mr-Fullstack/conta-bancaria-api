const { fecharConta, obterConta } = require("../../servicos/conta.servico")
const { excluirUsuario } = require("../../servicos/usuario.servico")
const { sucesso } = require("../../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res)
{
  const { numeroConta } = req.params
  
  const fechar_conta = await fecharConta(numeroConta)
  if(fechar_conta.error) return res.status(fechar_conta.error.codigo).json({mensagem:fechar_conta.error.mensagem})

  return res.status(sucesso.aceito).end() 
}
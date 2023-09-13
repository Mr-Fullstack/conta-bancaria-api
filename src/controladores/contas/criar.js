const { abrirConta } = require("../../servicos/conta.servico")
const { criarUsuario } = require("../../servicos/usuario.servico")
const { sucesso } = require("../../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res)
{
  const usuario  = await criarUsuario(req.body)
  if(usuario.error) return res.status(usuario.error.codigo).json({mensagem:usuario.error.mensagem})
  
  const conta_bancaria = await abrirConta(usuario.dados)
  if(conta_bancaria.error) return res.status(conta_bancaria.error.codigo).json({mensagem:conta_bancaria.error.mensagem})
  
  return res.status(sucesso.criado).end() 
}
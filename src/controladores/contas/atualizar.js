const { atualizarUsuario } = require("../../servicos/usuario.servico")
const { sucesso } = require("../../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res)
{
  const { numeroConta } = req.params
  
  const usuario = await atualizarUsuario(numeroConta,req.body)
  if(usuario.error) return res.status(usuario.error.codigo).json({mensagem:usuario.error.mensagem})
  
  return res.status(sucesso.criado).end() 
}
const config = require("../config")
const { errorDoUsuario, erro } = require("../utilidades/codigosDeRetorno.utilidade")

module.exports = async function (req,res,next) {
  const { senha_banco } = req.query
  if(config.banco.senha !== senha_banco )
    return res.status(erro.cliente.nao_autorizado).json({ "mensagem": "A senha do banco informada é inválida!"})
  return next()
}
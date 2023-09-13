const { obterExtrato } = require("../../servicos/conta.servico");

module.exports = async function (req,res)
{
  const { numero_conta, senha } = req.query
  
  const extrato = await obterExtrato(numero_conta,senha);
  if(extrato.error) return res.status(extrato.error.codigo).json({mensagem:extrato.error.mensagem})
  
  return res.json(extrato.dados)
}
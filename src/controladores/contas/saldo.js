const { obterSaldo } = require("../../servicos/conta.servico");

module.exports = async function (req,res)
{
  const { numero_conta, senha } = req.query
  
  const saldo = await obterSaldo(numero_conta,senha);
  if(saldo.error) return res.status(saldo.error.codigo).json({mensagem:saldo.error.mensagem})
  
  return res.json(saldo.dados)
}
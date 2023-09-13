const { obterTodasConta } = require("../../servicos/conta.servico");
module.exports = async function (req,res)
{
  const contas = await obterTodasConta()
  return res.json(contas.dados)
}
const { erro } = require("./codigosDeRetorno.utilidade")
const { formatarData } = require("./datas.utilidade")

function montarObjetoConta(dadosDaConta)
{
  return {
    numero:dadosDaConta.id.toString(),
    saldo:dadosDaConta.saldo,
  }
}

function validarDadosParaTransacoes(dadosDeTransacao,senhaCorreta)
{
  const { conta_id, valor, senha  } = dadosDeTransacao 
  const resposta = {
    error:undefined
  } 
  if(valor) 
  {
    if(valor < 0 )
    { 
      resposta.error = { 
        mensagem: "Valor de saque não pode ser valor negativo",
        codigo: erro.cliente.solicitacao_ruim 
      }
    }
    if(valor === 0 ) 
    {
      resposta.error ={  
        mensagem: "Valor de saque não pode ser zerado.",
        codigo: erro.cliente.solicitacao_ruim
      }
    }
  }
  if(senha && Number(senhaCorreta) !== Number(senha))
  {
    resposta.error = { 
      mensagem: "Senha inválida.",
      codigo: erro.cliente.solicitacao_ruim
    }
  }
  if(conta_id && isNaN(conta_id))
  {
    resposta.error = { 
      mensagem:"Necessário informar um id válido", 
      codigo: erro.cliente.solicitacao_ruim
    }
  }
  return resposta
}

function montarObjetodDeRegistro(contaId,valor,contaDestinoId)
{
  const data = formatarData(new Date().getTime(),"yyyy-MM-dd HH:mm:ss") 
  if(contaDestinoId)
    return { data, numero_conta_origem:contaId, numero_conta_destino:contaDestinoId, valor }
  return { data, numero_conta: contaId, valor }
}

module.exports = {
  montarObjetoConta,
  validarDadosParaTransacoes,
  montarObjetodDeRegistro
}

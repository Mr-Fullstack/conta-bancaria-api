const ContaRepositorio = require("../repositorios/conta.repositorio")
const DepositoRepositorio= require("../repositorios/deposito.repositorio")
const UsuarioRepositorio = require("../repositorios/usuario.repositorio")
const SaqueRepositorio = require("../repositorios/saque.repositorio")
const TransferenciaRepositorio = require("../repositorios/transferencia.respositorio")
const { erro } = require("../utilidades/codigosDeRetorno.utilidade")
const { validarDadosParaTransacoes, montarObjetodDeRegistro } = require("../utilidades/conta.utilidade")

async function transferencia (conta_origem_id,conta_destino_id,senha_conta_origem,valor)
{
  const conta_origem = await ContaRepositorio.encontrar(conta_origem_id)
  const conta_destino = await ContaRepositorio.encontrar(conta_destino_id)
  if(conta_origem.error) return { 
    error:{
      mensagem:"Conta origem não encontrada.", 
      codigo:conta_origem.error.codigo 
    }
  }
  if(conta_destino.error) return { 
    error:{ 
      mensagem:"Conta destino não encontrada.", 
      codigo:conta_destino.error.codigo
    }
  }
  
  const dados_validos = validarDadosParaTransacoes({ valor, senha: senha_conta_origem },conta_origem.dados.usuario.senha)
  if (dados_validos.error) return {error:dados_validos.error}

  if(conta_origem.dados.saldo < valor) return {
    error:{
      mensagem:"Saldo insuficiente!",
      codigo:erro.cliente.entidade_nao_processavel
    }
  }
  await ContaRepositorio.atualizar(conta_origem.dados.numero,{ saldo: conta_origem.dados.saldo - valor  })
  await ContaRepositorio.atualizar(conta_destino.dados.numero,{ saldo: conta_destino.dados.saldo + valor })
  return await TransferenciaRepositorio.registrar(montarObjetodDeRegistro(conta_origem_id,valor,conta_destino_id))
}

async function depositar (conta_id, valor)
{ 
  const conta = await ContaRepositorio.encontrar(conta_id)
  if (conta.error) return { error: conta.error }
  
  const dados_validos = validarDadosParaTransacoes({valor})
  if (dados_validos.error) return { error: dados_validos.error }
  
  await ContaRepositorio.atualizar(conta.dados.numero,{ saldo:conta.dados.saldo + valor })
  return await DepositoRepositorio.registrar(montarObjetodDeRegistro(conta_id,valor))
}

async function sacar (contaId, senha_conta_origem, valor)
{
  const conta = await ContaRepositorio.encontrar(contaId)
  if(conta.error) return { error: conta.error }
  
  const dados_validos = validarDadosParaTransacoes( { valor, senha:senha_conta_origem },conta.dados.usuario.senha)
  if (dados_validos.error) return { error:dados_validos.error }
  
  if(conta.dados.saldo < valor)
    return { error: { mensagem:"Saldo insuficiente!", codigo: erro.cliente.entidade_nao_processavel }}
  
  await ContaRepositorio.atualizar(conta.dados.numero,{ saldo:conta.dados.saldo - valor })
  return await SaqueRepositorio.registrar(montarObjetodDeRegistro(contaId,valor))
}

async function abrirConta(dados_da_conta)
{
  const usuario = await UsuarioRepositorio.encontrar(dados_da_conta.id)
  if(usuario.error) return { error: usuario.error }
  
  const { dados, error } = await ContaRepositorio.salvar({ usuario_id: usuario.dados.id, saldo:0 })
  if(error) return { error: error }
  
  return dados
}

async function fecharConta(conta_id)
{
  const id_valido = validarDadosParaTransacoes({ conta_id })
  if(id_valido.error) return {error:id_valido.error}
  
  const conta = await ContaRepositorio.encontrar(conta_id)
  if(conta.error) return { error: conta.error} 
  
  if(conta.dados.saldo > 0 ) 
    return {error:{mensagem:"A conta só pode ser removida se o saldo for zero!", codigo: erro.cliente.entidade_nao_processavel}}
  
  await ContaRepositorio.deletar(conta_id)
  return await UsuarioRepositorio.deletar(conta.dados.usuario.id)
}

async function obterTodasConta()
{
  return await ContaRepositorio.encontrarTodas()
}

async function obterConta(conta_id)
{
  const id_valido = validarDadosParaTransacoes({ conta_id })
  if(id_valido.error) return { error: id_valido.error }
  
  return await ContaRepositorio.encontrar(conta_id)
}

async function obterSaldo(conta_id,senha)
{
  const id_valido = validarDadosParaTransacoes({ conta_id })
  if(id_valido.error) return {error:id_valido.error}
  
  const conta = await ContaRepositorio.encontrar(conta_id)
  if(conta.error) return { error: conta.error }
  
  const senha_valida = validarDadosParaTransacoes({ senha },conta.dados.usuario.senha)
  if (senha_valida.error) return { error:senha_valida.error } 
  
  return { dados: { saldo: conta.dados.saldo }}
}

async function obterExtrato(conta_id,senha)
{
  const id_valido = validarDadosParaTransacoes({ conta_id })
  if(id_valido.error) return { error: id_valido.error } 
  
  const conta = await ContaRepositorio.encontrar(conta_id)
  if( conta.error ) return { error: conta.error } 
  
  const senha_valida = validarDadosParaTransacoes({ senha },conta.dados.usuario.senha)
  if (senha_valida.error) return { error: senha_valida.error } 
  
  const { dados: saques } = await SaqueRepositorio.encontrar(conta_id)
  const { dados: depositos } = await DepositoRepositorio.encontrar(conta_id)
  const { dados: transferencia_realizadas} = await TransferenciaRepositorio.encontrarRealizadas(conta_id)
  const { dados: transferencia_recebidas} = await TransferenciaRepositorio.encontrarRecebidas(conta_id)
  
  return {
    dados:{ 
      depositos: depositos.length >= 1 ? depositos : "Não foram encontrados depositos." ,
      saques: saques.length >=1 ? saques : "Não foram encontrados saques."  ,
      transferenciasEnviadas:transferencia_realizadas.length >= 1 ? transferencia_realizadas : "Não foram encontrados transferencias realizadas.",
      transferenciasRecebidas:transferencia_recebidas.length >= 1 ? transferencia_recebidas: "Não foram encontrados transferencias recebidas." ,
    }
  }
}

module.exports = {
  sacar,
  depositar,
  obterConta,
  abrirConta,
  fecharConta,
  transferencia,
  obterTodasConta,
  obterSaldo,
  obterExtrato
}


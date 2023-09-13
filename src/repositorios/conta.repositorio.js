const { contas } = require("../bancodedados")
const { erro } = require("../utilidades/codigosDeRetorno.utilidade")
const UsuarioRepositorio = require("../repositorios/usuario.repositorio")
const { montarObjetoConta } = require("../utilidades/conta.utilidade")
const { montarObjetoUsuario } = require("../utilidades/usuario.utilidade")

async function salvar(dados_da_conta)
{
  const resposta = {}
  const esta_conta_ja_existe = contas.some(conta => conta.id === dados_da_conta.id)
  if(esta_conta_ja_existe)
  {
    resposta.error = { 
      mensagem:"A Conta já existe para o id informado!",
      codigo:erro.cliente.entidade_nao_processavel
    }
  }
  else
  { 
    const ultimo_id = contas.length >= 1 ? contas[contas.length-1].id+1 : 1
    const nova_conta = { 
      ...dados_da_conta, 
      id: Math.max(ultimo_id, contas.length), 
      usuario_id: dados_da_conta.usuario_id 
    }
    contas.push(nova_conta)
    resposta.dados = nova_conta
  }
  return resposta
}

async function encontrar(usuario_id)
{
  const resposta = {}
  const conta_encontrada = contas.find( conta => conta.id === Number(usuario_id) )
  if(!conta_encontrada)
  {
    resposta.error = {
      mensagem:"Conta não encontrada.",
      codigo:erro.cliente.conteudo_nao_encontrado
    }
  }
  else 
  {
    const usuario = await UsuarioRepositorio.encontrar(conta_encontrada.usuario_id)
    resposta.dados = {...montarObjetoConta(conta_encontrada),usuario:usuario.dados}
  }
  return resposta
}

async function deletar(id)
{ 
  const resposta = {}
  const conta_index = contas.findIndex(conta => conta.id  === Number(id) )
  if(conta_index >= 0 ) contas.splice(conta_index,1)
  else {
    resposta.error = {  
      mensagem:"Conta não encontrada",
      codigo:erro.cliente.conteudo_nao_encontrado
    }
  }
  return resposta
}

async function encontrarTodas()
{
  const todasContas = []
  if(contas.length>=1)
  {
    for(let conta = 0; conta < contas.length; conta++ )
    {
      let conta_atual = contas[conta]
      let usuario = await UsuarioRepositorio.encontrar(conta_atual.usuario_id)
      todasContas.push({...montarObjetoConta(conta_atual),usuario:montarObjetoUsuario(usuario.dados)})
    }
  }
  return { dados: todasContas }
}

async function atualizar(conta_id,dados_atualizados)
{
  const conta_indice = contas.findIndex(conta => conta.id === Number(conta_id))
  contas[conta_indice] = {...contas[conta_indice],...dados_atualizados }
  return { dados:contas[conta_indice] }
}

async function encontrarParaUsuario(usuario_id)
{
  const resposta = {}
  const todas_conta_encontradas = contas.filter( conta => conta.usuario_id  === Number(usuario_id))
  if(todas_conta_encontradas.length === 0)
  {
    resposta.error = {
      mensagem:"Nenhuma conta foi encontrada para o usuário informado.",
      codigo:erro.cliente.conteudo_nao_encontrado
    }
  }
  else resposta.dados = todas_conta_encontradas
  return resposta
}

module.exports = {
  salvar,
  deletar,
  encontrar,
  atualizar,
  encontrarTodas,
  encontrarParaUsuario
}
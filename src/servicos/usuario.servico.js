const UsuarioRepositorio = require("../repositorios/usuario.repositorio")
const ContaRepositorio = require("../repositorios/conta.repositorio")
const { erro } = require("../utilidades/codigosDeRetorno.utilidade")
const { formatarData } = require("../utilidades/datas.utilidade")
const { validarDadosDoUsuario } = require("../utilidades/usuario.utilidade")
const { validarDadosParaTransacoes } = require("../utilidades/conta.utilidade")

async function criarUsuario(dados_do_usuario)
{
  const usuario = validarDadosDoUsuario(dados_do_usuario)
  if(usuario.error) return {error: usuario.error}
  return await UsuarioRepositorio.salvar(usuario.dados)
}

async function atualizarUsuario(conta_id,dados_do_usuario)
{
  
  const id_valido = validarDadosParaTransacoes({ conta_id })
  if(id_valido.error) return { error: id_valido.error }

  const usuario_dados_validos = validarDadosDoUsuario(dados_do_usuario)
  if(usuario_dados_validos.error) return { error:usuario_dados_validos.error }
  
  const usuario_encontrado = await UsuarioRepositorio.encontrar(conta_id)
  if(usuario_encontrado.error) return { error: usuario_encontrado.error }

  return await UsuarioRepositorio.atualizar(conta_id,dados_do_usuario)
}

async function obterUsuario(usuarioId)
{
  const { dados, error } = await UsuarioRepositorio.encontrar(usuarioId)
  if(error) return { mensagem:error.mensagem, codigoDeError: error.codigo }
  return { dados:{...dados,data_nascimento: formatarData(dados.data_nascimento)}}
}

module.exports = {
  criarUsuario,
  obterUsuario,
  atualizarUsuario
}
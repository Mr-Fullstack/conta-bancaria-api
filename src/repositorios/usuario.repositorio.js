const { usuarios,contas } = require('../bancodedados');
const { errorDoUsuario, erro } = require('../utilidades/codigosDeRetorno.utilidade');
const { checarUsuariosCadastrados, montarObjetoUsuario } = require('../utilidades/usuario.utilidade');

async function salvar(novo_usuario)
{
  const usuario_ja_existe = checarUsuariosCadastrados(usuarios,novo_usuario)
  if(usuario_ja_existe) return { error: usuario_ja_existe } 
  const ultimo_id = usuarios.length >= 1 ? usuarios[usuarios.length-1].id+1 : 1
  const usuario = { id:Math.max(ultimo_id,usuarios.length), ...novo_usuario }
  usuarios.push(usuario)
  return { dados:usuario }
}

async function encontrar(usuario_id)
{
  const resposta = {}
  const usuario_encontrado = usuarios.find( ({ id } ) =>  id === Number(usuario_id) )
  if(!usuario_encontrado) 
    resposta.error = {
      mensagem: "Usuário não encontrado",
      codigo: erro.cliente.conteudo_nao_encontrado
    }
  else resposta.dados = usuario_encontrado 
  return resposta
}

async function atualizar(conta_id,novos_dados_usuario) 
{
  const usuario_ja_existe = checarUsuariosCadastrados(usuarios,novos_dados_usuario)
  if(usuario_ja_existe) return { error: usuario_ja_existe }
  const usuarioIndex = usuarios.findIndex(usuario=> usuario.id === Number(conta_id))
  usuarios[usuarioIndex] = {...usuarios[usuarioIndex],...novos_dados_usuario}
  return { dados: usuarios[usuarioIndex] }
}

async function deletar(usuarioId)
{
  const resposta = {}
  const usuario_indice = usuarios.findIndex(({ id } ) =>  id === Number(usuarioId))
  if(usuario_indice >= 0 ) usuarios.splice(usuario_indice,1)
  else  
  {
    resposta.error = {  
      mensagem:"Usuário não encontrado",
      codigo:erro.cliente.conteudo_nao_encontrado
    }
  }
  return resposta
}

async function encontrarTodos()
{
  return  { dados: usuarios };
}

module.exports = {
  salvar,
  encontrar,
  atualizar,
  deletar,
  encontrarTodos
}
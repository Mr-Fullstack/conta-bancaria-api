const { parse } = require("date-fns");
const { errorDoUsuario, erro } = require("./codigosDeRetorno.utilidade");
const { gerarUmaDataValida, dataValida, formatarData } = require("./datas.utilidade");
const { cpfValido, telefoneValido } = require("./numeros.utilidade");
const { estaVazio, emailValido } = require("./textos.utilidade");
const { ptBR } = require("date-fns/locale");

function validarDadosDoUsuario(dados_do_usuario)
{
  const { nome, email, senha, telefone, cpf, data_nascimento  } = dados_do_usuario 
  const resposta = {
    error:{mensagem:undefined},
    dados:undefined
  }
  if(estaVazio(nome))
    resposta.error.mensagem = 'necessário informar o nome do usuário.'
  else if(!isNaN(nome))
    resposta.error.mensagem = 'necessário informar o nome do usuário válido.'
  else if(estaVazio(cpf))
    resposta.error.mensagem = 'necessário informar um cpf.'
  else if(!cpfValido(cpf))
    resposta.error.mensagem = 'necessário informar um cpf válido.'
  else if(estaVazio(data_nascimento))
    resposta.error.mensagem = 'necessário informar uma data de nascimento do usuário.'
  else if(!dataValida(data_nascimento))
    resposta.error.mensagem = 'necessário informar uma data de nascimento válida.'
  else if(estaVazio(email))
    resposta.error.mensagem = 'necessário informar um email.'
  else if(!emailValido(email))
    resposta.error.mensagem = 'necessário informar um email válido.'
  else if(estaVazio(telefone))
    resposta.error.mensagem = 'necessário informar um telefone.'
  else if(!telefoneValido(telefone))
    resposta.error.mensagem = 'necessário informar um telefone válido.'
  else if(estaVazio(senha)) 
    resposta.error.mensagem = 'necessário informar uma senha' 
  else if(isNaN(senha) ||  senha.length < 4 || senha.length > 8 )
    resposta.error.mensagem = 'necessário informar uma senha válida entre 4 a 8 digitos.'
  if(resposta.error.mensagem) resposta.error.codigo = erro.cliente.solicitacao_ruim
  if(!resposta.error.mensagem)
  {
    resposta.dados = mockarDadosDoUsuario(dados_do_usuario)
    resposta.error = undefined
  }
  return resposta
}

function mockarDadosDoUsuario(dados_do_usuario)
{
  const { nome, email, senha, telefone, cpf, data_nascimento  } = dados_do_usuario 
  return { 
    nome, 
    email, 
    senha, 
    telefone, 
    cpf,
    data_nascimento : gerarUmaDataValida(data_nascimento)
  }
}

function montarObjetoUsuario(dados_do_usuario)
{
  const {id,data_nascimento,...dados_restantes_dos_usuario} = dados_do_usuario
  return {
    ...dados_restantes_dos_usuario,
    data_nascimento: formatarData(new Date(data_nascimento)) 
  }
}

function checarUsuariosCadastrados(usuarios_cadastrados,novo_usuario){

  const usuario_ja_existe_com_cpf = usuarios_cadastrados.some(usuario => usuario.cpf === novo_usuario.cpf)
  const usuario_ja_existe_com_email = usuarios_cadastrados.some(usuario => usuario.email === novo_usuario.email)
  if(usuario_ja_existe_com_cpf)
  {
    return {
      mensagem:"O CPF informado já existe cadastrado!",
      codigo:erro.cliente.entidade_nao_processavel
    }
  }
  else if(usuario_ja_existe_com_email)
  {
    return {
      mensagem:"O email informado já existe cadastrado!",
      codigo:erro.cliente.entidade_nao_processavel
    }
  }
}

module.exports = {
  validarDadosDoUsuario,
  mockarDadosDoUsuario,
  montarObjetoUsuario,
  checarUsuariosCadastrados
}

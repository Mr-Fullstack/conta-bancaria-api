
function cpfValido(cpf)
{
  if(!isNaN(cpf) && cpf.length === 11) return true
  return false
}

function telefoneValido(telefone)
{
  if(!isNaN(telefone) && ( telefone.length >= 8 && telefone.length <= 15 ) ) return true
  return false
}

module.exports = {
  cpfValido,
  telefoneValido
}
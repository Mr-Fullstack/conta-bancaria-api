function estaVazio(valor) {
  if(typeof valor === 'string')
  {
    return valor.length >= 0 && ( valor
    .replace(' ',"-")
    .trim()
    .replace("-"," ") === ' '  |  valor
    .replace(' ',"-")
    .trim()
    .replace("-","") === '' )
  }
  else if(valor === undefined || valor === null ) return true
  else return false
}

function emailValido(email)
{
  return email.includes("@") &&
  !email.startsWith(".") &&
  !email.startsWith("@") &&
  !email.endsWith(".") &&
  !email.endsWith("@")
}
module.exports = {
  estaVazio,
  emailValido
}

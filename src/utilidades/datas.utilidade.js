const { parse, isValid, format } = require('date-fns')
const { ptBR, enGB} = require('date-fns/locale')

function dataValida(data)
{
  return isValid(gerarUmaDataValida(data));
}

function formatarData(data,formato='yyyy-MM-dd')
{
  return format(data, formato);
}

function gerarUmaDataValida(data_em_texto, padrao = 'P',localidade = ptBR)
{
  let data = data_em_texto.split('-');
  if(data[0].length === 4) data = data.reverse().join('/')
  else data = data.join('/')
  return parse(data, padrao, new Date(), { locale: localidade })
}

module.exports = {
  dataValida,
  formatarData,
  gerarUmaDataValida
}

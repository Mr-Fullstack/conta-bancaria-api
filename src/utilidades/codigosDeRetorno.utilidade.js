const sucesso = {
	bom: 200,
	criado: 201,
	aceito: 202,
}

const error_cliente = {
	solicitacao_ruim: 400,
	nao_autorizado: 401,
	proibido: 403,
	conteudo_nao_encontrado: 404,
	entidade_nao_processavel: 422
}

const erro_servidor = {
	interno: 500,
	nao_implementado: 501,
	bad_gateway: 502,
	servico_indisponivel: 503
}

module.exports = {
	sucesso,
	erro:{
		cliente:error_cliente,
		servidor:erro_servidor
	}
}


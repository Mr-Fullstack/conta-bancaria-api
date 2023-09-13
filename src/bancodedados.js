const { banco } = require('../src/config')

module.exports = {
	banco,
	contas: [
		{
			id:1,
			usuario_id:1,
			saldo:10
		},
		{
			id:2,
			usuario_id:2,
			saldo:0
		}
	],
	saques: [],
	depositos: [],
	transferencias: [],
	usuarios: [
		{
			"id": 1,
			"nome":"John Doe",
			"email": "johndoe@gmail.com",
			"senha": "1234",
			"telefone": "719912341234",
			"cpf": "22222222222",
			"data_nascimento": "1988-05-21T03:00:00.000Z"
		},
		{
			"id": 2,
			"nome":"Jane Doe",
			"email": "janedoe@gmail.com",
			"senha": "1234",
			"telefone": "719912341234",
			"cpf": "11111111111",
			"data_nascimento": "1985-08-23T03:00:00.000Z"
		}
	]
}
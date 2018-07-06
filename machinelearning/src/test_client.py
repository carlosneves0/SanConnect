import json
import http.client
import urllib.request

def testa_agrupamento():
	with open('base_treino_usuarios.js') as user_data_file:
		json_arquivo = json.load(user_data_file)#le como string
	json_arquivo = json.dumps(json_arquivo)#converte pra algum formato que faz funcionar

	request = urllib.request.Request('http://localhost:5000/agrupamento')
	request.add_header('Content-Type','application/json')
	
	response = urllib.request.urlopen(request, json_arquivo.encode('utf-8'))#transforma em bytes pra mandar
	conteudo_response = response.read().decode()
	print(conteudo_response)#pega a resposta e transforma em string

	with open('user_test_output.js', 'w') as output_file:
		output_file.write(conteudo_response)

	return 0

def testa_classificacao_evento():
	with open('json_request_evento.js') as user_data_file:
		json_request = json.load(user_data_file)
	json_request = json.dumps(json_request)

	print('json indo na request')
	print(json_request)

	request = urllib.request.Request('http://localhost:5000/evento')
	request.add_header('Content-Type','application/json')
	response = urllib.request.urlopen(request, json_request.encode('utf-8'))#transforma em bytes pra mandar
	
	conteudo_response = response.read().decode()
	print('conteudo que veio da response')
	print(conteudo_response)#pega a resposta e transforma em string

	with open('event_test_output.js', 'w') as output_file:
		output_file.write(conteudo_response)

	return 0	


#testa_agrupamento()
testa_classificacao_evento()
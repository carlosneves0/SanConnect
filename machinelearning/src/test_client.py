import json
import http.client
import urllib.request

def main():
	with open('users.js') as user_data_file:
		json_arquivo = json.load(user_data_file)#le como string
	json_arquivo = json.dumps(json_arquivo)#converte pra algum formato que faz funcionar

	request = urllib.request.Request('http://localhost:5000/agrupamento')
	request.add_header('Content-Type','application/json')
	
	response = urllib.request.urlopen(request, json_arquivo.encode('utf-8'))#transforma em bytes pra mandar
	conteudo_response = response.read().decode()
	print(conteudo_response)#pega a resposta e transforma em string

	with open('client_test_output.js', 'w') as output_file:
		output_file.write(conteudo_response)

	return 0

main()
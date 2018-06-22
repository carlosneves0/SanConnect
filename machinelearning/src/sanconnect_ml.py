import numpy as np
import scipy.cluster.hierarchy as hac
import matplotlib.pyplot as plt
import pandas as pd
import json
import pprint
from usuario import Usuario

def agrupa_usando_json(json_request):
	usuario_referencia, usuarios = parse_json(json_request)
	
	agrupamentos = agrupa_usuarios(usuario_referencia, usuarios)
	for agrupamento in agrupamentos:
		print(agrupamento)
	json_agrupamentos = json.dumps([agrupamento.__dict__ for agrupamento in agrupamentos])

	return json_agrupamentos

def testa_localmente():
	with open('users.js') as user_data_file:
		json_arquivo = json.load(user_data_file)

	usuario_referencia, usuarios = parse_json(json_arquivo)
	agrupamentos = agrupa_usuarios(usuario_referencia, usuarios)

	json_agrupamentos = json.dumps([agrupamento.__dict__ for agrupamento in agrupamentos])	
	print(json_agrupamentos)
	with open('server_test_output.json','w') as file:
		file.write(json_agrupamentos)
	return 0

def agrupa_usuarios(usuario_referencia, usuarios):
	matriz_preferencias = monta_matriz_de_preferencias(usuarios)
	print(matriz_preferencias)
	
	matriz_agrupamentos = hac.linkage(matriz_preferencias, method='ward', optimal_ordering=True)
	print(matriz_agrupamentos)

	lista_usuarios_ordenada_por_grupo = transforma_agrupamento_em_lista(usuario_referencia, usuarios, matriz_agrupamentos)

	#labels = monta_lista_de_labels(usuarios)
	#plota_dendrograma(matriz_agrupamentos, labels)

	return lista_usuarios_ordenada_por_grupo

def transforma_agrupamento_em_lista(usuario_referencia, usuarios, matriz_agrupamentos):
	lista_indices_ordenada = []
	lista_usuarios_ordenada = []

	lista_folhas_agrupamento = hac.leaves_list(matriz_agrupamentos).tolist()
	index_usuario_referencia = lista_folhas_agrupamento.index(usuarios.index(usuario_referencia))

	i = 0
	while(len(lista_indices_ordenada) < len(lista_folhas_agrupamento)):
		if(index_usuario_referencia+i < len(lista_folhas_agrupamento)):
			lista_indices_ordenada.append(lista_folhas_agrupamento[index_usuario_referencia+i])

		if(index_usuario_referencia-i >= 0 and i != 0):
			lista_indices_ordenada.append(lista_folhas_agrupamento[index_usuario_referencia-i])
		i += 1


	for indice in lista_indices_ordenada:
		lista_usuarios_ordenada.append(usuarios[indice])

	return lista_usuarios_ordenada

def monta_lista_de_labels(usuarios):
	labels = []

	for usuario in usuarios:
		labels.append(usuario.email)
	labels = coloca_index_nos_labels(labels)
	return labels

def coloca_index_nos_labels(labels):
	i = 0

	for label in labels:
		label += '_'+str(i)
		labels[i] = label
		i += 1
	return labels

def monta_matriz_de_preferencias(usuarios):
	matriz = []
	for usuario in usuarios:
		matriz.append(usuario.get_lista_preferencias())
	return np.array(matriz)

def parse_json(json_source):
	json_usuarios = json_source["usuarios"]
	json_usuario_referencia = json_source["usuario_referencia"]
	
	usuario_referencia = Usuario(json_usuario_referencia)
	print('Usuario referencia:', usuario_referencia)

	usuarios = []
	for json_usuario in json_usuarios:
		usuarios.append(Usuario(json_usuario))
	
	return usuario_referencia, usuarios

def plota_dendrograma(matriz, labels):
	plt.figure(figsize=(25,10))
	plt.title('Clustering hierarquico')
	plt.xlabel('Usuario')
	plt.ylabel('Distancia')
	
	hac.dendrogram(
		matriz,
		labels=labels,
		show_leaf_counts=True,
		leaf_font_size=12.,
	)

	plt.show()	
	return 0

testa_localmente()
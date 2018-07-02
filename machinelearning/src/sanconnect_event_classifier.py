import numpy as np
import pandas as pd
import json
from usuario import Usuario
from evento import Evento
import sanconnect_parsers as parsers
import cmd
from sklearn import tree
from sklearn.model_selection import cross_val_score
import operator
from sklearn.externals import joblib

def classifica_manualmente_database():
	with open('usuarios.js') as arquivo_usuarios:
		json_usuarios = json.load(arquivo_usuarios)
	print('json usuarios')
	print(json_usuarios)

	with open('eventos.js') as arquivo_eventos:
		json_eventos = json.load(arquivo_eventos)

	print('json_eventos')
	print(json_eventos)

	usuarios = parsers.parse_json_usuarios(json_usuarios)
	print('usuarios')
	print(usuarios)

	eventos = parsers.parse_json_eventos(json_eventos)
	print('eventos')
	print(eventos)

	df_usuario_evento = pd.DataFrame()
	for usuario in usuarios:
		print('usuario que esta tendo os eventos classificados',usuario.email)
		series_usuario = usuario.to_series()
		for evento in eventos:
			print('usuario transformado em serie:',series_usuario.to_string())
			series_evento = evento.to_series()
			print('evento transformado em series',series_evento.to_string())
			series_usuario_evento = series_usuario.append(series_evento)
			print('Digite o interesse do usuario no evento: ')
			interesse = int(input("prompt"))
			
			if(interesse == -1):
				df_usuario_evento = formata_dataframe_usuario_evento(df_usuario_evento)
				print(df_usuario_evento)
				df_usuario_evento.to_csv('classific_usuario_evento.csv')

				return df_usuario_evento
			series_usuario_evento['interesse'] = interesse
			print('serie finalizada')
			print(series_usuario_evento)
			df_usuario_evento = df_usuario_evento.append(series_usuario_evento, ignore_index=True)
		print('dataframe montado ate agora')
		print(df_usuario_evento)


	df_usuario_evento = formata_dataframe_usuario_evento(df_usuario_evento)
	df_usuario_evento.to_csv('classific_usuario_evento.csv')

	return df_usuario_evento

def formata_dataframe_usuario_evento(df_usuario_evento):
	df_usuario_evento = df_usuario_evento.replace(np.nan, 0)
	df_usuario_evento['data_hora'] = pd.to_datetime(df_usuario_evento['data_hora'])
	df_usuario_evento['ano'] = df_usuario_evento['data_hora'].dt.year
	df_usuario_evento['dayofyear'] = df_usuario_evento['data_hora'].dt.dayofyear
	df_usuario_evento = df_usuario_evento.drop(['data_hora'],axis=1)

	colunas = list(df_usuario_evento.columns.values)
	colunas.pop(colunas.index('interesse'))
	df_usuario_evento = df_usuario_evento[colunas+['interesse']]
	print('matriz final formatada')
	print(df_usuario_evento)
	return df_usuario_evento

def classifica_interesse_de_usuario_em_multiplos_eventos(usuario, eventos):
	arvore_decisao = joblib.load('arvore_decisao.pkl')
	'''evento_interesse = {}
	for evento in eventos:
		evento_interesse[evento[interesse]] = classifica_interesse_de_usuario_em_evento(usuario,evento)
	evento_interesse_ordenado = sorted(evento_interesse.items(), key=operator.itemgetter(1), reverse=True)'''
	eventos_ordenados_por_interesse = {}
	return evento_interesse_ordenado

def classifica_interesse_de_usuario_em_multiplos_eventos_usando_json(json_usuario, json_eventos):
	eventos_ordenados_por_interesse = []
	usuario = Usuario(json_usuario)
	eventos = parsers.parse_json_eventos(json_eventos)
	eventos_ordenados_por_interesse = classifica_interesse_de_usuario_em_multiplos_eventos(usuario, eventos)	
	return eventos_ordenados_por_interesse

def gera_classificador_arvore_decisao():
	df_usuario_evento = pd.read_csv('classific_usuario_evento.csv')
	print('dataframe lido')
	print(df_usuario_evento)

	matriz_atributos = df_usuario_evento.loc[:,:'interesse'].iloc[:,:-1]
	matriz_classes = df_usuario_evento['interesse']
	
	arvore_decisao = tree.DecisionTreeClassifier()
	arvore_decisao.fit(matriz_atributos, matriz_classes)
	joblib.dump(arvore_decisao, 'arvore_decisao.pkl')

	scores = cross_val_score(arvore_decisao, matriz_atributos, matriz_classes, cv=5)
	print(scores)

	print(df_usuario_evento['interesse'].value_counts())
	return 0

#classifica_manualmente_database()
gera_classificador_arvore_decisao()
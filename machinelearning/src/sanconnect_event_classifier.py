import numpy as np
import pandas as pd
import json
from usuario import Usuario
from evento import Evento
import sanconnect_parsers as parsers
import cmd
from sklearn import tree
from sklearn.model_selection import cross_val_score
from operator import itemgetter
from sklearn.externals import joblib
import graphviz

def treina_classificador():
	with open('base_treino_usuarios.js') as arquivo_usuarios:
		json_usuarios = json.load(arquivo_usuarios)

	with open('base_treino_eventos.js') as arquivo_eventos:
		json_eventos = json.load(arquivo_eventos)

	usuarios = parsers.parse_json_usuarios(json_usuarios)
	print('usuarios')
	print(usuarios)

	eventos = parsers.parse_json_eventos(json_eventos)
	print('eventos')
	print(eventos)

	df_usuario_evento = pd.DataFrame()
	for usuario in usuarios:
		series_usuario = usuario.to_series()
		for evento in eventos:
			print('usuario:',series_usuario.to_string())
			series_evento = evento.to_series()
			print('evento:',series_evento.to_string())
			series_usuario_evento = series_usuario.append(series_evento)
			print('Digite o interesse do usuario no evento: ')
			interesse = int(input('Interesse: '))
			
			if(interesse == -1):
				break
			elif(interesse == -2):
				df_usuario_evento = formata_dataframe_usuario_evento(df_usuario_evento)
				print(df_usuario_evento)
				df_usuario_evento.to_csv('classific_usuario_evento.csv')

				return df_usuario_evento
			series_usuario_evento['interesse'] = interesse
			df_usuario_evento = df_usuario_evento.append(series_usuario_evento, ignore_index=True)
			print('Dataframe:')
			print(df_usuario_evento)


	df_usuario_evento = formata_dataframe_usuario_evento(df_usuario_evento)
	df_usuario_evento.to_csv('classific_usuario_evento.csv')

	return df_usuario_evento

def monta_dataframe_usuario_evento(usuario, eventos):
	df_usuario_evento = pd.DataFrame()
	series_usuario = usuario.to_series()
	for evento in eventos:
		series_evento = evento.to_series()
		series_usuario_evento = series_usuario.append(series_evento)
		df_usuario_evento = df_usuario_evento.append(series_usuario_evento)
	return df_usuario_evento

def formata_dataframe_usuario_evento(df_usuario_evento):
	df_usuario_evento = df_usuario_evento.replace(np.nan, 0)
	df_usuario_evento['data_hora'] = pd.to_datetime(df_usuario_evento['data_hora'])
	df_usuario_evento['ano'] = df_usuario_evento['data_hora'].dt.year
	df_usuario_evento['dayofyear'] = df_usuario_evento['data_hora'].dt.dayofyear
	df_usuario_evento = df_usuario_evento.drop(['data_hora'],axis=1)

	if('interesse' in df_usuario_evento.columns):
		colunas = list(df_usuario_evento.columns.values)
		colunas.pop(colunas.index('interesse'))
		df_usuario_evento = df_usuario_evento[colunas+['interesse']]

	print('matriz final formatada')
	print(df_usuario_evento)
	return df_usuario_evento

def formata_series_usuario_evento(series_usuario_evento):
	series_usuario_evento = series_usuario_evento.replace(np.nan, 0)
	series_usuario_evento['data_hora'] = pd.to_datetime(series_usuario_evento['data_hora'])
	series_usuario_evento['ano'] = series_usuario_evento['data_hora'].year
	series_usuario_evento['dayofyear'] = series_usuario_evento['data_hora'].dayofyear
	series_usuario_evento = series_usuario_evento.drop(['data_hora'])

	if('interesse' in series_usuario_evento.index):
		colunas = list(series_usuario_evento.index.values)
		colunas.pop('interesse')
		series_usuario_evento = series_usuario_evento[colunas+['interesse']]

	#print('serie formatada')
	#print(series_usuario_evento)
	return series_usuario_evento

def classifica_interesse_de_usuario_em_multiplos_eventos(usuario, eventos):
	arvore_decisao = joblib.load('arvore_decisao.pkl')

	eventos_ordenados_por_interesse = []
	for evento in eventos:
		evento_dict = evento.__dict__
		interesse = classifica_interesse_de_usuario_em_evento(usuario, evento, arvore_decisao)
		evento_dict['interesse'] = interesse
		eventos_ordenados_por_interesse.append(evento_dict)

	eventos_ordenados_por_interesse = sorted(eventos_ordenados_por_interesse, key=itemgetter('interesse'), reverse=True)
	#eventos_ordenados_por_interesse.reverse()
	print('eventos ordenados por interesse')
	print(eventos_ordenados_por_interesse)
	input('bla')
	return eventos_ordenados_por_interesse

def classifica_interesse_de_usuario_em_evento(usuario, evento, arvore_decisao):
	series_usuario = usuario.to_series()
	print('series usuario', series_usuario)
	series_evento = evento.to_series()
	print('series evento', series_evento)
	series_usuario_evento = series_usuario.append(series_evento)
	series_usuario_evento = formata_series_usuario_evento(series_usuario_evento)
	print('series usuario evento formatada')
	print(series_usuario_evento)

	exemplo_linha_arvore = pd.read_csv('classific_usuario_evento.csv',nrows=1)
	colunas_arvore = exemplo_linha_arvore.drop(exemplo_linha_arvore.columns[0], axis=1).columns
	print('colunas arvore')
	print(colunas_arvore)
	print('series usuario evento antes de preencher colunas')
	print(series_usuario_evento)
	series_usuario_evento = preenche_colunas_faltantes_serie_usuario_evento(series_usuario_evento, colunas_arvore)		
	print('series usuario evento depois de preencher colunas')
	print(series_usuario_evento)	
			
	interesse = arvore_decisao.predict([series_usuario_evento])
	print('interesse:', interesse)
	return interesse[0]

def preenche_colunas_faltantes_serie_usuario_evento(series_usuario_evento, colunas_arvore):
	for coluna_arvore in colunas_arvore:
		if(coluna_arvore not in series_usuario_evento.index):
			series_usuario_evento[coluna_arvore] = 0
	return series_usuario_evento


def classifica_interesse_de_usuario_em_multiplos_eventos_usando_json(json_usuario, json_eventos):
	usuario = Usuario(json_usuario)
	eventos = parsers.parse_json_eventos(json_eventos)
	eventos_ordenados_por_interesse = classifica_interesse_de_usuario_em_multiplos_eventos(usuario, eventos)
	json_eventos_ordenados_por_interesse = json.dumps(eventos_ordenados_por_interesse, default=str)
	print(json_eventos_ordenados_por_interesse)
	input('ble')

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

	info_grafico = tree.export_graphviz(arvore_decisao, out_file=None, filled=True)
	grafico = graphviz.Source(info_grafico)
	grafico.render('exemplo_interesse_usuario_evento')

	scores = cross_val_score(arvore_decisao, matriz_atributos, matriz_classes, cv=5)
	print(scores)

	print(df_usuario_evento['interesse'].value_counts())
	return 0

def testa_classificacao_localmente():
	with open('base_treino_usuarios.js') as arquivo_usuarios:
		json_usuarios = json.load(arquivo_usuarios)

	with open('base_treino_eventos.js') as arquivo_eventos:
		json_eventos = json.load(arquivo_eventos)

		json_usuario = json_usuarios['usuarios'][0]

	classifica_interesse_de_usuario_em_multiplos_eventos_usando_json(json_usuario, json_eventos)
	return 0

#treina_classificador()
gera_classificador_arvore_decisao()
#testa_classificacao_localmente()
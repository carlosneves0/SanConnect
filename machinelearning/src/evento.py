import json
import pandas as pd
from datetime import datetime

class Evento:
	def __init__(self, json_evento=''):
		if not json_evento:
			self.criador = ''
			self.titulo = ''
			self.data_hora_evento = ''
			self.local = ''
			self.categorias = {}
		else:
			self.criador = json.dumps(json_evento["criador"]).replace('"','')
			self.titulo = json.dumps(json_evento["titulo"]).replace('"','')
			data_hora_string = json.dumps(json_evento["dataHoraEvento"]).strip('"')
			self.data_hora_evento = datetime.strptime(data_hora_string, '%d/%m/%Y')

			self.categorias = []
			json_categorias = json_evento["categorias"]
			i = 0
			for json_categoria in json_categorias:
				categoria = json_categoria.strip('"')
				self.categorias.append(categoria)
				i += 1

	def to_series(self):
		dict_atributos = {}
		dict_atributos['data_hora'] = self.data_hora_evento
		for nome_categoria in self.categorias:
			dict_atributos[nome_categoria+'_evnt'] = True
		print('lista de atributos que vai virar serie', dict_atributos)
		return pd.Series(data=dict_atributos)

	def to_json(self):
		return json.dumps(self.__dict__, default=str)
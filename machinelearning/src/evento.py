import json
import pandas as pd
from datetime import datetime

class Evento:
	def __init__(self, json_evento=''):
		if not json_evento:
			self.id = ''
			self.category = {}
		else:
			self.id = json.dumps(json_evento['id']).replace('"','')

			self.category = []
			json_category = json_evento["category"]
			i = 0
			for json_categoria in json_category:
				categoria = json_categoria.strip('"')
				self.category.append(categoria)
				i += 1

	def to_series(self):
		dict_atributos = {}
		for nome_categoria in self.category:
			dict_atributos[nome_categoria+'_evnt'] = True
		print('lista de atributos que vai virar serie', dict_atributos)
		return pd.Series(data=dict_atributos)

	def to_json(self):
		return json.dumps(self.__dict__, default=str)
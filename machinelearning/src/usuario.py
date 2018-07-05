import json
import pandas as pd

class Usuario:
	def __init__(self, json_usuario=''):
		if not json_usuario:
			self.email = ''
			self.preferencias = {}
		else:
			self.email = json.dumps(json_usuario["email"]).strip('"')		
			self.preferencias = {}

			json_preferencias = json_usuario["preference"]
			for json_preferencia in json_preferencias:
				chave = json_preferencia.strip('"')
				valor = float(json.dumps(json_preferencias[json_preferencia]))
				self.preferencias[chave] = valor

	def __str__(self):
		ret = '\nEmail: {0}\n Preference:\n'
		ret = ret.format(self.email)
		
		str_prefs = ''
		for preferencia in self.preferencias.keys(): 
			str_prefs += '{}: {}\n'
			str_prefs = str_prefs.format(preferencia, self.preferencias[preferencia])
		
		ret += str_prefs

		return ret

	def __eq__(self, other):
		return self.email == other.email

	def to_json(self):
		return json.dumps(self.__dict__)

	def get_lista_preferencias(self):
		ret = []
		for preferencia in self.preferencias.keys():
			ret.append(self.preferencias[preferencia])
		return ret

	def to_series(self):
		dict_preferencias = {}
		for nome_preferencia in self.preferencias.keys(): 
			dict_preferencias[nome_preferencia+'_usr'] = self.preferencias[nome_preferencia]
		series_form = pd.Series(data=dict_preferencias)

		return series_form 

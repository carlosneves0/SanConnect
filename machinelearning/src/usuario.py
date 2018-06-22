import json

class Usuario:
	def __init__(self, json_usuario=''):
		if not json_usuario:
			self.email = ''
			self.nome = ''
			self.desc = ''
			self.preferencias = {}
		else:
			self.email = json.dumps(json_usuario["email"]).strip('"')
			
			self.nome = json.dumps(json_usuario["nome"])
			self.nome = self.nome.replace('"','')
			
			self.desc = json.dumps(json_usuario["desc"])
			self.desc = self.desc.replace('"','')
			
			self.preferencias = {}

			json_preferencias = json_usuario["preferencias"]
			for json_preferencia in json_preferencias:
				chave = json_preferencia.strip('"')
				valor = float(json.dumps(json_preferencias[json_preferencia]))
				self.preferencias[chave] = valor

	def __str__(self):
		ret = '\nEmail: {0}\nNome: {1}\nDescricao: {2}\nPreferencias:\n'
		ret = ret.format(self.email, self.nome, self.desc)
		
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
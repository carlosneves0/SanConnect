import json
from usuario import Usuario
from evento import Evento

def parse_json_usuarios(json_source):
	json_usuarios = json_source["usuarios"]

	usuarios = []
	for json_usuario in json_usuarios:
		usuarios.append(Usuario(json_usuario))
	
	return usuarios

def parse_json_eventos(json_source):
	#json_eventos = json_source["eventos"]

	eventos = []
	for json_evento in json_source:
		eventos.append(Evento(json_evento))

	return eventos
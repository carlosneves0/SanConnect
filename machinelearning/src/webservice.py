from flask import Flask
from flask import request
import sanconnect_user_grouping as ug 
import sanconnect_event_classifier as ec

app = Flask(__name__)

@app.route('/agrupamento', methods=['POST'])
def agrupamento():
	json_request = request.get_json()
	return ug.agrupa_usando_json(json_request)

@app.route('/evento')
def evento():
	json_request = request.get_json(json_usuario, json_eventos)
	json_usuario = json_request['usuario']
	json_eventos = json_request['eventos']
	return ec.classifica_interesse_de_usuario_em_multiplos_eventos_usando_json(json_usuario, json_eventos)

if __name__ == '__main__':
	app.run()
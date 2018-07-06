from flask import Flask
from flask import request
import sanconnect_user_grouping as ug 
import sanconnect_event_classifier as ec
import json

app = Flask(__name__)

@app.route('/agrupamento', methods=['POST'])
def agrupamento():
	json_request = request.get_json()
	return ug.agrupa_usando_json(json_request)

@app.route('/evento', methods=['POST'])
def evento():
	json_request = request.get_json()
	print('json que veio na request')
	print(json_request)
	return ec.classifica_interesse_de_usuario_em_multiplos_eventos_usando_json(json_request)

if __name__ == '__main__':
	app.run()
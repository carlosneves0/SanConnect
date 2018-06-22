from flask import Flask
from flask import request
import sanconnect_ml 

app = Flask(__name__)

@app.route('/agrupamento', methods=['POST'])
def agrupamento():
	print('chegou request')
	json_request = request.get_json()
	return sanconnect_ml.agrupa_usando_json(json_request)

@app.route('/evento')
def evento():
	return 'asda'

if __name__ == '__main__':
	app.run()
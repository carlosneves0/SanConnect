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
	json_request = request.get_json()
	return 'asda'

if __name__ == '__main__':
	app.run()
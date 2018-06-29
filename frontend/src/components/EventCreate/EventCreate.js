import React from 'react'
import { Button, Form, TextArea, Dropdown } from 'semantic-ui-react'
import './EventCreate.css'

const options = [
  { key: 'angular', text: 'Angular', value: 'angular' },
  { key: 'css', text: 'CSS', value: 'css' },
  { key: 'design', text: 'Graphic Design', value: 'design' },
  { key: 'ember', text: 'Ember', value: 'ember' },
  { key: 'html', text: 'HTML', value: 'html' },
  { key: 'ia', text: 'Information Architecture', value: 'ia' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
  { key: 'meteor', text: 'Meteor', value: 'meteor' },
  { key: 'node', text: 'NodeJS', value: 'node' },
  { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
  { key: 'python', text: 'Python', value: 'python' },
  { key: 'rails', text: 'Rails', value: 'rails' },
  { key: 'react', text: 'React', value: 'react' },
  { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
  { key: 'ruby', text: 'Ruby', value: 'ruby' },
  { key: 'ui', text: 'UI Design', value: 'ui' },
  { key: 'ux', text: 'User Experience', value: 'ux' },
]

class EventCreate extends React.Component {
	render() {
		return(
			<div className='EventCreate'>
				<center>
					<Form>
						<h1>Criar Evento</h1>
						<Form.Field inline>
							<label style = {{width : 200}}>Título do Evento: </label>
							<input placeholder='Nome' style = {{width : 400}} />
						</Form.Field>
						<Form.Field inline>
							<label style = {{width : 200}}>Data: </label>
							<input type="date" style = {{width : 400}} />
						</Form.Field>
						<Form.Field inline>
							<label style = {{width : 200}}>Hora: </label>
							<input type="time" style = {{width : 400}} />
						</Form.Field>
						<Form.Field inline>
							<label style = {{width : 200}}>Descrição: </label>
							 <TextArea placeholder='Descrição' style = {{width : 400, height: 160}}  />
						</Form.Field>
						<Form.Field inline>
							<label style = {{width : 200}}>Número de participantes: </label>
							<label style = {{width : 100}}>Mínimo(2): </label>
							<input placeholder='Mín' style = {{width : 100}} />
							<label style = {{width : 100}}>Máximo: </label>
							<input placeholder='Máx' style = {{width : 100}} />
						</Form.Field>
						<Form.Field inline>
							<label style = {{width : 200}}>Local: </label>
							<input placeholder='Local' style = {{width : 400}}/>
						</Form.Field>
						<Form.Field inline>
							<label style = {{width : 200}}>Tags do Evento: </label>
							<div class="ui inline dropdown">
								<Dropdown inline placeholder='Tags' fluid multiple selection options={options} style = {{width : 400}}  />
							</div>
						</Form.Field>
						<Button type='submit' primary>Enviar</Button>
					</Form>
				</center>
			</div>
		)
	}
}

export default EventCreate

import React from 'react'
import { Button, Image, Form } from 'semantic-ui-react'
import userImage from './Layout/Avatar/default-picture.jpg';
import EditableLabel from 'react-inline-editing';

const userName = ['Delbem da Silva']
const userDescription = ['Sou um professor muito daorah que adora eletrônica. Tenho interesse em jogos.']


class MyProfile extends React.Component {
  render() {
    return (
   	  <div>
	      <center>
	        <div style = {{paddingTop: 90, width: 600}}>
	          <img src={userImage} style = {{height: 300, width: 300}} />
	          
	          <h1><EditableLabel text={userName}
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='600px'
                inputHeight='25px'
                labelFontWeight='bold'
                inputFontWeight='bold'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut} 
              /></h1>
	          
	          <EditableLabel text={userDescription}
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='600px'
                inputHeight='25px'
                onFocus={this._handleFocus}
                onFocusOut={this._handleFocusOut} 
              />          


	          <br></br><br></br>
	          <p><b>Para alterar seus dados, clique no texto que deseja alterar e posteriormente aperte em 'Salvar'</b></p>
	          <Button type='submit' primary style = {{width: 600}}>Salvar</Button>

	          <br></br><br></br>
	          <label><b>Mudar senha: </b></label>
	          <br></br>
	          <Form>
			    <Form.Field>
			      <input placeholder='Senha atual' />
			    </Form.Field>
			    <Form.Field>
			      <input placeholder='Nova senha' />
			    </Form.Field>
			    <Form.Field>
			      <input placeholder='Repita a nova senha' />
			    </Form.Field>
			    <Button type='submit' primary style = {{width: 600}}>Mudar senha</Button>
			  </Form>
			  <br></br>
			  <Button type='submit' secondary style = {{width: 600}}>Voltar</Button>

	        </div>
	      </center>
      </div>
    )
  }
}
export default MyProfile

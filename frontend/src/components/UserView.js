import React from 'react'
import { Button, Image } from 'semantic-ui-react'
import userImage from './Layout/Avatar/default-picture.jpg';

const userName = ['Delbem da Silva']
const userDescription = ['Sou um professor muito daorah que adora eletrônica. Tenho interesse em jogos.']

class UserView extends React.Component {
  render() {
    return (
   	  <div>
	      <center>
	        <div style = {{paddingTop: 90, width: 600}}>
	          <img src={userImage} style = {{height: 300, width: 300}} />
	          <h1>{userName}</h1>

	          <p>{userDescription}</p>

	          <br></br><br></br>
	          <Button type='submit' secondary style = {{width: 600}}>Voltar</Button>
	        </div>
	      </center>
      </div>
    )
  }
}

export default UserView

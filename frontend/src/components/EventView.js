import React from 'react'
import { Grid, Button, TextArea, Icon, Dropdown, Label } from 'semantic-ui-react'

const Title = ['Estudo em grupo de Cálculo I']
const Date = ['2018-07-01']
const Hour = ['01:30 PM']
const Local = ['Biblioteca - ICMC - USP']
const Tags = ['']
const UsersConfirmed = ['3']
const UsersTotal = ['5']
const EventDescription = ['Vamos nos reunir para resolver a segunda lista de exercícios.']

const confirmed = [
  { key: 'c1', text: 'Confirmado1', value: 'c1' },
  { key: 'c2', text: 'Confirmado2', value: 'c2' },
]

const waiting = [
  { key: 'w1', text: 'Espera1', value: 'w1' },
  { key: 'w2', text: 'Espera2', value: 'w2' },
]

class EventView extends React.Component {
  render() {
    return (
      <center>
        <div style = {{paddingTop: 90}}>
          <h1>{Title}</h1>
          <p> 
            <Icon disabled name='calendar' /> {Date} &nbsp; &nbsp;
            <Icon disabled name='clock' /> {Hour} &nbsp; &nbsp;
            <Icon disabled name='location arrow' /> {Local} &nbsp; &nbsp;
            <Icon disabled name='user' /> {UsersConfirmed}/{UsersTotal}
          </p>
          
          <Label>Resolução de Exercícios</Label>
          <Label>Estudo em Grupo</Label>
          <br></br><br></br>
          
          <p><b>Descrição</b></p>
          <p>{EventDescription}</p>
          
          <br></br><br></br>
          
          <Dropdown selection options={confirmed} text='Confirmados' />
          <Dropdown selection options={waiting} text='Lista de Espera' />
        
          <br></br><br></br>
          <Button type='submit' primary>Confirmar Presença</Button>
          <Button type='submit' secondary>Voltar</Button>
        </div>
      </center>
    )
  }
}

export default EventView

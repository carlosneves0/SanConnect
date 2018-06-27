import React from 'react'
import { withRouter } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import { Button } from 'semantic-ui-react'
import './Home.css'

const Home = ({ history }) => (
  <div className='Home'>
    <h1>Conectando Pessoas</h1>
    <h2>Tornando o mundo mais divertido!</h2>
    <MediaQuery minDeviceWidth={880}>
      {matches => matches ? (
        <div className='Home-desktop'>
          <Button
            color='olive' size='huge'
            style={{ float: 'left' }}
            onClick={() => history.push('/explore')}
          >
            Explorar Eventos
          </Button>
          <Button
            primary size='huge'
            style={{ float: 'right' }}
            onClick={() => history.push('/sign-up')}
          >
            Cadastre-se
          </Button>
        </div>
      ) : (
        <div>
          <Button
            primary size='huge'
            style={{ display: 'block', width: '80vw', margin: '3vh auto' }}
            onClick={() => history.push('/sign-up')}
          >
            Cadastre-se
          </Button>
          <Button
            color='olive' size='huge'
            style={{ display: 'block', width: '80vw', margin: '3vh auto' }}
            onClick={() => history.push('/explore')}
          >
            Explorar Eventos
          </Button>
        </div>
      )}
    </MediaQuery>
  </div>
)

export default withRouter(Home)

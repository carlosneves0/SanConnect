import React from 'react'
import { Link } from "react-router-dom"
import { Button } from 'semantic-ui-react'
import background from './background.png'
import './Home.css'

const Home = () => (
  <div className='Home'>
    <div className='Home-sign-up'>
      <h1>Conectando Pessoas</h1>
      <h2>Tornando o mundo mais divertido!</h2>
      <Link to='/sign-up'>
        <Button primary size='huge'>Cadastre-se</Button>
      </Link>
      <hr />
      <Link to='/feed'>
        <Button secondary size='huge'>Explorar Eventos</Button>
      </Link>
    </div>
  {/* </div>
  <div>
    <center>
    <div class="hero-image" style = {{backgroundImage: "url(" + background + ")", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 1900, height: 650, align :'center'}}>
      <div class="hero-text">
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

      </div>
    </div>
    </center> */}
  </div>
);

export default Home

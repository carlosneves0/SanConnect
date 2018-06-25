import React from 'react'
import { Link } from "react-router-dom"
import Background from '../images/homeBackground.jpg'

const Home = () => (
	<div>
		<nav class="pt-navbar pt-dark">
			<div class="pt-navbar-group pt-align-left">
		  		<Link to='/' style = {{textDecoration : 'none', color: 'white'}}><button class="pt-button pt-minimal">SanConnect</button></Link>
			</div>
			<div class="pt-navbar-group pt-align-right">
			  <Link to='/sign-in'><button class="pt-button pt-intent-primary">Login</button></Link>
			  <span class="pt-navbar-divider"></span>
			  <Link to='/sign-up'><button type="button" class="pt-button pt-intent-success">Cadastre-se</button></Link>
			</div>
		</nav>
		<center>
		<div class="hero-image" style = {{backgroundImage: "url(" + Background + ")", backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 1900, height: 650, align :'center'}}>
		  <div class="hero-text">
		  	<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
		    <h1 style = {{color : '#ff2121'}}>Conectando Pessoas</h1>
		    <h5 style = {{color : '#ff2121'}}>Tornando o mundo mais divertido!</h5>
		    <Link to='/sign-up'><button type="button" class="pt-button pt-intent-success">Cadastre-se</button></Link>
		  </div>
		</div>
		</center>



	</div>
);

export default Home
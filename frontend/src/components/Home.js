import React from 'react'
import { Link } from "react-router-dom"

const Home = () => (
	<div>
		<nav class="pt-navbar pt-dark">
			<div class="pt-navbar-group pt-align-left">
		  		<Link to='/sign-in' style = {{textDecoration : 'none', color: 'white'}}><button class="pt-button pt-minimal">SanConnect</button></Link>
			</div>
			<div class="pt-navbar-group pt-align-right">
			  <Link to='/'><button class="pt-button pt-intent-primary">Login</button></Link>
			  <span class="pt-navbar-divider"></span>
			  <Link to='/sign-up'><button type="button" class="pt-button pt-intent-success">Cadastre-se</button></Link>
			</div>
		</nav>  
	</div>
);

export default Home
import React from 'react'
import { Link } from "react-router-dom"

const SignUp = () => (
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
		<br></br><br></br>
		<center>
			<div class="pt-control-group pt-vertical" style = {{width : 300}}>
			  <div class="pt-input-group pt-large">
			    <input type="text" class="pt-input" placeholder="Nome" />
			  </div>
			  <div class="pt-input-group pt-large">
			    <input type="text" class="pt-input" placeholder="Email" />
			  </div>
			  <div class="pt-input-group pt-large">
			    <input type="password" class="pt-input" placeholder="Senha" />
			  </div>
			  <button class="pt-button pt-large pt-intent-success">Cadastrar</button>
			</div>
		</center>
	</div>
);

export default SignUp
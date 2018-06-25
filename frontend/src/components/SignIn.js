import React from 'react'
import { Link } from "react-router-dom"

const SignIn = () => (
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
			    <span class="pt-icon pt-icon-person"></span>
			    <input type="text" class="pt-input" placeholder="Email" />
			  </div>
			  <div class="pt-input-group pt-large">
			    <span class="pt-icon pt-icon-lock"></span>
			    <input type="password" class="pt-input" placeholder="Senha" />
			  </div>
			  <button class="pt-button pt-large pt-intent-primary">Login</button>
			</div>
		</center>
	</div>
);

export default SignIn
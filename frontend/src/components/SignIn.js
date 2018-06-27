import React from 'react'
import { Link } from "react-router-dom"

const SignIn = () => (
  <div>
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

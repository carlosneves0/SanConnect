import React from 'react'

const SignUp = () => (
  <div>
    <br></br><br></br>
    <center>
      <div className="pt-control-group pt-vertical" style = {{width : 300}}>
        <div className="pt-input-group pt-large">
          <input type="text" className="pt-input" placeholder="Nome" />
        </div>
        <div className="pt-input-group pt-large">
          <input type="text" className="pt-input" placeholder="Email" />
        </div>
        <div className="pt-input-group pt-large">
          <input type="password" className="pt-input" placeholder="Senha" />
        </div>
        <button className="pt-button pt-large pt-intent-success">Cadastrar</button>
      </div>
    </center>
  </div>
);

export default SignUp

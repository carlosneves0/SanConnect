import React from 'react'
import { Provider } from 'unstated'
import { BrowserRouter } from 'react-router-dom'
import StateManager from '../StateManager'
import App from '../App'
import 'semantic-ui-css/semantic.min.css'
import './Root.css'

const Root = () => (
  <Provider>
    <BrowserRouter>
      <StateManager>
        <App />
      </StateManager>
    </BrowserRouter>
  </Provider>
)

export default Root

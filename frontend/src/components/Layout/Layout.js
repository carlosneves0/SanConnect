import React from 'react'
import MediaQuery from 'react-responsive'
import { Subscribe } from 'unstated'
import AuthContainer from '../../containers/AuthContainer'
import LayoutDesktop from './LayoutDesktop'
import LayoutMobile from './LayoutMobile'
import './Layout.css'

const Layout = ({ children }) => (
  <Subscribe to={[AuthContainer]}>
    {auth => (
      <MediaQuery minDeviceWidth={880}>
        {matches => matches ? (
          <LayoutDesktop isSignedIn={auth.isSignedIn()}>
            {children}
          </LayoutDesktop>
          ) : (
            <LayoutMobile isSignedIn={auth.isSignedIn()}>
              {children}
            </LayoutMobile>
        )}
      </MediaQuery>
    )}
  </Subscribe>
)

export default Layout

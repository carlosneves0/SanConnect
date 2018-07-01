import React from 'react'
import MediaQuery from 'react-responsive'
import LayoutDesktop from './LayoutDesktop'
import LayoutMobile from './LayoutMobile'
import './Layout.css'

const Layout = ({ auth, children }) => (
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
)

export default Layout

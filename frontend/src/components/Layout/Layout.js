import React from 'react'
import MediaQuery from 'react-responsive'
import LayoutDesktop from './LayoutDesktop'
import LayoutMobile from './LayoutMobile'
import './Layout.css'

const Layout = ({ auth, viewer, children }) => (
  <MediaQuery minDeviceWidth={880}>
    {matches => matches ? (
      <LayoutDesktop
        isSignedIn={auth.isSignedIn()}
        viewer={viewer.state}
      >
        {children}
      </LayoutDesktop>
      ) : (
        <LayoutMobile
          isSignedIn={auth.isSignedIn()}
          viewer={viewer.state}
        >
          {children}
        </LayoutMobile>
    )}
  </MediaQuery>
)

export default Layout

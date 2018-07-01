import React from 'react'
import MediaQuery from 'react-responsive'

const withIsDesktop = Component => (
  props => (
    <MediaQuery minDeviceWidth={880}>
      {matches => (
        <Component {...props} isDesktop={matches} />
      )}
    </MediaQuery>
  )
)

export { withIsDesktop }

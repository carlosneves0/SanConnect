import React from 'react'
import MediaQuery from 'react-responsive'

const withDeviceWidth = Component => (
  props => (
    <MediaQuery minDeviceWidth={880}>
      {matches => (
        <Component {...props} isDesktop={matches} />
      )}
    </MediaQuery>
  )
)

export { withDeviceWidth }

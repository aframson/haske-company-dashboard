import React from 'react'
import Navigation from './Navigation'
export default function NavigationLayout({children}) {
  return (
    <div>
        <Navigation/>
        {children}
    </div>
  )
}

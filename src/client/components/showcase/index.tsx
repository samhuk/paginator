import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../common/nav'

export const render = () => (
  <div className="showcase">
    <Nav navItems={[
      { to: 'paginator', text: 'Paginator' },
    ]}
    />
    <Outlet />
  </div>
)

export default render

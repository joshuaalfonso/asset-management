import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-4 flex flex-col gap-4">
          {/* Page content here */}
          
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label> */}

          <Outlet />

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
            {/* Sidebar content here */}
            <li><NavLink to="/">Dashboard</NavLink></li>
            <li>
            <details open>
                <summary>Asset</summary>
                <ul>
                    <li><NavLink to="/consumables">Consumable</NavLink></li>
                    <li><a>Durable</a></li>
                </ul>
            </details>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default AppLayout
import { Outlet } from 'react-router-dom'
import SideBar from './ui/Sidebar'

const AppLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <main className="drawer-content p-4 flex flex-col gap-4">
          {/* Page content here */}
          
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label> */}

          <Outlet />

        </main>
        <SideBar />
    </div>
  )
}

export default AppLayout
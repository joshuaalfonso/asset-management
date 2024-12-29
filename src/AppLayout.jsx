import { Outlet } from 'react-router-dom'
import SideBar from './ui/Sidebar'
import Navbar from './ui/Navbar'

const AppLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* <main className="drawer-content p-4 flex flex-col gap-4"> */}
        <main className="drawer-content">
          {/* Page content here */}

          <div className='mb-4'>
            <Navbar />
          </div>
          
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
            Open drawer
          </label> */}

          <div className='max-w-7xl mx-auto flex flex-col gap-6'>
            <Outlet />
          </div>

        </main>
        <SideBar />
    </div>
  )
}

export default AppLayout
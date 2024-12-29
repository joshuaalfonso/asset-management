
import { NavLink } from "react-router-dom"


const SideBar = () => {
    return (
        <aside className="drawer-side">
            
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <div className="mb-3 flex justify-center py-3">
                    <div className="text-xl font-medium">Asset Management</div>
                </div>
                <ul className="flex flex-col gap-2">
                <li>
                    <NavLink to="/dashboard" className="font-poppins">
                        <i className="fi fi-rr-objects-column flex" style={{ fontSize: '15px' }}></i>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/purchase-request" className="font-poppins">
                        <i className="fi fi-rr-marketplace flex" style={{ fontSize: '15px' }}></i>
                        Purchase Request
                    </NavLink>
                </li>
                <li>
                <details open>
                    <summary>Asset</summary>
                    <ul>
                        <li>
                            <NavLink to="/consumables">
                                <i className="fi fi-rs-quill-pen-story flex" style={{ fontSize: '15px' }}></i>
                                Consumable
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/durable">
                                <i className="fi fi-rr-keyboard flex" style={{ fontSize: '15px' }}></i>
                                Durable
                            </NavLink>
                        </li>
                    </ul>
                </details>
                </li>
                </ul>
            </div>
      </aside>
    )
}

export default SideBar;


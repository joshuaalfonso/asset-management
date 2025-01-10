
import { NavLink } from "react-router-dom"


const SideBar = () => {
    return (
        <aside className="drawer-side">
            
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <div className="mb-3 flex justify-center py-3 gap-3">
                    {/* <div className="bg-primary text-base-300 flex items-center justify-center px-2 rounded-md font-semibold tracking-wider">
                        AMS
                    </div>
                    <div className="text-xs font-normal uppercase tracking-wider">
                        Asset
                        <p>Management System</p>
                    </div> */}
                    {/* <i className="flex items-center fi fi-rs-keyboard-left text-primary text-2xl"></i> */}
                    <div className="text-2xl font-normal uppercase tracking-wider flex items-center font-rubik text-primary">
                        Asset
                    </div>
                </div>
                <ul className="flex flex-col gap-2">
                    <li>
                        <NavLink to="/dashboard" className="font-poppins">
                            <i className="fi fi-rr-objects-column flex" style={{ fontSize: '17px' }}></i>
                            <span className="tracking-wide">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/purchase-request" className="font-poppins">
                            <i className="fi fi-rr-marketplace flex" style={{ fontSize: '17px' }}></i>
                            <span className="tracking-wide">Purchase Request</span>
                        </NavLink>
                    </li>
                    <li>
                        <details open>
                            <summary className="tracking-wide">Asset</summary>
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <NavLink to="/consumables">
                                        <i className="fi fi-rs-quill-pen-story flex" style={{ fontSize: '17px' }}></i>
                                        <span className="tracking-wide">Consumable</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/durable">
                                        <i className="fi fi-rr-keyboard flex" style={{ fontSize: '17px' }}></i>
                                        <span className="tracking-wide">Durable</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary className="tracking-wide">Others</summary>
                            <ul className="flex flex-col gap-2">
                                <li>
                                    <NavLink to="/unit-of-measure">
                                        <i className="fi fi-rs-measuring-tape flex" style={{ fontSize: '17px' }}></i>
                                        <span className="tracking-wide">Unit of Measure</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/category">
                                        <i className="fi fi-rs-tags flex" style={{ fontSize: '17px' }}></i>
                                        <span className="tracking-wide">Category</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/department">
                                        <i className="fi fi-rs-department-structure flex" style={{ fontSize: '17px' }}></i>
                                        <span className="tracking-wide">Department</span>
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


import { NavLink } from "react-router-dom"




const SideBar = () => {
    return (
        <aside className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col gap-2">
                {/* Sidebar content here */}
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
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
      </aside>
    )
}

export default SideBar;
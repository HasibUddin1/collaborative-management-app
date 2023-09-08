import { NavLink } from "react-router-dom";
import demoImage from '../../assets/images/Login-page-image.jpg'


const NavigationBar = () => {

    const navItems = <>
        <NavLink
            to='/'
            className={({ isActive }) =>
                isActive
                    ? "bg-slate-900 px-3 py-1 rounded-lg"
                    : "hover:bg-slate-900 ease-in-out duration-200 rounded-lg px-3 py-1"
            }
        >
            Home
        </NavLink>
        <NavLink
            to='/login'
            className={({ isActive }) =>
                isActive
                    ? "bg-slate-900 px-3 py-1 rounded-lg"
                    : "hover:bg-slate-900 ease-in-out duration-200 rounded-lg px-3 py-1"
            }
        >
            Login
        </NavLink>
        <NavLink
            to='/signUp'
            className={({ isActive }) =>
                isActive
                    ? "bg-slate-900 px-3 py-1 rounded-lg"
                    : "hover:bg-slate-900 ease-in-out duration-200 rounded-lg px-3 py-1"
            }
        >
            Sign Up
        </NavLink>
    </>

    return (
        <div className="navbar bg-slate-700 text-white px-4 py-4">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-2xl">Collaborative Task Management</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <label className="">
                        <div className="flex gap-5 me-5 font-semibold text-xl">
                            {navItems}
                        </div>
                    </label>
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={demoImage} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavigationBar;
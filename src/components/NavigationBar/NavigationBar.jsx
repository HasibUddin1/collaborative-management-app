import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";


const NavigationBar = () => {

    const { user, logOut } = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/users/${user?.email}`)
                .then(res => res.json())
                .then(data => setUserInfo(data))
        }
    }, [user])

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Successfully logged out')
            })
            .catch(error => {
                console.log(error)
            })
    }

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
        {
            user ?
                <></> :
                <>
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
        }
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
                {
                    user ?
                        <>
                            <div className="dropdown dropdown-end">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user?.photoURL} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                    <li>
                                        <a className="text-xl flex flex-wrap"><span className="font-semibold">Username:</span> {user?.displayName}</a>
                                    </li>
                                    <hr className="border-black" />
                                    <li><a className="text-xl flex flex-wrap"><span className="font-semibold">Bio:</span> {userInfo?.bio}</a></li>
                                    <li><button onClick={handleLogOut} className="bg-pink-400 text-xl font-semibold mt-5">Logout</button></li>
                                </ul>
                            </div>
                        </> :
                        <></>
                }
            </div>
        </div>
    );
};

export default NavigationBar;
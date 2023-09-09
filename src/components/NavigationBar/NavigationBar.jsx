import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";


const NavigationBar = () => {

    const { user, logOut } = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        if (user) {
            const users = JSON.parse(localStorage.getItem("users")) || []
            const loggedUser = users?.find(singleUser => singleUser.userEmail === user?.email)
            setUserInfo(loggedUser)
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
                    ? "bg-gray-300 text-black px-3 py-1 rounded-lg"
                    : "hover:bg-gray-300 hover:text-black ease-in-out duration-200 rounded-lg px-3 py-1"
            }
        >
            Home
        </NavLink>
        <NavLink
            to='/dashboard'
            className={({ isActive }) =>
                isActive
                    ? "bg-gray-300 text-black px-3 py-1 rounded-lg"
                    : "hover:bg-gray-300 hover:text-black ease-in-out duration-200 rounded-lg px-3 py-1"
            }
        >
            Dashboard
        </NavLink>
        {
            user ?
                <>
                    <NavLink
                        to='/addATask'
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-300 text-black px-3 py-1 rounded-lg"
                                : "hover:bg-gray-300 hover:text-black ease-in-out duration-200 rounded-lg px-3 py-1"
                        }
                    >
                        Add A Task
                    </NavLink>
                </> :
                <>
                    <NavLink
                        to='/login'
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-300 text-black px-3 py-1 rounded-lg"
                                : "hover:bg-gray-300 hover:text-black ease-in-out duration-200 rounded-lg px-3 py-1"
                        }
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to='/signUp'
                        className={({ isActive }) =>
                            isActive
                                ? "bg-gray-300 text-black px-3 py-1 rounded-lg"
                                : "hover:bg-gray-300 hover:text-black ease-in-out duration-200 rounded-lg px-3 py-1"
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
                                        <img src={user?.photoURL || userInfo?.userImage} />
                                    </div>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                                    <li>
                                        <a className="text-xl flex flex-wrap"><span className="font-semibold">Username:</span> {user?.displayName || userInfo?.userName}</a>
                                    </li>
                                    <hr className="border-black" />
                                    <li><a className="text-xl flex flex-wrap"><span className="font-semibold">Bio:</span> {userInfo?.bio}</a></li>
                                    <div className="text-center"><button onClick={handleLogOut} className="bg-pink-600 text-xl font-semibold mt-5 w-fit px-4 py-1 rounded-lg hover:bg-pink-800 ease-in-out duration-200 text-white">Logout</button></div>
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
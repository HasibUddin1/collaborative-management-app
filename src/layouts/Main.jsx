import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import Home from "../pages/Home/Home/Home";
import AddATask from "../pages/AddATask/AddATask";


const Main = () => {

    const [tasks, setTasks] = useState([])

    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
            <div className="hidden">
                <Home
                    tasks={tasks}
                    setTasks={setTasks}
                ></Home>
                <AddATask
                    tasks={tasks}
                    setTasks={setTasks}
                ></AddATask>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Main;
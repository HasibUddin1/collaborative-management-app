import { Outlet } from "react-router-dom";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { Toaster } from "react-hot-toast";


const Main = () => {
    return (
        <div>
            <NavigationBar></NavigationBar>
            <Outlet></Outlet>
            <Toaster></Toaster>
        </div>
    );
};

export default Main;
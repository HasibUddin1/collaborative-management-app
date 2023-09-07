import { Link } from "react-router-dom";


const NavigationBar = () => {
    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/login'>Login</Link>
            <Link to='/signUp'>Sign Up</Link>
        </div>
    );
};

export default NavigationBar;
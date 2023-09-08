import { Link } from "react-router-dom";
import SingleTask from "../../../components/SingleTask/SingleTask";
import { useEffect, useState } from "react";



const Home = () => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
        setTasks(storedTasks)
    }, [])

    return (
        <div>
            {
                tasks.length === 0 ? 
                <h1 className="text-center text-4xl font-semibold">You do not have any tasks now. Create your task by going to <Link className="text-blue-500 hover:underline" to='/addATask'>Add A Task</Link></h1> :
                <>
                    <div className="grid xl:grid-cols-3 gap-5">
                        {
                            tasks.map(task => <SingleTask
                                key={task.id}
                                task={task}
                            ></SingleTask>)
                        }
                    </div>
                </>
            }
        </div>
    );
};

export default Home;
import { Link } from "react-router-dom";
import SingleTask from "../../../components/SingleTask/SingleTask";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";



const Home = () => {

    const [tasks, setTasks] = useState([])

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || []
        const loggedUser = users.find(singleUser => singleUser.userEmail === user?.email)
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
        const tasksToDisplay = storedTasks.filter(singleTask => singleTask?.teamName === loggedUser?.teamName)
        setTasks(tasksToDisplay)
    }, [user])


    const [filter, setFilter] = useState('all')

    const filteredTasks = tasks.filter(task => {

        if (filter === 'all') {
            return true
        }

        if (filter === 'Completed') {
            return task.taskStatus === 'Completed'
        }

        if (filter === 'In Progress') {
            return task.taskStatus === 'In Progress'
        }

        if (filter === 'Pending') {
            return task.taskStatus === 'Pending'
        }

        return true
    })

    return (
        <div className="p-5 w-9/12 mx-auto">
            <div>
                <h2 className="text-xl font-semibold">Task List</h2>
                <select className="border-2 border-black rounded" onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            {
                tasks.length === 0 ?
                    <h1 className="text-center text-4xl font-semibold">You do not have any tasks now. Create your task by going to <Link className="text-blue-500 hover:underline" to='/addATask'>Add A Task</Link></h1> :
                    <>
                        <div className="grid xl:grid-cols-3 gap-5">
                            {
                                filteredTasks.map(task => <SingleTask
                                    key={task.id}
                                    task={task}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                ></SingleTask>)
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default Home;
import { Link } from "react-router-dom";
import SingleTask from "../../../components/SingleTask/SingleTask";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import AddingMembersModal from "../../../components/AddingMembersModal/AddingMembersModal";
import AssigningTaskModal from "../../../components/AssigningTask/AssigningTaskModal";



const Home = () => {

    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState(null)
    const [filter, setFilter] = useState('all')

    const { user } = useContext(AuthContext)

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loggedUser = users.find(singleUser => singleUser.userEmail === user?.email);
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        // Filter tasks based on both user and filter
        const tasksToDisplay = storedTasks.filter(singleTask => {
            return (
                singleTask?.teamName === loggedUser?.teamName &&
                (filter === 'all' ||
                    (filter === 'Completed' && singleTask.taskStatus === 'Completed') ||
                    (filter === 'In Progress' && singleTask.taskStatus === 'In Progress') ||
                    (filter === 'Pending' && singleTask.taskStatus === 'Pending') ||
                    (filter === 'High' && singleTask.taskPriority === 'High' && singleTask.taskStatus === 'In Progress') ||
                    (filter === 'Low' && singleTask.taskPriority === 'Low' && singleTask.taskStatus === 'In Progress'))
            );
        });

        setTasks(tasksToDisplay);
    }, [user, filter]);


    return (
        <div className="p-5 w-9/12 mx-auto">
            <div className="flex gap-10">
                <div>
                    <h2 className="text-xl font-semibold">Filter by Status:</h2>
                    <select className="border-2 border-black rounded" onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                <div>
                    <h2 className="text-xl font-semibold">Filter by Priority:</h2>
                    <select className="border-2 border-black rounded" onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="High">High Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>
            </div>
            {
                tasks.length === 0 ?
                    <h1 className="text-center text-4xl font-semibold mt-5">You do not have any tasks now based on your filter. Create your task by going to <Link className="text-blue-500 hover:underline" to='/addATask'>Add A Task</Link></h1> :
                    <>
                        <div className="grid xl:grid-cols-3 gap-5 mt-5">
                            {
                                tasks.map(task => <SingleTask
                                    key={task.id}
                                    task={task}
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    setTask={setTask}
                                ></SingleTask>)
                            }
                        </div>
                    </>
            }
            {
                user ?
                    <>
                        <div className="text-center mt-10">
                            <button className="btn btn-warning font-bold" onClick={() => document.getElementById('my_modal_1').showModal()}>Invite Users to Your Team</button>
                        </div>
                    </> :
                    <></>
            }
            <AddingMembersModal></AddingMembersModal>
            <AssigningTaskModal task={task} setTasks={setTasks}></AssigningTaskModal>
        </div>
    );
};

export default Home;
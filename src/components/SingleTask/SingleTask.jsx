import toast from "react-hot-toast";


const SingleTask = ({ task, setTasks, setTask }) => {

    // TODO: Implementation of mark as in progress

    const { id, taskTitle, taskStatus, taskPriority, taskDescription, dueDate, assign, teamName } = task

    const handleCompleted = id => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []

        const taskToUpdate = tasks.find(task => task.id === id)

        if (taskToUpdate) {
            taskToUpdate.taskStatus = 'Completed'
            localStorage.setItem("tasks", JSON.stringify(tasks))
            setTasks(tasks)
            toast.success("Task status has been set to completed")
        }
        else {
            console.log("Task not found")
        }
    }

    const handleInProgress = id => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []

        const taskToUpdate = tasks.find(task => task.id === id)

        if (taskToUpdate) {
            taskToUpdate.taskStatus = 'In Progress'
            localStorage.setItem("tasks", JSON.stringify(tasks))
            setTasks(tasks)
            toast.success("Task status has been set to in progress")
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{taskTitle}</h2>
                <p>{taskDescription}</p>
                <p><span className="font-semibold">Task Priority:</span> {taskPriority}</p>
                <p><span className="font-semibold">Due Date:</span> {dueDate}</p>
                <p><span className="font-semibold">Team Name:</span> {teamName}</p>
                <p className="text-xl"><span className="font-semibold">Task Status:</span> {taskStatus}</p>
                <div className="card-actions justify-end">
                    {
                        taskStatus === 'Completed' || taskStatus === 'Pending' ?
                            <button onClick={() => handleInProgress(id)} className="btn btn-neutral font-bold">Mark as In Progress</button> :
                            taskStatus === 'In Progress' || taskStatus === 'Pending' ?
                                <button onClick={() => handleCompleted(id)} className="btn btn-success font-bold">Mark as Completed</button> :
                                taskStatus === 'Pending' ?
                                    <button onClick={() => handleInProgress(id)} className="btn btn-neutral font-bold">Mark as In Progress</button> :
                                    <></>
                    }
                </div>
                <p className="text-end flex flex-col"><span className="font-semibold">Assigned To:</span> {assign}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-warning font-bold" onClick={() => {
                        document.getElementById('my_modal_2').showModal()
                        setTask(task)
                    }}>Reassign</button>
                </div>
            </div>
        </div>
    );
};

export default SingleTask;
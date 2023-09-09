

const SingleTask = ({ task, setTasks }) => {

    // TODO: Implementation of mark as in progress

    const { id, taskTitle, taskStatus, taskPriority, taskDescription, dueDate, assign } = task

    const handleCompleted = id => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []

        const taskToUpdate = tasks.find(task => task.id === id)

        if (taskToUpdate) {
            taskToUpdate.taskStatus = 'Completed'
            localStorage.setItem("tasks", JSON.stringify(tasks))
            setTasks(tasks)
        }
        else {
            console.log("Task not found")
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{taskTitle}</h2>
                <p>{taskDescription}</p>
                <p><span className="font-semibold">Task Priority:</span> {taskPriority}</p>
                <p><span className="font-semibold">Due Date:</span> {dueDate}</p>
                <p className="text-xl"><span className="font-semibold">Task Status:</span> {taskStatus}</p>
                <div className="card-actions justify-end">
                    {
                        taskStatus === 'Completed' ?
                            <button className="btn btn-neutral w-fit">Completed</button> :
                            <button onClick={() => handleCompleted(id)} className="btn btn-warning">Mark as Completed</button>
                    }
                </div>
                <p className="text-end flex flex-col"><span className="font-semibold">Assigned To:</span> {assign}</p>
            </div>
        </div>
    );
};

export default SingleTask;
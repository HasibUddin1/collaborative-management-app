

const SingleTask = ({ task }) => {

    const { taskTitle, taskStatus, taskPriority, taskDescription, dueDate, assign } = task

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{taskTitle}</h2>
                <p>{taskDescription}</p>
                <p><span className="font-semibold">Task Status:</span> {taskStatus}</p>
                <p><span className="font-semibold">Task Priority:</span> {taskPriority}</p>
                <p><span className="font-semibold">Due Date:</span> {dueDate}</p>
                <p><span className="font-semibold">Assigned To:</span> {assign}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-warning">Mark as Completed</button>
                </div>
            </div>
        </div>
    );
};

export default SingleTask;
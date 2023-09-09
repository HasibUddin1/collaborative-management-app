

const SingleTeamTask = ({task}) => {

    const {taskTitle, taskDescription, taskPriority, dueDate, teamName, taskStatus, assign} = task

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
                    
                </div>
                <p className="text-end flex flex-col"><span className="font-semibold">Assigned To:</span> {assign}</p>
            </div>
        </div>
    );
};

export default SingleTeamTask;
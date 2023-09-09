import { useState } from "react";
import { generateRandomId } from "../../helpers/generateRandomId/generateRandomId";
import toast from "react-hot-toast";
import { getUniqueEmailsByTeam } from "../../helpers/getUsersByTeamName/getUniqueEmailsByTeam";


const AddATask = () => {

    const [error, setError] = useState('')
    const teamMembers = getUniqueEmailsByTeam()

    const handleAddTask = event => {
        event.preventDefault()

        const form = event.target
        const taskTitle = form.taskTitle.value
        const taskPriority = form.taskPriority.value
        const assign = form.assign.value
        const dueDate = form.dueDate.value
        const taskDescription = form.taskDescription.value
        const taskStatus = form.taskStatus.value

        if (!taskTitle) {
            setError('Task title cannot be empty')
            return
        }

        if (!taskPriority) {
            setError('Task priority cannot be empty')
            return
        }

        if (!assign) {
            setError('Assign field cannot be empty')
            return
        }

        if (!dueDate) {
            setError('Due date field cannot be empty')
            return
        }

        if (!taskDescription) {
            setError('Task description field cannot be empty')
            return
        }

        if (!taskStatus) {
            setError('Task status field cannot be empty')
        }

        setError('')
        const taskInfo = {
            id: generateRandomId(),
            taskTitle,
            taskPriority,
            assign,
            dueDate,
            taskDescription,
            taskStatus
        }

        const existingTasks = JSON.parse(localStorage.getItem("tasks")) || []

        const updatedTasks = [...existingTasks, taskInfo]

        localStorage.setItem("tasks", JSON.stringify(updatedTasks))
        form.reset()
        toast.success("Added task successfully")
    }

    return (
        <div className="p-5 xl:p-20 bg-slate-300 min-h-screen">
            <form onSubmit={handleAddTask}>
                <div className="xl:flex gap-10">
                    <div className="xl:w-1/2">
                        <label className="text-xl font-semibold" htmlFor="taskTitle">Task Title</label>
                        <input className="w-full px-4 py-2 rounded-lg block mt-2" type="text" name="taskTitle" id="taskTitle" placeholder="Task Title" />
                    </div>
                    <div className="xl:w-1/2">
                        <label className="text-xl font-semibold" htmlFor="taskPriority">Task Priority</label>
                        <select className="w-full px-4 py-2 rounded-lg block mt-2" name="taskPriority" id="taskPriority">
                            <option value="High">High</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
                <div className="xl:flex gap-10">
                    <div className="xl:w-1/3">
                        <label className="text-xl font-semibold" htmlFor="dueDate">Due Date</label>
                        <input className="w-full px-4 py-2 rounded-lg block mt-2" type="date" name="dueDate" id="dueDate" placeholder="Due Date" />
                    </div>
                    <div className="xl:w-1/3">
                        <label className="text-xl font-semibold" htmlFor="taskStatus">Task Status</label>
                        <select className="w-full px-4 py-2 rounded-lg block mt-2" name="taskStatus" id="taskStatus">
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="xl:w-1/3">
                        <label className="text-xl font-semibold" htmlFor="assign">Assign To</label>
                        <select className="w-full px-4 py-2 rounded-lg block mt-2" name="assign" id="assign">
                            {
                                teamMembers.map(team => <option key={team} value={team}>{team}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <label className="text-xl font-semibold" htmlFor="taskDescription">Task Description</label>
                    <textarea style={{ resize: 'none' }} className="block px-4 py-2 rounded-md w-full mt-2" name="taskDescription" id="taskDescription" cols="30" rows="5" placeholder="Task Description"></textarea>
                </div>
                <div className="mt-5">
                    <input className="btn btn-success font-bold w-full" type="submit" value="Add Task" />
                </div>
                {error && <p className="text-red-500 text-xl text-center font-semibold">{error}</p>}
            </form>
            <h1 className="text-center text-2xl mt-5"><span className="font-bold">Important Note:</span> Before assigning a task to any user you must invite him to your team</h1>
        </div>
    );
};

export default AddATask;
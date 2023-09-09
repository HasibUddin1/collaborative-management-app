import { useEffect, useState } from "react";
import SingleTeamTask from "../SingleTeamTask/SingleTeamTask";


const SingleTeamTasks = ({ teamName }) => {

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []
        const tasksByTeam = tasks.filter(singleTask => singleTask.teamName === teamName)
        setTasks(tasksByTeam)
    }, [teamName])

    return (
        <div className="grid xl:grid-cols-3 gap-10">
            {
                tasks.length === 0 ?
                    <h1>This team does not have any tasks</h1> :
                    <>
                        {
                            tasks.map(task => <SingleTeamTask
                                key={task.id}
                                task={task}
                            ></SingleTeamTask>)
                        }
                    </>
            }
        </div>
    );
};

export default SingleTeamTasks;
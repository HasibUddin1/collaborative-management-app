import toast from "react-hot-toast";
import { getUniqueEmailsByTeam } from "../../helpers/getUsersByTeamName/getUniqueEmailsByTeam";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const AssigningTaskModal = ({ task, setTasks }) => {

    const teamMembers = getUniqueEmailsByTeam()

    const { user } = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        if(user){
            const users = JSON.parse(localStorage.getItem("users")) || []
            const loggedUser = users.find(singleUser => singleUser.userEmail === user?.email)
            setUserInfo(loggedUser)
        }
    }, [user])

    const assignTasks = email => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []

        const updatedTasks = tasks?.map(singleTask => {
            if (singleTask.id === task.id) {
                return { ...singleTask, assign: email }
            }
            return singleTask
        })

        localStorage.setItem("tasks", JSON.stringify(updatedTasks))

        toast.success(`Successfully assigned task to ${email}`)
        const tasksToDisplay = tasks.filter(singleTask => singleTask.teamName === userInfo.teamName)
        setTasks(tasksToDisplay)
    }

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Assign Task</h3>
                {
                    teamMembers?.map(teamMember => <div className="mt-3" key={teamMember}>
                        <button onClick={() => assignTasks(teamMember)} className="btn btn-success font-bold">{teamMember}</button>
                    </div>)
                }
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AssigningTaskModal;
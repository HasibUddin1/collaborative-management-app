import { useContext, useEffect, useState } from "react";
import { getUniqueEmails } from "../../helpers/getUniqueTeamNames/getUniqueEmails";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";


const AddingMembersModal = () => {

    const { user } = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState(null)

    const userEmails = getUniqueEmails()

    const sendInvitation = (email, teamName) => {
        const users = JSON.parse(localStorage.getItem("users")) || []
        const userToAddInTeam = users.find(singleUser => singleUser.userEmail === email)
        
        if(userToAddInTeam){
            userToAddInTeam.teamName = teamName

            localStorage.setItem("users", JSON.stringify(users))

            toast.success("Successfully invited to your team")
        }
        else{
            toast.error("User not found")
        }
    }

    useEffect(() => {
        if(user){
            const users = JSON.parse(localStorage.getItem("users")) || []
            const loggedUser = users.find(singleUser => singleUser.userEmail === user?.email)
            setUserInfo(loggedUser)
        }
    }, [user])

    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Invite Users</h3>
                {
                    userEmails.map(userEmail => <div className={userEmail === user?.email ? 'hidden' : 'mt-3'} key={userEmail}>
                        <button onClick={() => sendInvitation(userEmail, userInfo.teamName)} className="btn btn-success font-bold">{userEmail}</button>
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

export default AddingMembersModal;
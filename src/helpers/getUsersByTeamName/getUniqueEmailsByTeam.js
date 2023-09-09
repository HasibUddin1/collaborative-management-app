import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


export const getUniqueEmailsByTeam = () => {

    const { user } = useContext(AuthContext)

    const users = JSON.parse(localStorage.getItem("users")) || []
    if (user) {
        const loggedUser = users.find(singleUser => singleUser.userEmail === user?.email)
        console.log(loggedUser)
        const emails = new Set();

        users.forEach((user) => {
            if (user.teamName === loggedUser.teamName && user.userEmail) {
                emails.add(user.userEmail);
            }
        });

        return Array.from(emails)
    }
};
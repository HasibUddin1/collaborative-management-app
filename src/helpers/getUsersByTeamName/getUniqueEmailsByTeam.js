import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const getUniqueEmailsByTeam = () => {
    const { user } = useContext(AuthContext);
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (user) {
        const loggedUser = users.find((singleUser) => singleUser.userEmail === user.email);

        if (loggedUser) {
            const teamMembers = users
                .filter((user) => user.teamName === loggedUser.teamName && user.userEmail)
                .map((user) => user.userEmail);

            // Convert the array of emails to a Set to remove duplicates
            const uniqueEmails = new Set(teamMembers);

            // Convert the Set back to an array
            return Array.from(uniqueEmails);
        }
    }

    return [];
};
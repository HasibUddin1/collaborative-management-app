const users = JSON.parse(localStorage.getItem("users")) || [];

export const getUniqueTeamNames = () => {
    const teamNames = new Set()

    users.forEach((user) => {
        const userTeamName = user.teamName;
        if (userTeamName) {
            teamNames.add(userTeamName);
        }
    });

    return Array.from(teamNames);
}
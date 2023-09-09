import SingleTeamTasks from "../../components/SingleTeamTasks/SingleTeamTasks";
import { getUniqueTeamNames } from "../../helpers/getUniqueTeamNames/getUniqueTeamNames";


const Dashboard = () => {

    const teamNames = getUniqueTeamNames()

    return (
        <div className="w-9/12 mx-auto">
            {
                teamNames.map(teamName => <div className="mt-10" key={teamName}>
                    <h1 className="text-4xl font-semibold">Team: {teamName}</h1>
                    <SingleTeamTasks
                        teamName={teamName}
                    ></SingleTeamTasks>
                </div>)
            }
        </div>
    );
};

export default Dashboard;
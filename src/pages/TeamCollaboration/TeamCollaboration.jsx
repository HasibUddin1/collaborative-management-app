import AddingMembersModal from "../../components/AddingMembersModal/AddingMembersModal";


const TeamCollaboration = () => {

    return (
        <div className="w-9/12 mx-auto">
            <div className="text-center mt-10">
                <button className="btn btn-warning font-bold" onClick={() => document.getElementById('my_modal_1').showModal()}>Invite Users to Your Team</button>
            </div>
            <AddingMembersModal></AddingMembersModal>
        </div>
    );
};

export default TeamCollaboration;

/**
 * - Button component that can be used to delete a goal from the goals state.
 * @param {Object} props - The props object.
 * @param {function} props.setGoals - The function to alter the state variable goals.
 * @param {number, string} index - The index of the goal, in the goals state, to delete.
 * @returns {JSX.Element|null} The rendered Delete button
 */
export default function DeleteButton({ setGoals, index }) {
    // function to handle delete clicked - updates goals state variable.
    function handleDeleteClicked() {
    setGoals(prevGoals => prevGoals.filter(g => g.index !== index));
}
    return (
        <button className="btn btn-icon bg-transparent border-transparent p-2 w-fit" onClick={handleDeleteClicked}>
        <img src='/Tracker_assets/delete.svg' ></img>
        </button>
    )
}


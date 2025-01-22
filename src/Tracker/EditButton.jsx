
/**
 * - Button component that can be used to edit a goal. The button opens a modal that can be used to edit 
 * the properties of a goal of given index in the goals array.
 * 
 * @param {Object} props - The props object.
 * @param {function} props.setGoals - The function to alter the state variable goals.
 * @param {number, string} index - The index of the goal, in the goals state, to delete.
 * @returns {JSX.Element|null} The rendered Delete button
 */

import EditModal from './EditModal'

export default function EditButton({ goals, setGoals, index }) {
    console.log('current index 66  is:', index)

    // function to handle delete clicked - updates goals state variable.
    function handleEditClicked() {
        document.getElementById(`${index}-edit-modal`).showModal()
    }

    return (
        <>

        <button className="btn bg-transparent border-transparent p-2 w-fit" onClick={handleEditClicked}>
        Edit Goal
        </button>
        </>
    )
}


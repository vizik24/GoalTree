
/**
 * DeleteModal component that displays a modal with a question (Are you sure you want to delete this goal?),
 * and two buttons (delete and cancel)
 *
 * The following is handled in this component:
 *  - Display a modal with a question and buttons.
 *  - deleting a goal.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the modal.
 * @param {string} props.text - The text content of the modal.
 * @param {number} props.index - The index used to generate a unique id for the modal.
 * @param {function} props.setGoals - the function used to alter the goals state. Used for edit or delete.
  
 }}
 *
 * @returns {JSX.Element} The rendered MotivationModal component.
 */

import { deleteGoal } from "./firestore";
import { useAuth } from "../context/AuthContext";

 
 export default function DeleteModal({ setGoals, index  }) {
  // get current user id
  const { user } = useAuth()

      
      // function to handle delete clicked - updates goals state variable.
      function handleDeleteClicked() {
        
        // first delete the goal from firestore to make sure its gone.
        
        deleteGoal(user.uid, index)

        // then delete it from the state to make sure it doesn't get readded somehow. (also triggers UI updates)
        setGoals(prevGoals => prevGoals.filter(g => g.index !== index));
    
        
    }
   
   return (
    <>
    <dialog
      id={`${index}-delete-modal`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="grid items-center">
          <h3 className="font-bold text-lg">Are you sure you want to delete this goal?</h3>
          <br></br>
          <form method="dialog" className="grid place-items-center">
            {/* if there is a button in form, it will close the modal */}
            <button onClick={handleDeleteClicked} className="btn btn-error w-32">Delete</button>
            <br></br>
            <button className="btn w-32 btn-neutral">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  </>
  
   );
 }
 

/**
 * MotivationModal component that displays a modal with a motivational message.
 *
 * The following is handled in this component:
 *  - Display a modal with a title and text.
 *  - Close the modal when the close button is clicked.
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

import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import DeleteModal from "./DeleteModal";
import EditButton from "./EditButton"
import EditModal from "./EditModal";

export default function MoreModal({setGoals, goals, index }) {
  console.log('more modal received index', index)

  const [title, setTitle] = useState(goals[index] ? goals[index].title : '')
  const [description, setDescription] = useState(goals[index] ? goals[index].description : '')
  const [motivation, setMotivation] = useState(goals[index] ? goals[index].motivation : 'Edit goal to add a motivation.')
  const [goalIndex, setGoalIndex] = useState(goals.index ? index : null)

  // re render title, description, motivation if goals state changes
  useEffect( () => {
    setTitle(goals[index] ? goals[index].title : '')
    setDescription(goals[index] ? goals[index].description : '')
    setMotivation(goals[index] ? goals[index].motivation : 'Edit goal to add a motivation.')
    setGoalIndex(goals[index] ? index : null)
  }, [goals.length, index])


  return (
    <>

    <dialog
      id={`${index}-more-modal`}
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <div className="grid grid-cols-3 items-center ">
          <div className="flex justify-start">
          <DeleteButton index={index} setGoals={setGoals} />
          </div>
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex justify-end">
          <EditButton index={index} setGoals={setGoals} goals={goals} />
          </div>

        </div>
        <p className="py-2 text-sm text-neutral-500">{description}</p>
        <p className="py-2 text-m">Motivation:</p>
        <p className="py-2 text-sm text-neutral-500">{motivation}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary" onClick={() => document.getElementById(`${index}-more-modal`).close()}>Close</button>
          </form>
        </div>
      </div>
    </dialog>
    </>
  );
}

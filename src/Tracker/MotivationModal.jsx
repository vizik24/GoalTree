

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
 * 
 * @returns {JSX.Element} The rendered MotivationModal component.
 */
export default function MotivationModal({title, text, index}){
    return(
<dialog id={`${index}-motivation-modal`} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="py-2">{text}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-primary">Close</button>
      </form>
    </div>
  </div>
</dialog>

    )
}
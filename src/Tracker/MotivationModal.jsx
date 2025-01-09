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
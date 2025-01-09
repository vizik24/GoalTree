export default function AddTaskButton({handleNewTaskClick}) {
    return(
        <>
        <button onClick={handleNewTaskClick} className="btn btn-primary">Add Task</button>
        </>
        )
}
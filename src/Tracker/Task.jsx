import React from 'react';

export default function Task({ bigCard, tasks, taskIndex, setTasks, highlightGoalIndex, setHighlightGoalIndex }) {
    console.log('All tasks in task component:', tasks);

    // Access the specific task from the tasks array using the taskIndex
    const task = tasks[taskIndex];
    if (!task) {
        console.log('No task found at index:', taskIndex);
        return null; // or some fallback UI
    }

    console.log('Current task is:', task);
    console.log('576', highlightGoalIndex);

    // Destructure the task object
    const { title, completed, description, parentGoal } = task;

    const handleCheckboxChange = (e) => {
        console.log("Checkbox changed to:", e.target.checked);
        setTasks(prevTasks =>
            prevTasks.map((t, idx) => idx === taskIndex ? { ...t, completed: e.target.checked } : t)
        );
    };

    function viewParentClicked(parentGoal) {
        setHighlightGoalIndex(parentGoal)
        setTimeout(() => {
            setHighlightGoalIndex(null);
        }, 300);
    };

    function handleDeleteClicked() {
        console.log('Deleting task at index:', taskIndex);
        setTasks(prevTasks => prevTasks.filter((_, idx) => idx !== taskIndex));
    }

    return (
        <div className={`bg-base-100 border-base-100 h-fit w-64 rounded-lg p-2 flex flex-col justify-between m-4`}>
            <h1 className={`text-left ${completed ? 'line-through' : ''}`}>{title}</h1>
            <p className={`text-sm text-neutral-500 text-left ${completed ? 'line-through' : ''}`}>{description}</p>
            {bigCard && (<div className="flex justify-between items-center mt-auto">
                <div className="flex justify-left items-center mt-auto w-full">
                    <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={() => viewParentClicked(parentGoal)}>
                        <img src='/Tracker_assets/dna.svg' alt="View Parent"></img>
                    </button>
                    <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={handleDeleteClicked}>
                        <img src='/Tracker_assets/delete.svg' alt="Delete Task"></img>
                    </button>
                </div>
                <div className="form-control">
                    <input
                        type="checkbox"
                        checked={completed}
                        className="checkbox "
                        onChange={handleCheckboxChange}
                    />
                </div>
            </div>
        )}
        </div>
    );
}

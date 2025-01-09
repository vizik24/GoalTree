import { useState, useEffect } from "react";

import Goal from "./Goal";

export default function NewTaskModal({ goals,setGoals, tasks, setTasks }){

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [parentGoal, setParentGoal] = useState(null)

    // Function to add a task. Adds a new task to the goals array.
  function addTask(newTaskObject) {
    setTasks((prevTasks) => {
      const newTasks = [
        ...prevTasks,
        {
          index: prevTasks.length,
          date: newTaskObject.date,
          title: newTaskObject.title,
          description: newTaskObject.description,
          parentGoal: newTaskObject.parentGoal,
          completed: false,  // completed will always be false when we first create the goal
        },
      ];
      return newTasks;
    })}

    // filter goals to goals that have not expired.
    const filteredGoals = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');

      return goals.filter((goal) => {
        if (goal.goalPeriodCat === 'month') {
          return goal.goalPeriod >= currentMonth;
        } else if (goal.goalPeriodCat === 'year') {
          return goal.goalPeriod >= currentYear;
        }
        return ['hh'];
      });
    }

    

     // Function to handle save clicked, creates the new goal object and adds it.
    const handleSave = () => {
        // Create a new Date object for the current date and time
        const today = new Date();

        // Get the current year
        const currentYear = today.getFullYear();

        // Get the current month (0 indexed) and format it
        let currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
        console.log('month test',today.getMonth().toString().padStart(2, '0'))

        // Get the current day of the month and format it
        const currentDay = today.getDate().toString().padStart(2, '0');

        // Correctly format the currentYearMonthDay
        const currentYearMonthDay = `${currentYear}-${currentMonth}-${currentDay}`;
        console.log('Todays date is:', currentYearMonthDay)
        // create newTaskObject
        const newTaskObject = {
            date: currentYearMonthDay,
            title,
            description,
            parentGoal: parentGoal
        };
        addTask(newTaskObject);
    };

     useEffect(() => {
        console.log("Updated Tasks Array:", tasks);
      }, [tasks]);

      function handleParentGoalSelected(value) {
        setParentGoal(value)
        console.log('parent goal selected', value)
      }

      

    return (
        <>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="NewTaskModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Add Task</h3>
            <div className="flex flex-col w-full">
            <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <textarea
                
                    className="textarea textarea-bordered h-1 resize-none"
                    placeholder="Keep the kitchen clean"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></textarea>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <textarea
     
                    className="textarea textarea-bordered h-24"
                    placeholder="Put the dishes away, wipe the counters, and sweep the floor."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>

                {/* parent goal selection */}
                <div className="collapse collapse-arrow join-item border-base-300 border">
                      <input type="radio" name="parent-goal-accordian" />
                      <div className="collapse-title text-xl font-medium">
                        Parent Goal
                      </div>
                      <div className="collapse-content">
                        {/* radio buttons with goal cards */}
                        {filteredGoals().map((goal) => (
                          <label key={goal.index} className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="goal"
                              value={goal.index}
                              onChange={(e) => handleParentGoalSelected(e.target.value)}
                            />
                            <Goal bigCard={false} goalIndex={goal.index} goals={goals} setGoals={setGoals} />
                          </label>
                        ))}
                        
                      </div>
                    </div>

                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleSave}
                    className="btn-primary btn"
                  >
                    Save
                  </button>
                  <button
                    className="btn-neutral btn"
                    onClick={() => document.getElementById("NewTaskModal").close()}
                  >
                    Cancel
                  </button>
                </div>
            </form>
            </div>
        </div>
        </dialog>
        </>
    )

}
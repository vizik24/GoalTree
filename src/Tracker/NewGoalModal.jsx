/**
 * NewGoalModal component that allows users to add new goals with various attributes. Sets the parent goal to itself.
 *
 * The following is handled in this component:
 *  - Manage state for goal attributes such as title, description, priority, motivation, and parent goal.
 *  - Filter goals to only include those that have not expired for selecting a parent goal.
 *  - Handle changes to goal period based on selected time category (year, month, day).
 *  - Add a new goal to the goals array and reset the form state after saving.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.goals - Array of goal objects.
 * @param {Function} props.setGoals - Function to update the goals state.
 *
 * @returns {JSX.Element} The rendered NewGoalModal component.
 */

import React, { useEffect, useState } from "react";
import Goal from "./Goal";

function NewGoalModal({ goals, setGoals }) {
  // define state variables for the goal properties
  const [goalPeriodCat, setGoalPeriodCat] = useState("year");
  const [goalPeriod, setGoalPeriod] = useState("2025");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [parentGoal, setParentGoal] = useState(0);
  const [priority, setPriority] = useState("1");
  const [motivation, setMotivation] = useState("");

  // Function to add a goal. Adds a new goal to the goals array.
  function addGoal(newGoalObject) {
    // update the goals array with the previous goals plus the new goal from a newGoalObject.
    let newIndex = 0;
    setGoals((prevGoals) => {
      if (prevGoals.length >= 1) {
        // set the index to the highest index in prevGoals
        const highestIndex = Math.max(...prevGoals.map((goal) => goal.index));
        newIndex = highestIndex + 1;
      } else {
        // if there are no previous goals, set index to 0.
        newIndex = 0;
      }

      const newGoals = [
        ...prevGoals,
        {
          index: newIndex,
          goalPeriodCat: newGoalObject.goalPeriodCat,
          goalPeriod: newGoalObject.goalPeriod,
          title: newGoalObject.title,
          description: newGoalObject.description,
          priority: newGoalObject.priority,
          motivation: newGoalObject.motivation,
          parentGoal: newGoalObject.parentGoal,
          completed: false, // completed will always be false when we first create the goal
          completedDate: newGoalObject.completedDate,
        },
      ];
      return newGoals;
    });
  }

  // Create a new Date object for the current date and time
  const today = new Date();

  // Get the current year
  const currentYear = today.getFullYear();

  // Get the current month (0 indexed) and format it
  let currentMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  console.log("month test", today.getMonth().toString().padStart(2, "0"));

  // Get the current day of the month and format it
  const currentDay = today.getDate().toString().padStart(2, "0");

  // Correctly format the currentYearMonthDay
  const currentYearMonthDay = `${currentYear}-${currentMonth}-${currentDay}`;
  console.log("Todays date is:", currentYearMonthDay);

  // reassign current month to include the current year
  currentMonth = `${currentYear}-${currentMonth}`;
  console.log("month test", currentMonth);

  // Function to set goal period according to which accordion is open.
  const handleRadioChange = (event) => {
    let value = event.target.value;
    setGoalPeriodCat(value);
    // update the goal period default value according to which radio was clicked
    value == "year"
      ? setGoalPeriod(currentYear)
      : value == "month"
      ? setGoalPeriod(currentMonth.toString())
      : setGoalPeriod(currentYearMonthDay);
  };

  // function to handle year change
  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setGoalPeriod(newYear);
    console.log("Goal Period changed to", newYear); // Log the new value directly
  };

  // function to handle month change
  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setGoalPeriod(newMonth);
    console.log("Goal Period changed to", newMonth); // Log the new value directly
  };

  // function to handle day change.
  const handleDayChange = (event) => {
    const newDay = event.target.value;
    setGoalPeriod(newDay);
    console.log("Goal Period changed to", newDay); // Log the new value directly
  };

  // Function to handle save clicked, creates the new goal object and adds it.
  const handleSave = () => {
    const newGoalObject = {
      goalPeriodCat,
      goalPeriod,
      title,
      description,
      priority,
      motivation,
      parentGoal: parentGoal,
      completedDate: "",
    };
    addGoal(newGoalObject);
    // reset state to empty
    setGoalPeriodCat("year");
    setGoalPeriod("2025");
    setTitle("");
    setDescription("");
    setMotivation("");
    setParentGoal("");
    setPriority("1");
  };

  // useEffect to log goals array after it updates
  useEffect(() => {
    console.log("Updated Goals Array:", goals);
  }, [goals]);

  return (
    <>
      <dialog id="NewGoalModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Create First Goal</h3>
          <div className="modal-action justify-center">
            <div className="flex flex-col w-full">
              <form method="dialog">
                <input
                  className="input w-full"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>

                <textarea
                  className="textarea textarea-bordered h-24 my-2 w-full"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <textarea
                  className="textarea textarea-bordered h-24 my-2 w-full"
                  placeholder="Motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                ></textarea>
                <input
                  type="number"
                  placeholder="Priority (1 - 3)"
                  title="Priority (1 - 3)"
                  className="input validator my-2 w-full"
                  onChange={(e) => setPriority(e.target.value)}
                  min={1}
                  max={3}
                />
                <div>
                  <p className="label-text left-0 w-fit mb-3 ml-1">
                    Make this goal a:
                  </p>
                  <div className="join join-vertical w-full mb-8">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                      <input
                        defaultChecked
                        type="radio"
                        name="my-accordion-4"
                        value={"year"}
                        onChange={handleRadioChange}
                      />
                      <div className="collapse-title text-xl font-medium">
                        Yearly Goal
                      </div>
                      <div className="collapse-content">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Year</span>
                          </div>
                          <input
                            type="number"
                            placeholder={currentYear}
                            className="input input-bordered w-full max-w-xs"
                            defaultValue={currentYear}
                            onChange={handleYearChange}
                            min={2025}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                      <input
                        type="radio"
                        name="my-accordion-4"
                        value={"month"}
                        onChange={handleRadioChange}
                      />
                      <div className="collapse-title text-xl font-medium">
                        Monthly Goal
                      </div>
                      <div className="collapse-content">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Month</span>
                          </div>
                          <input
                            type="month"
                            placeholder={currentMonth}
                            className="input input-bordered w-full max-w-xs"
                            value={goalPeriod}
                            defaultValue={currentMonth}
                            onChange={handleMonthChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                      <input
                        type="radio"
                        name="my-accordion-4"
                        value={"day"}
                        onChange={handleRadioChange}
                      />
                      <div className="collapse-title text-xl font-medium">
                        Daily Goal
                      </div>
                      <div className="collapse-content">
                        <label className="form-control w-full max-w-xs">
                          <div className="label">
                            <span className="label-text">Date</span>
                          </div>
                          <input
                            type="date"
                            placeholder={currentYearMonthDay}
                            className="input input-bordered w-full max-w-xs"
                            defaultValue={currentYearMonthDay}
                            value={goalPeriod}
                            onChange={handleDayChange}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button onClick={handleSave} className="btn-primary btn">
                    Save
                  </button>
                  <button
                    className="btn-neutral btn"
                    onClick={() =>
                      document.getElementById("NewGoalModal").close()
                    }
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default NewGoalModal;

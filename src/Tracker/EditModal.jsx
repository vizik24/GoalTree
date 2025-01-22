/**
 * EditGoalModal component that allows users to edit a goal. Code is similar to addgoalmodal.
 *
 * The following is handled in this component:
 *
 * @param {Object} props - The props object.
 * @param {Array} props.goals - Array of goal objects.
 * @param {Function} props.setGoals - Function to update the goals state.
 * @param {number, string} props.index - index of the goal to edit.
 *
 * @returns {JSX.Element} The rendered editgoalmodal component.
 */

import React, { useEffect, useState } from "react";
import Goal from "./Goal";

function EditModal({ goals, setGoals, index }) {
  console.log("goals array is 55", goals);

  // filter the goals array to get the current goal
  let currentGoal = goals.find((g) => g.index == index);
  console.log("current goal is 55", currentGoal);
  

  // Define state variables for form fields with initial values from currentGoal
  const [title, setTitle] = useState(currentGoal.title);
  const [description, setDescription] = useState(currentGoal.description);
  const [motivation, setMotivation] = useState(currentGoal.motivation);
  const [priority, setPriority] = useState(currentGoal.priority);
  const [goalPeriodCat, setGoalPeriodCat] = useState(currentGoal.goalPeriodCat);
  const [goalPeriod, setGoalPeriod] = useState(currentGoal.goalPeriod);
  const [parentGoal, setParentGoal] = useState(currentGoal.parentGoal);


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

  // Function to handle save clicked, updates the 
  const handleSave = () => {
    // Create a new goal object with updated values
    const updatedGoal = {
      ...currentGoal, // Spread the original goal properties
      title: title,
      description: description,
      motivation: motivation,
      priority: priority,
      goalPeriodCat: goalPeriodCat,
      goalPeriod: goalPeriod,
      parentGoal: parentGoal
    };
  
    // Update the goals array with the modified goal
    const updatedGoals = goals.map(g => g.index === index ? updatedGoal : g);
    setGoals(updatedGoals);
  
    // close the modal after saving
    document.getElementById(`${index}-edit-modal`).close();
  };
  
  

  // useEffect to log goals array after it updates
  useEffect(() => {
    console.log("Updated Goals Array:", goals);
  }, [goals]);

  return (
    <>
      <dialog id={`${index}-edit-modal`} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Goal</h3>
          <div className="modal-action justify-center">
            <div className="flex flex-col w-full">
              <form method="dialog">
                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Title</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-1 resize-none"
                    defaultValue={currentGoal.title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></textarea>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    defaultValue={currentGoal.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Motivation</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    defaultValue={currentGoal.motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                  ></textarea>
                </label>

                <label className="form-control w-full max-w-xs mb-4">
                  <div className="label">
                    <span className="label-text">Priority</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    defaultValue={currentGoal.priority}
                    onChange={(e) => setPriority(e.target.value)}
                    min={1}
                    max={3}
                  />
                </label>

                <div>
                  <p className="label-text left-0 w-fit mb-3 ml-1">
                    Make this goal a:
                  </p>
                  <div className="join join-vertical w-full mb-8">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                      <input
                        type="radio"
                        name="my-accordion-4"
                        value={"year"}
                        onChange={handleRadioChange}
                        defaultChecked={
                          currentGoal.goalPeriodCat == "year" ? true : false
                        }
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
                            placeholder={currentGoal.goalPeriod}
                            className="input input-bordered w-full max-w-xs"
                            defaultValue={currentGoal.goalPeriod}
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
                        defaultChecked={
                          currentGoal.goalPeriodCat == "month" ? true : false
                        }
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
                            placeholder={currentGoal.goalPeriod}
                            className="input input-bordered w-full max-w-xs"
                            defaultValue={currentGoal.goalPeriod}
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
                        defaultChecked={
                          currentGoal.goalPeriodCat == "day" ? true : false
                        }
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
                            placeholder={currentGoal.goalPeriod}
                            className="input input-bordered w-full max-w-xs"
                            defaultValue={currentGoal.goalPeriod}
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
                    onClick={() => document.getElementById(`${index}-edit-modal`).close()}
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

export default EditModal;

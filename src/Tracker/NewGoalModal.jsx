import React, { useEffect, useState } from "react";
import HelperDropdown from "./HelperDropdown";
import Goal from "./Goal";

function NewGoalModal({ goals, setGoals, passedParentGoal = '0' }) {
  const [goalPeriodCat, setGoalPeriodCat] = useState("");
  const [goalPeriod, setGoalPeriod] = useState();
  const [title, setTitle] = useState("Happiness");
  const [description, setDescription] = useState("We believe everyone's life goal should be happiness - add some goals and figure out how to get there.");
  const [parentGoal, setParentGoal] = useState(passedParentGoal)
  const [priority, setPriority] = useState("1");
  const [motivation, setMotivation] = useState("I so want to do this!");

  // filter goals to goals that have not expired (for selecting parent goal)
  const filteredGoals = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');

    return goals.filter((goal) => {
      if (goal.goalPeriodCat === 'day') {
        return goal.goalPeriod >= today;
      }
      else if (goal.goalPeriodCat === 'month') {
        return goal.goalPeriod >= currentMonth;
      } else if (goal.goalPeriodCat === 'year') {
        return goal.goalPeriod >= currentYear;
      }
      return [''];
    });
  }

  // function to handle parent goal when it is selected.
  function handleParentGoalSelected(value) {
    setParentGoal(value)
    console.log('parent goal selected 99', value)
  }

  // Function to add a goal. Adds a new goal to the goals array.
  function addGoal(newGoalObject) {
    setGoals((prevGoals) => {
      const newGoals = [
        ...prevGoals,
        {
          index: prevGoals.length,
          goalPeriodCat: newGoalObject.goalPeriodCat,
          goalPeriod: newGoalObject.goalPeriod,
          title: newGoalObject.title,
          description: newGoalObject.description,
          priority: newGoalObject.priority,
          motivation: newGoalObject.motivation,
          parentGoal: newGoalObject.parentGoal,
          completed: false,  // completed will always be false when we first create the goal
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
    let currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');
    console.log('month test',today.getMonth().toString().padStart(2, '0'))

    // Get the current day of the month and format it
    const currentDay = today.getDate().toString().padStart(2, '0');

    // Correctly format the currentYearMonthDay
    const currentYearMonthDay = `${currentYear}-${currentMonth}-${currentDay}`;
    console.log('Todays date is:', currentYearMonthDay)

    // reassign current month to include the current year
    currentMonth = `${currentYear}-${currentMonth}`
    console.log('month test', currentMonth)


    


    // console.log('date today is:', today)
    // console.log('current year is:', currentYear)
    // console.log('current month is:', currentYearMonth)
    // console.log('current day is:', currentYearMonthDay)


  // Function to set goal period according to which accordion is open.
  const handleRadioChange = (event) => {
    let value = event.target.value
    setGoalPeriodCat(value);
    // update the goal period default value according to which radio was clicked
    value == 'year' ? setGoalPeriod(currentYear) :
    value == 'month' ? setGoalPeriod(currentMonth.toString()) :
    setGoalPeriod(currentYearMonthDay)
  };

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setGoalPeriod(newYear);
    console.log('Goal Period changed to', newYear);  // Log the new value directly
  }
  
  const handleMonthChange = (event) => {
    const newMonth = event.target.value;
    setGoalPeriod(newMonth);
    console.log('Goal Period changed to', newMonth);  // Log the new value directly
  }
  
  const handleDayChange = (event) => {
    const newDay = event.target.value;
    setGoalPeriod(newDay);
    console.log('Goal Period changed to', newDay);  // Log the new value directly
  }
  

  // Function to handle save clicked, creates the new goal object and adds it.
  const handleSave = () => {
    const newGoalObject = {
      goalPeriodCat,
      goalPeriod,
      title,
      description,
      priority,
      motivation,
      parentGoal: parentGoal
    };
    addGoal(newGoalObject);
    // reset state to empty
    setGoalPeriodCat('')
    setGoalPeriod('')
    setTitle('')
    setDescription('')
    setMotivation('')
    setParentGoal('')
    setPriority('1')


  };

  // useEffect to log goals array after it updates
  useEffect(() => {
    console.log("Updated Goals Array:", goals);
  }, [goals]);

  return (
    <>
      <dialog id="NewGoalModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Goal</h3>
          <div className="modal-action justify-center">
            <div className="flex flex-col w-full">
              <form method="dialog">
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

                <label className="form-control">
                  <div className="label">
                    <span className="label-text">Motivation</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24"
                    placeholder="I want guests to think I am always tidy."
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                  ></textarea>
                </label>

                <label className="form-control w-full max-w-xs mb-4">
                          <div className="label">
                            <span className="label-text">Priority</span>
                          </div>
                          <input
                            type="number"
                            placeholder={1}
                            className="input input-bordered w-full max-w-xs"
                            defaultValue={1}
                            onChange={(e) => setPriority(e.target.value)}
                            min={1}
                            max={3}
                          />
                        </label>

                <div>
                  <p className="label-text left-0 w-fit mb-3 ml-1">Make this goal a:</p>
                  <div className="join join-vertical w-full mb-8">
                    <div className="collapse collapse-arrow join-item border-base-300 border">
                      <input type="radio" name="my-accordion-4" value={'year'} onChange={handleRadioChange} />
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
                      <input type="radio" name="my-accordion-4" value={'month'} onChange={handleRadioChange} />
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
                      <input type="radio" name="my-accordion-4" value={'day'} onChange={handleRadioChange} />
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
                    onClick={() => document.getElementById("NewGoalModal").close()}
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

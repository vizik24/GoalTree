

/**
 * Goal component that displays a single goal with various actions and details.
 * 
 * The following is handled in this component:
 *  - Ensure the goal exists and prevent errors if it doesn't.
 *  - Display goal details such as title, description, priority, and completion status.
 *  - Highlight the goal if it matches the highlightGoalIndex.
 *  - Provide actions to view motivation, view parent goal, add a child goal, and delete the goal.
 *  - Manage state for highlighting specific goals and adding child goals.
 * 
 * @param {Object} props - The props object.
 * @param {boolean} props.bigCard - Flag to indicate if the goal is displayed in a larger card format.
 * @param {number} props.goalIndex - Index of the goal in the goals array.
 * @param {Array} props.goals - Array of goal objects.
 * @param {Function} props.setGoals - Function to update the goals state.
 * @param {number} props.highlightGoalIndex - Index of the goal to be highlighted.
 * @param {Function} props.setHighlightGoalIndex - Function to update the highlightGoalIndex state.
 * @param {Function} props.addChildGoal - Function to add a child goal.
 * @param {number} props.addChildGoalParentIndex - Index of the parent goal to which a child goal is being added.
 * @param {Function} props.setAddChildGoalParentIndex - Function to update the addChildGoalParentIndex state.
 * 
 * @returns {JSX.Element|null} The rendered Goal component or null if the goal doesn't exist.
 */

import { useState, useRef, useEffect } from "react";
import MoreModal from "./MoreModal";


export default function Goal({ bigCard, goalIndex, goals, setGoals, highlightGoalIndex, setHighlightGoalIndex, addChildGoal, addChildGoalParentIndex, setAddChildGoalParentIndex, setMoreModalIndex, showMoreModal}) {

  // todo - use auth context to only allow changes to goals if the user is signed in.

   // define a reference to this component - accessed to control highlighting.
   const goalRef = useRef(null);

  // initiatalise variable bool variable that tells below code if this goal should be highlighted
  let isHighlighted = highlightGoalIndex == goalIndex;

  // Get a single goal from the goals array, according to the goal index passed in.
  const goal = goals.find(g => g.index == goalIndex);  // Use find to ensure the goal exists

  // Guard clause to prevent errors if goal is undefined
  if (!goal) {
      return null; // or return some fallback UI
  }

  // Destructure the goal object
  const { title, priority, completed, description, parentGoal, motivation, index } = goal;

  // function to handle the checkbox change event - toggles completed true/false and sets completed date
  function handleCheckboxChange(event) {
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

      setGoals((prevGoals) =>
          prevGoals.map(g => g.index === goalIndex ? { ...g, completed: !g.completed } : g)
      );
      // update the completedDate to currentYearMonthDay if completed date is empty, otherwise, empty completedDate.
      setGoals((prevGoals) =>
        prevGoals.map(g => 
            (g.index === goalIndex && g.completedDate == false) 
                ? { ...g, completedDate: currentYearMonthDay } 
                : { ...g, completedDate: '' }
        )
    );
  }

  // function to handle motivation button clicked - display modal of current goal
  function viewMoreClicked(index) {
    setMoreModalIndex(index)
    showMoreModal()
    
  }

  // function to handle view parent clicked 
  function viewParentClicked(parentGoal) {
  // update highlight goal index to the parent of current goal
      setHighlightGoalIndex(parentGoal)
      // wait 0.3 seconds, then reset the highlighted to null (flash effect)
      setTimeout(() => {
          setHighlightGoalIndex(null);
      }, 300);
  };

  // function to handle clicking the add child goal button - display add child goal modal using the function passed from tracker.
  function addChildClicked() {
    setAddChildGoalParentIndex(goalIndex)
    addChildGoal(goalIndex)
  }
  // when theres a state change, if isHighlited is true and the current goal exists then scroll the current goal into view.
  // FIXME.
  useEffect(() => {
      if (isHighlighted && goalRef.current) {
          goalRef.current.scrollIntoView({ behavior: "smooth", block: 'center' });
      }
  }, [isHighlighted]);

  // define a conditional css class according to if the goal is highlighted (helps keep things concise)
  const goalClassName = isHighlighted ? 'bg-base-100 border-2 inset-0 inset-border border-indigo-500 h-fit max-h-72 w-64 rounded-lg p-2 flex flex-col justify-between m-4' : 'bg-base-100 border-base-100 border h-fit max-h-72 w-64 rounded-lg p-2 flex flex-col justify-between m-4';



    return (
      <>
      
      <div className={goalClassName}>
        {/* if completed is true render the title with a line through it */}
      
        <h1 className={`text-lg text-left ${completed==false ? '' : 'line-through opacity-15'}`}>{title}</h1>
          
        <p className={` text-sm text-neutral-500 text-left truncate ${completed==false ? '' : 'line-through opacity-15'}`}>{description}</p>
        {bigCard && (<div className="flex justify-left items-center mt-auto w-full">
          <div className="flex justify-left items-center mt-auto w-full">
          {priority == 1 ? (
            <img src="/Tracker_assets/Flag_red.svg" alt="Red Flag" className="scale-75"/>
          ) : priority == 2 ? (
            <img src="/Tracker_assets/Flag_yellow.svg" alt="Yellow Flag" className="scale-75"/>
          ) : (
            <img src="/Tracker_assets/Flag_blue.svg" alt="Blue Flag" className="scale-75"/>
          )}
          <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={()=>viewParentClicked(goal.parentGoal)}>
                    <img src='/Tracker_assets/dna.svg' ></img>
                </button>
                <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={()=>viewMoreClicked(goal.index)}>
                    <img src='/Tracker_assets/more.svg' ></img>
                </button>
               

                <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={addChildClicked}>
                    <img src='/Tracker_assets/addChild.svg' ></img>
                </button>
          </div>
          <div className="form-control justify-end">
              
            <input
              type="checkbox"
              defaultChecked={completed}
              className="checkbox"
              onChange={handleCheckboxChange}
            />
            
          </div>
        </div>
        )}
      </div>
      </>
    );
  }
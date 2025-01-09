import { useState, useRef, useEffect } from "react";
import MotivationModal from "./MotivationModal";

/**
 * Goal component displays a single goal with its title, priority, and completion status.
 * 
 * @param {Object} props - The component props.
 * @param {number} props.goalIndex - The index of the goal in the goals array.
 * @param {Array} props.goals - The array of goal objects.
 * @param {Function} props.setGoals - The function to update the goals array.
 * 
 * @returns {JSX.Element} The rendered Goal component.
 */
export default function Goal({ bigCard, goalIndex, goals, setGoals, highlightGoalIndex, setHighlightGoalIndex}) {

  console.log('555 - highlighted',highlightGoalIndex)
  console.log('555 - current goal', goalIndex)

  let isHighlighted = highlightGoalIndex == goalIndex;

  // Get a single goal from the goals array
  const goal = goals.find(g => g.index === goalIndex);  // Use find to ensure the goal exists

  // Guard clause to prevent errors if goal is undefined
  if (!goal) {
      return null; // or return some fallback UI
  }

  // Destructure the goal object
  const { title, priority, completed, description, parentGoal, motivation } = goal;

  function handleCheckboxChange(event) {
      setGoals((prevGoals) =>
          prevGoals.map(g => g.index === goalIndex ? { ...g, completed: !g.completed } : g)
      );
  }

  function viewMotivationClicked(index) {
    document.getElementById(`${index}-motivation-modal`).showModal()
  }

  function viewParentClicked(parentGoal) {
    console.log('parentGoal 777 is:', parentGoal)
      setHighlightGoalIndex(parentGoal)
      setTimeout(() => {
          setHighlightGoalIndex(null);
      }, 300);
  };

  const goalRef = useRef(null);

  useEffect(() => {
      if (isHighlighted && goalRef.current) {
          goalRef.current.scrollIntoView({ behavior: "smooth", block: 'center' });
      }
  }, [isHighlighted]);

  const goalClassName = isHighlighted ? 'bg-base-100 border-2 inset-0 inset-border border-indigo-500 h-fit w-64 rounded-lg p-2 flex flex-col justify-between m-4' : 'bg-base-100 border-base-100 border h-fit w-64 rounded-lg p-2 flex flex-col justify-between m-4';

  function handleDeleteClicked() {
      setGoals(prevGoals => prevGoals.filter(g => g.index !== goalIndex));
  }

    return (
      <>
      {/*add motivation modal to the dom so it can be displayed on click of a button */}
      <MotivationModal title={title} text={motivation} index={goal.index}></MotivationModal>

      <div className={goalClassName}>
        {/* if completed is true render the title with a line through it */}
        <h1 className={`text-lg text-left ${completed==false ? '' : 'line-through'}`}>{title}</h1>
        <p className={` text-sm text-neutral-500 text-left ${completed==false ? '' : 'line-through'}`}>{description}</p>
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

                <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={()=>viewMotivationClicked(goal.index)}>
                    <img src='/Tracker_assets/Brain.svg' ></img>
                </button>



                <button className="btn btn-icon bg-transparent border-transparent p-2" onClick={handleDeleteClicked}>
                    <img src='/Tracker_assets/delete.svg' ></img>
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

/**
 * PanelView component that displays goals for different time periods (year, month, day).
 * 
 * The following is handled in this component:
 *  - Calculate the current year, month, and day.
 *  - Calculate the current five-year period dynamically.
 *  - Display goals for the current year, month, and day using the GoalContainer component.
 *  - Manage state for highlighting specific goals.
 *  - Pass down necessary props to GoalContainer, including goals, and state management functions.
 * 
 * @param {Object} props - The props object.
 * @param {Array} props.goals - Array of goal objects.
 * @param {Function} props.setGoals - Function to update the goals state.
 * @param {boolean} props.addChildGoal - Flag to indicate if a child goal is being added.
 * @param {number} props.addChildGoalParentIndex - Index of the parent goal to which a child goal is being added.
 * @param {Function} props.setAddChildGoalParentIndex - Function to update the addChildGoalParentIndex state.
 * 
 * @returns {JSX.Element} The rendered PanelView component.
 */
import React, { useState } from "react";
import GoalContainer from "./GoalContainer"


export default function PanelView({goals, setGoals, addChildGoal, addChildGoalParentIndex, setAddChildGoalParentIndex}) {
    const today = new Date()

    // get current year
    const year = today.getFullYear();
    // get current month number
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    // get current day number
    const day = today.getDate();

    // get the current 5 year period starting from 2025 (01/01/2025-31/12/2029) as a string
    // calculate the current five-year period dynamically
    const startYear = Math.floor(year / 5) * 5;
    const endYear = startYear + 4;
    const fiveYearString = `${startYear}-${endYear}`;

    // state variable to track which goalIndex to change class to highlighted. default is null.
    const [highlightGoalIndex, setHighlightGoalIndex] = useState(null)

    return (
        <div className="overflow-x-auto">
            
                <div className="grid grid-rows-1 gap-2">
                    <div className="flex flex-row gap-4">

                {/* pass only the goals to each container that match the period */}
                {/* <GoalContainer goals={goals} setGoals={setGoals} periodCat='fiveYear' period={fiveYearString} handleNewGoalCLick={handleNewGoalCLick}/> */}
                <GoalContainer goals={goals} setGoals={setGoals} periodCat='year' period={year} highlightGoalIndex={highlightGoalIndex} setHighlightGoalIndex={setHighlightGoalIndex} addChildGoal={addChildGoal} addChildGoalParentIndex={addChildGoalParentIndex} setAddChildGoalParentIndex={setAddChildGoalParentIndex}/>
                <GoalContainer goals={goals} setGoals={setGoals} periodCat='month' period={month} highlightGoalIndex={highlightGoalIndex} setHighlightGoalIndex={setHighlightGoalIndex} addChildGoal={addChildGoal} addChildGoalParentIndex={addChildGoalParentIndex} setAddChildGoalParentIndex={setAddChildGoalParentIndex}/>
                <GoalContainer goals={goals} setGoals={setGoals} periodCat='day' period={day} highlightGoalIndex={highlightGoalIndex} setHighlightGoalIndex={setHighlightGoalIndex} addChildGoal={addChildGoal} addChildGoalParentIndex={addChildGoalParentIndex} setAddChildGoalParentIndex={setAddChildGoalParentIndex}/>
                </div>
                </div>
            </div>
    )
}
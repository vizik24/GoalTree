
/**
 * GoalContainer component that displays goals for different time periods (year, month, day).
 * 
 * The following is handled in this component:
 *  - Ensure the period is a string.
 *  - Calculate today's date and format it for comparison.
 *  - Filter goals to match only those that are for today's date when periodCat is 'day'.
 *  - Display goals for the current year, month, or day using the Goal component.
 *  - Manage state for highlighting specific goals and adding child goals.
 * 
 * @param {Object} props - The props object.
 * @param {string} props.periodCat - The category of the period (year, month, day).
 * @param {string|number} props.period - The specific period (year, month, day).
 * @param {Array} props.goals - Array of goal objects.
 * @param {Function} props.setGoals - Function to update the goals state.
 * @param {Function} props.setHighlightGoalIndex - Function to update the highlightGoalIndex state.
 * @param {number} props.highlightGoalIndex - Index of the goal to be highlighted.
 * @param {boolean} props.addChildGoal - Flag to indicate if a child goal is being added.
 * @param {number} props.addChildGoalParentIndex - Index of the parent goal to which a child goal is being added.
 * @param {Function} props.setAddChildGoalParentIndex - Function to update the addChildGoalParentIndex state.
 * 
 * @returns {JSX.Element} The rendered GoalContainer component.
 */

import React from "react";
import Goal from "./Goal";

export default function GoalContainer({ periodCat, period, goals, setGoals, setHighlightGoalIndex, highlightGoalIndex, addChildGoal, addChildGoalParentIndex, setAddChildGoalParentIndex }) {
    
    // Ensure period is a string
    period = period.toString();

    // Use today's date to format strings for comparison
    const today = new Date();
    const todayYear = today.getFullYear().toString();
    const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-indexed
    const todayDay = today.getDate().toString().padStart(2, '0');
    const todayDateString = `${todayYear}-${todayMonth}-${todayDay}`;

    // Filter goals to match only those that are for today's date when periodCat is 'day'
    const filteredGoals = goals.filter(goal => {
        if (goal.goalPeriodCat !== periodCat) return false;

        const goalPeriod = goal.goalPeriod.toString();
        switch (periodCat) {
            case 'year':
                return goalPeriod.startsWith(todayYear);
            case 'month':
                return goalPeriod.startsWith(`${todayYear}-${todayMonth}`);
            case 'day':
                return goalPeriod === todayDateString;
            default:
                return false;
        }
    });

    return (
        <div className="flex flex-col items-center justify-center w-auto h-full">
            <div className="bg-base-200 p-4 rounded-lg col-span-1 items-middle justify-center h-full">
                <div className="flex flex-row self-center">
                    <h1>{periodCat === 'month' ? today.toLocaleString('default', { month: 'long' }) :
                         periodCat === 'year' ? todayYear :
                         periodCat === 'day' ? today.toLocaleString('default', { weekday: 'long' }) :
                         period} Goals</h1>
                    <div className="ml-auto">
                        {/* Placeholder for a button or other component */}
                    </div>
                </div>
                {filteredGoals.map((goal) => (
                    <Goal bigCard={true} key={goal.index} goalIndex={goal.index} goals={goals} setGoals={setGoals} setHighlightGoalIndex={setHighlightGoalIndex} highlightGoalIndex={highlightGoalIndex} addChildGoal={addChildGoal} addChildGoalParentIndex={addChildGoalParentIndex} setAddChildGoalParentIndex={setAddChildGoalParentIndex}/>
                ))}
            </div>
        </div>
    );
}

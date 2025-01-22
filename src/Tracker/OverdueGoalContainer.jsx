/**
 * OverdueGoalContainer component that displays goals that have a goalPeriod that has no elapsed.
 *
 * The following is handled in this component:
 *  - Ensure the period is a string.
 *  - Calculate today's date and format it for comparison.
 *  - Filter goals to match only those where the goalPeriod has passed.
 *  - Manage state for highlighting specific goals and adding child goals.
 *
 * @param {Object} props - The props object.
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

export default function OverdueGoalContainer({
  goals,
  setGoals,
  setHighlightGoalIndex,
  highlightGoalIndex,
  addChildGoal,
  addChildGoalParentIndex,
  setAddChildGoalParentIndex,
}) {
  // Use today's date to format strings for comparison (string so that start can be padded)
  const today = new Date();
  const todayYear = today.getFullYear().toString();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-indexed
  const todayDay = today.getDate().toString().padStart(2, "0");

  // make todayYear, todayMonth and todayDay typed number.
  const numericTodayYear = parseInt(todayYear, 10);
  const numericTodayMonth = parseInt(todayMonth, 10);
  const numericTodayDate = parseInt(todayYear + todayMonth + todayDay);

  // Filter goals to match only those where the goalPeriod has passed
  let filteredGoals = goals.filter((goal) => {
    // create variable to store numeric version of goal period (without dashes)
    let numericGoalPeriod = typeof goal.goalPeriod === 'string' ? goal.goalPeriod.replace(/-/g, "") : "";
    if (goal.goalPeriodCat == "year") {
      // return goals where goalPeriod is less then numericTodayYear
      return (numericGoalPeriod < numericTodayYear) && (goal.completed == false);
    } else if (goal.goalPeriodCat == "month") {
      // return goals where goalPeriod is less than numericTodayMonth
      return (numericGoalPeriod < numericTodayMonth)  && (goal.completed == false);
    } else if (goal.goalPeriodCat == "day") {
      // return goals where goalPeriod is less than numericTodayDate
      return (numericGoalPeriod < numericTodayDate)  && (goal.completed == false);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center w-auto h-full">
      <div className="bg-base-200 p-4 rounded-lg col-span-1 items-middle justify-center h-full">
        <div className="flex flex-row self-center">
          <h1>Overdue Goals</h1>
          <div className="ml-auto">
            {/* Placeholder for a button or other component */}
          </div>
        </div>
        {filteredGoals.length > 0 && goals.length > 0 ? (
          filteredGoals.map((goal) => (
            <Goal
              bigCard={true}
              key={goal.index}
              goalIndex={goal.index}
              goals={goals}
              setGoals={setGoals}
              setHighlightGoalIndex={setHighlightGoalIndex}
              highlightGoalIndex={highlightGoalIndex}
              addChildGoal={addChildGoal}
              addChildGoalParentIndex={addChildGoalParentIndex}
              setAddChildGoalParentIndex={setAddChildGoalParentIndex}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-sm text-neutral-500">
              Keep up the good work! No overdue goals right now.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

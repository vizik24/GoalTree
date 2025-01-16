import React, { useState } from "react";
import GoalContainer from "./GoalContainer"
import TaskBreakdown from "./TaskBreakdown";

export default function PanelView({goals, setGoals, tasks, setTasks, addChildGoal, addChildGoalParentIndex, setAddChildGoalParentIndex}) {
    console.log('adding (panel view)', addChildGoal)
    const today = new Date()

    // get current year
    const year = today.getFullYear();
    // get current month number
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    console.log('period ----- ', month)
    // get current day number
    const day = today.getDate();

    // get the current 5 year period starting from 2025 (01/01/2025-31/12/2029) as a string
    // calculate the current five-year period dynamically
    const startYear = Math.floor(year / 5) * 5;
    const endYear = startYear + 4;
    const fiveYearString = `${startYear}-${endYear}`;
    console.log('Five year period is:',fiveYearString);

    console.log('Tasks are-----', tasks)
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
                <TaskBreakdown tasks={tasks} setTasks={setTasks} highlightGoalIndex={highlightGoalIndex} setHighlightGoalIndex={setHighlightGoalIndex}></TaskBreakdown>
                </div>
                </div>
            </div>
    )
}
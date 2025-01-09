import React from "react";
import Goal from "./Goal";
import NewGoalButton from "./NewGoalButton";

export default function GoalContainer({ periodCat, period, goals, setGoals, setHighlightGoalIndex, highlightGoalIndex }) {

    console.log('goal to highlight at goal container level:', highlightGoalIndex);
    
    // Ensure period is a string
    period = period.toString();

    // Extract year, month, and day from period based on periodCat
    const periodYear = period.substring(0, 4);
    console.log('periodYear is:', periodYear);
    const periodMonth = (periodCat === 'month' || periodCat === 'day') ? period.slice(5, 7) : null;
    const periodDay = periodCat === 'day' ? period.slice(8, 10) : null;

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
                    <Goal bigCard={true} key={goal.index} goalIndex={goal.index} goals={goals} setGoals={setGoals} setHighlightGoalIndex={setHighlightGoalIndex} highlightGoalIndex={highlightGoalIndex}/>
                ))}
            </div>
        </div>
    );
}

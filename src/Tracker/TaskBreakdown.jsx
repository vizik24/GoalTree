import React from 'react';
import Task from "./Task";

export default function TaskBreakdown({tasks, setTasks, highlightGoalIndex, setHighlightGoalIndex}) {
    console.log('Tasks array is-----' ,tasks)

    // Function to filter tasks where date is today
    const getTasksForToday = (tasks) => {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = `${today.getMonth() + 1}`.padStart(2, '0');
        const currentDay = `${today.getDate()}`.padStart(2, '0');
        const currentYearMonthDay = `${currentYear}-${currentMonth}-${currentDay}`;

        let filteredTasks = tasks.filter(task => task.date === currentYearMonthDay);

        return filteredTasks
    };

    // State to manage tasks isn't defined. You would need something like this if you plan to manipulate tasks:
    // const [updatedTasks, setTasks] = useState(tasks);

    return (
        <div className="flex flex-col items-center justify-center w-auto h-full">
            <div className="bg-base-200 p-4 rounded-lg col-span-1 items-middle justify-center h-full">
                <div className="flex flex-row self-center">
                    <h1>Daily Tasks</h1>
                    <div className="ml-auto">
                        {/* Call getTasksForToday with tasks and map over the result */}
                        
                    </div>
                    </div>
                    {getTasksForToday(tasks).map((task) => (
                            <Task bigCard={true} key={task.index} taskIndex={task.index} tasks={tasks} setTasks={setTasks} highlightGoalIndex={highlightGoalIndex} setHighlightGoalIndex={setHighlightGoalIndex}/>
                        ))}
                
            </div>
        </div>
    );
}

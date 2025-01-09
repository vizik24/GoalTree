import React, { useState } from 'react';
import Goal from './Goal';

function createTreeStructure(goals) {
    let map = {};
    let levels = {};

    // Initialize map entries for all goals with empty children arrays and undefined levels
    goals.forEach(goal => {
        map[goal.index] = {...goal, children: [], level: undefined};
    });

    // First pass: Identify root goals and set level 0
    goals.forEach(goal => {
        if (goal.parentGoal == goal.index || goal.parentGoal === null || (goal.parentGoal === "0" && goal.index == "0")) {
            map[goal.index].level = 0;
            levels[0] = levels[0] || [];
            levels[0].push(map[goal.index]);
        }
    });

    // Second pass: Set levels for non-root goals
    let updated;
    do {
        updated = false;
        goals.forEach(goal => {
            if (map[goal.index].level == undefined && map[goal.parentGoal] && map[goal.parentGoal].level != undefined) {
                map[goal.index].level = map[goal.parentGoal].level + 1;
                updated = true;
                if (!levels[map[goal.index].level]) {
                    levels[map[goal.index].level] = [];
                }
                levels[map[goal.index].level].push(map[goal.index]);
            }
        });
    } while (updated);

    console.log("Final map with all goal details:", map);  // Logging full map
    console.log("Goals organized by levels:", levels);  // Logging levels

    return { map, levels };
}

export default function TreeView({ goals }) {
    const [updatedGoals, setUpdatedGoals] = useState(goals);
    const { map, levels } = createTreeStructure(updatedGoals);

    return (
        <>  
      
        
            <div>
            <div className='badge badge-accent absolute right-28'>Work in Progress</div>

                {Object.keys(levels).sort((a, b) => a - b).map((level) => (
                    <div key={level} className="flex flex-row justify-start items-center my-2.5">
                        {levels[level].map(goal => (
                            <Goal
                                key={goal.index}
                                bigCard={true}
                                goalIndex={goal.index}
                                goals={updatedGoals}
                                setGoals={setUpdatedGoals}
                                highlightGoalIndex={null}
                                setHighlightGoalIndex={() => {}}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
}

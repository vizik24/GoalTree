import { useState, useEffect } from "react";
import GoalContainer from "./GoalContainer"
import NewGoalButton from "./NewGoalButton";
import NewGoalModal from "./NewGoalModal";
import NewTaskButton from "./NewTaskButton";
import NewTaskModal from "./NewTaskModal";
import PanelView from "./PanelView";
import Tabs from "./Tabs";
import TreeView from "./TreeView";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";


export default function Tracker() {
    // Load initial state from local storage or set default
    const loadGoals = () => {
        const savedGoals = localStorage.getItem("goals");
        return savedGoals ? JSON.parse(savedGoals) : [
            // Default goals if no goals are stored
            {
                index: 0,
                goalPeriodCat: 'day',
                goalPeriod: '2025-01-06',
                title: 'Set up add goal functionality',
                description: 'Add animations to the landing page to make it more engaging',
                priority: 2,
                motivation: 'I want to make the landing page more engaging for users',
                parentGoal: 1,
                completed: false
            },
            // Add additional default goals as needed
        ];
    };

    const loadTasks = () => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [
            // Default tasks if no tasks are stored
          
            // Add additional default tasks as needed
        ];
    };

    const [goals, setGoals] = useState(loadGoals);
    const [tasks, setTasks] = useState(loadTasks);

    // Update local storage when goals or tasks change
    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    // update state variables when there is a change to local storage.
    useEffect(() => {
    const handleStorageChange = (event) => {
        if (event.storageArea === localStorage) {
            if (event.key === 'goals') {
                setGoals(JSON.parse(event.newValue));
            } else if (event.key === 'tasks') {
                setTasks(JSON.parse(event.newValue));
            }
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, []);


    // Handler functions
    function handleNewGoalClick() {
        console.log('New Goal Button Clicked.');
        document.getElementById('NewGoalModal').showModal();
    }

    function handleNewTaskClick() {
        console.log('New Task Button Clicked');
        document.getElementById('NewTaskModal').showModal();
    }

    // Components for rendering
    const panelView = () => (
        <PanelView goals={goals} setGoals={setGoals} handleNewGoalClick={handleNewGoalClick} tasks={tasks} setTasks={setTasks} />
    );

    const treeView = () => (
        <TreeView goals={goals}/>
    );



    return (
        <>
        <Nav></Nav>
        <div className="bg-base-200 p-10 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="space-x-4 md:space-y-2 md:space-x-4">
                    <NewGoalButton handleNewGoalClick={handleNewGoalClick} />
                    <NewTaskButton handleNewTaskClick={handleNewTaskClick} />
                </div>
                <div className="mt-4 md:mt-0">
                    <Link to='/contact'>
                        <button className="btn btn-neutral">Feedback</button>
                    </Link>
                </div>
            </div>
           
            <NewGoalModal goals={goals} setGoals={setGoals} />
            <NewTaskModal goals={goals} setGoals={setGoals} tasks={tasks} setTasks={setTasks} />
            <Tabs Component1={panelView} Component2={treeView} />
        </div>
        </>
    );
}

/**
 * Tracker component that manages and displays the main GoalTree app.
 * 
 * The following is handled in this component:
 *  - Load goals from local storage into state variables.
 *  - Store goals in json and update local storage when their state changes.
 *  - Define handler functions for displaying new goal modals. 
 *          - addChildGoal is passed down to the goal card so it can be used in the button.
 *  - The state for the zoom of the tree view is handled here and passed down to tree view
 *      - this allows the zoom buttons to be contained within the tracker div and therefore positioned properly.
 *  - Handler functions are defined for zoom, which are then passed to the zoom buttons.
 * 
 *  - Component variables are defined for tree view and panel view so that they can be passed as props to the tabs component.
 * 
 *  - Tabs, toolbar buttons and the modals are added to the DOM. Modals are not rendered and can be done so using showModal() from anywhere.
 * 
 * 
 * This component handles the loading, saving, and updating of goals from local storage.
 * It also provides functionality for adding new goals, and child goals, as well as zoom controls for the tree view.
 */
import { useState, useEffect } from "react";
import NewGoalButton from "./NewGoalButton";
import NewGoalModal from "./NewGoalModal";
import PanelView from "./PanelView";
import Tabs from "./Tabs";
import TreeView from "./TreeView";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import ZoomControls from "./ZoomControls";
import NewChildGoalModal from './NewChildGoalModal'


export default function Tracker() {
    
    // Load initial state from local storage or set default
    const loadGoals = () => {
        const savedGoals = localStorage.getItem("goals");
        return savedGoals ? JSON.parse(savedGoals) : [
        ];
    };

    const [goals, setGoals] = useState(loadGoals);

    // Update local storage when goals change
    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals));
    }, [goals]);


    // update state variables when there is a change to local storage.
    useEffect(() => {
    const handleStorageChange = (event) => {
        if (event.storageArea === localStorage) {
            if (event.key === 'goals') {
                setGoals(JSON.parse(event.newValue));
            } 
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
        window.removeEventListener('storage', handleStorageChange);
    };
}, []);

    // state variable to track the index of the goal for which a child goal is being added
    let [addChildGoalParentIndex, setAddChildGoalParentIndex] = useState('')


    // Handler functions
    function handleNewGoalClick() {
        console.log('New Goal Button Clicked.');
        document.getElementById('NewGoalModal').showModal();
    }

    function addChildGoal(goalIndex) {
        console.log('showing add child goal modal')
        document.getElementById('NewChildGoalModal').showModal();
    }
    
    // zoom level for tree view
    const [zoom, setZoom] = useState(1);

    // handler functions for setting zoom level
    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom * 1.2, 3));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom / 1.2, 0.5));
    };

    // Components for rendering
    const panelView = () => (
        <PanelView goals={goals} setGoals={setGoals} addChildGoal={addChildGoal} addChildGoalParentIndex={addChildGoalParentIndex} setAddChildGoalParentIndex={setAddChildGoalParentIndex} />
    );

    const treeView = () => (
        <>
        <div className=" relative top-5 left-10">
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut}></ZoomControls>
        </div>
        <TreeView goals={goals} setGoals={setGoals} zoom={zoom} addChildGoal={addChildGoal} />
        
        </>
    );

    return (
        <>
        <Nav></Nav>
        <div className="bg-base-200 p-10 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between">
                <div className="space-x-4 md:space-y-2 md:space-x-4">
                    <NewGoalButton handleNewGoalClick={handleNewGoalClick} />
                </div>
                <div className="mt-4 md:mt-0">
                    <Link to='/contact'>
                        <button className="btn btn-neutral">Feedback</button>
                    </Link>
                </div>
            </div>
            <NewChildGoalModal goals={goals} setGoals={setGoals} passedParentGoal={addChildGoalParentIndex} />

            <NewGoalModal goals={goals} setGoals={setGoals} />
            <Tabs Component1={panelView} Component2={treeView} />
        </div>
        </>
    );
}

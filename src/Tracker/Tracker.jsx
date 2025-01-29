import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import NewGoalButton from "./NewGoalButton";
import NewGoalModal from "./NewGoalModal";
import PanelView from "./PanelView";
import Tabs from "./Tabs";
import TreeView from "./TreeView";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";
import ZoomControls from "./ZoomControls";
import NewChildGoalModal from "./NewChildGoalModal";
import ShareButton from "./ShareButton";

import { getUserData, updateFsGoals } from "./firestore";

export default function Tracker() {
  // Get the current user from the authentication context
  const { user } = useAuth();
  // State to store the user's goals
  const [goals, setGoals] = useState([]);
  // State to track if data is still loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          // Set loading state to true while fetching data
          setIsLoading(true);
          // Fetch user data from Firestore
          const userData = await getUserData(user.uid);
          
          if (userData && userData.goals) {
            // If user has goals in Firestore, set them in state
            setGoals(userData.goals);
            // Clear local storage as we're now using Firestore data
            localStorage.removeItem('goals');
          } else {
            // If no goals in Firestore, check local storage
            const localGoals = JSON.parse(localStorage.getItem('goals') || '[]');
            if (localGoals.length > 0) {
              // If goals exist in local storage, update Firestore
              await updateFsGoals(user.uid, localGoals);
              // Set local goals in state
              setGoals(localGoals);
              // Clear local storage after moving goals to Firestore
              localStorage.removeItem('goals');
              console.log("Goals moved from local storage to Firestore");
            } else {
              // If no goals in Firestore or local storage, set empty array
              setGoals([]);
            }
          }
        } catch (error) {
          console.error("Failed to fetch or update user data:", error);
          // In case of error, fall back to local storage
          const localGoals = JSON.parse(localStorage.getItem('goals') || '[]');
          setGoals(localGoals);
        } finally {
          // Set loading to false after data fetching is complete
          setIsLoading(false);
        }
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [user]); // This effect runs when the user changes

  useEffect(() => {
    // Update Firestore whenever goals change and are not empty
    if (!isLoading && goals.length > 0) {
      updateFsGoals(user.uid, goals);
    }
  }, [goals, isLoading, user.uid]); // This effect runs when goals, isLoading, or user.uid changes

  // State to track the index of the parent goal when adding a child goal
  const [addChildGoalParentIndex, setAddChildGoalParentIndex] = useState("0");
  // State to manage zoom level for the tree view
  const [zoom, setZoom] = useState(1);

  // Function to handle clicking the new goal button
  const handleNewGoalClick = () => {
    document.getElementById("NewGoalModal").showModal();
  };

  // Function to handle adding a child goal
  const addChildGoal = (goalIndex) => {
    setAddChildGoalParentIndex(goalIndex);
    document.getElementById("NewChildGoalModal").showModal();
  };

  // Function to handle zooming in
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom * 1.2, 3));
  };

  // Function to handle zooming out
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.2, 0.5));
  };

  // Component for the panel view
  const panelView = () => (
    <PanelView
      goals={goals}
      setGoals={setGoals}
      addChildGoal={addChildGoal}
      addChildGoalParentIndex={addChildGoalParentIndex}
      setAddChildGoalParentIndex={setAddChildGoalParentIndex}
    />
  );

  // Component for the tree view
  const treeView = () => (
    <>
      <div className="relative top-5 left-10">
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
      <TreeView
        goals={goals}
        setGoals={setGoals}
        zoom={zoom}
        addChildGoal={addChildGoal}
      />
    </>
  );

  // Show loading state while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the main component
  return (
    <>
      <Nav />
      <div className="bg-base-200 p-10 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-x-4 md:space-y-2 md:space-x-4">
            <NewGoalButton handleNewGoalClick={handleNewGoalClick} />
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/contact">
              <button className="btn btn-neutral">Feedback</button>
            </Link>
            <ShareButton />
          </div>
        </div>
        <NewChildGoalModal
          goals={goals}
          setGoals={setGoals}
          passedParentGoal={addChildGoalParentIndex}
        />
        <NewGoalModal goals={goals} setGoals={setGoals} />
        <Tabs Component1={panelView} Component2={treeView} />
      </div>
    </>
  );
}
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TreeView from "./TreeView";
import ZoomControls from "./ZoomControls";
import CtaButton from "../components/CtaButton";
import { db } from "../firebaseConfig"; // Ensure you have the correct path to your Firebase config

export default function ShareGoalsTree() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [zoom, setZoom] = useState(false);

  // Function to parse query parameters
  function useQuery() {
    return new URLSearchParams(location.search);
  }

  const queryParams = useQuery();
  const userId = queryParams.get("userId");

  useEffect(() => {
    if (userId) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userId", "==", userId));

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUser(userData);
            console.log("User data retrieved successfully:", userData);
          } else {
            console.log("No such user found with ID:", userId);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId]);

  // Function to handle zooming in
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom * 1.2, 3));
  };

  // Function to handle zooming out
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.2, 0.5));
  };

  return (
    <>
      {user ? (
        <>
          <Nav />

          <div className="card w-full bg-base-200 card-md shadow-sm">
            <div className="card-body">
              <h2 className="card-title inline text-left text-3xl">
                {user.name} has shared their Goals
                <span className="text-primary">Tree</span> with you!
              </h2>
              <p className="text-left text-lg">
                Explore {user.name}'s tree below, or join them and{" "}
                <span className="text-secondary">4,675</span> others on their
                journey to maximize productivity.
              </p>
              <br></br>

              <div className="justify-start card-actions">
                <CtaButton></CtaButton>
              </div>
            </div>
          </div>
          <br></br>
          <div className="bg-base-200">
            <div className="relative top-5 left-10">
              <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
            </div>
            <TreeView
              goals={user.goals}
              setGoals={() => {}}
              zoom={zoom}
              addChildGoal={() => {}}
              bigCards={false}
            />
          </div>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
      <br></br>
      <Footer />
    </>
  );
}

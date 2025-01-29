"use client"

import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import TreeView from "./TreeView"
import ZoomControls from "./ZoomControls"
import CtaButton from "../components/CtaButton"
import { db } from "../firebaseConfig" // Ensure you have the correct path to your Firebase config

export default function ShareGoalsTree() {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [isExpired, setIsExpired] = useState(false)

  // Function to parse query parameters
  function useQuery() {
    return new URLSearchParams(location.search)
  }

  const queryParams = useQuery()
  const userId = queryParams.get("userId")

  useEffect(() => {
    if (userId) {
      const usersRef = collection(db, "users")
      const q = query(usersRef, where("userId", "==", userId))

      getDocs(q)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data()
            setUser(userData)
            console.log("User data retrieved successfully:", userData)

            // Check if the shared date is more than 24 hours ago
            if (userData.sharedTime) {
              console.log("sharedTime is:", userData.sharedTime)

              // Ensure sharedTime is a Firestore Timestamp
              const sharedTime =
                userData.sharedTime instanceof Timestamp ? userData.sharedTime.toDate() : new Date(userData.sharedTime)

              const now = new Date()
              const diffInHours = (now.getTime() - sharedTime.getTime()) / (1000 * 60 * 60)
              console.log("Difference in hours:", diffInHours)
              setIsExpired(diffInHours > 24)
            } else {
              console.log("No sharedTime found for user")
              setIsExpired(true) // Consider it expired if no sharedTime is set
            }
          } else {
            console.log("No such user found with ID:", userId)
            setIsExpired(true) // Consider it expired if no user is found
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
          setIsExpired(true) // Consider it expired if there's an error
        })
    }
  }, [userId])

  // Function to handle zooming in
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom * 1.2, 3))
  }

  // Function to handle zooming out
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.2, 0.5))
  }

  return (
    <>
      <Nav />
      {user ? (
        <>
          <div className="card w-full bg-base-200 card-md shadow-sm">
            <div className="card-body">
              <h2 className="card-title inline text-left text-3xl">
                {user.name} has shared their Goals
                <span className="text-primary">Tree</span> with you!
              </h2>
              <p className="text-left text-lg">
                Explore {user.name}'s future goals below, or join them and <span className="text-secondary">4,675</span>{" "}
                others on their journey to maximize productivity.
              </p>
              <br />
              <div className="justify-start card-actions">
                <CtaButton />
              </div>
            </div>
          </div>
          <br />
          {isExpired ? (
            <div className="bg-base-200 p-6 text-center">
              <p className="text-xl text-error">This share link has expired</p>
            </div>
          ) : (
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
                showCompleted={false}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-center p-6">Loading user data...</p>
      )}
      <br />
      <Footer />
    </>
  )
}


import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore"
import TreeView from "./TreeView"
import { db } from "../firebaseConfig" // Ensure you have the correct path to your Firebase config

export default function ShareGoalsTree() {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const [zoom, setZoom] = useState(false)

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
          } else {
            console.log("No such user found with ID:", userId)
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error)
        })
    }
  }, [userId])

  return (
    <>
      {user ? (
        <>
          <h1>Check out was {user.name}'s goals!</h1>
          <TreeView goals={user.goals} setGoals={() => {}} zoom={zoom} addChildGoal={() => {}} bigCards={false} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </>
  )
}


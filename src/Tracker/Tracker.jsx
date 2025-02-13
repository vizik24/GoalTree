import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import NewGoalButton from "./NewGoalButton"
import NewGoalModal from "./NewGoalModal"
import PanelView from "./PanelView"
import Tabs from "./Tabs"
import TreeView from "./TreeView"
import Nav from "../components/Nav"
import { Link } from "react-router-dom"
import ZoomControls from "./ZoomControls"
import NewChildGoalModal from "./NewChildGoalModal"
import ShareButton from "./ShareButton"
import ShowCompletedToggle from "./ShowCompletedToggle"
import EditModal from "./EditModal"
import DeleteModal from "./DeleteModal"

import { getUserData, updateFsGoals } from "./firestore"
import MoreModal from "./MoreModal"

export default function Tracker() {
  const { user } = useAuth()
  const [goals, setGoals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addChildGoalParentIndex, setAddChildGoalParentIndex] = useState("0")
  const [moreModalIndex, setMoreModalIndex] = useState("0")
  const [zoom, setZoom] = useState(1)
  const [completedToggle, setCompletedToggle] = useState(false)

  useEffect(() => {
    console.log('tracker component has received updated moreModalIndex', moreModalIndex)
  }, [moreModalIndex])

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          setIsLoading(true)
          const userData = await getUserData(user.uid)

          if (userData && userData.goals) {
            setGoals(userData.goals)
            localStorage.removeItem("goals")
          } else {
            const localGoals = JSON.parse(localStorage.getItem("goals") || "[]")
            if (localGoals.length > 0) {
              await updateFsGoals(user.uid, localGoals)
              setGoals(localGoals)
              localStorage.removeItem("goals")
              console.log("Goals moved from local storage to Firestore")
            } else {
              setGoals([])
            }
          }
        } catch (error) {
          console.error("Failed to fetch or update user data:", error)
          const localGoals = JSON.parse(localStorage.getItem("goals") || "[]")
          setGoals(localGoals)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchUserData()
  }, [user])

  useEffect(() => {
    if (!isLoading && user && user.uid && goals.length > 0) {
      const updateFirestore = async () => {
        try {
          await updateFsGoals(user.uid, goals)
        } catch (error) {
          console.error("Failed to update goals in Firestore:", error)
        }
      }
      updateFirestore()
    }
  }, [goals, isLoading, user])


  const handleNewGoalClick = () => {
    document.getElementById("NewGoalModal").showModal()
  }

  const addChildGoal = (goalIndex) => {
    setAddChildGoalParentIndex(goalIndex)
    document.getElementById("NewChildGoalModal").showModal()
  }

  const showMoreModal = () => {
    document.getElementById(`${moreModalIndex}-more-modal`).showModal()
  }

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.2, 0.5))
  }

  function handleToggle() {
    setCompletedToggle((prevState) => !prevState)
  }

  const panelView = () => (
    <PanelView
      goals={goals}
      setGoals={setGoals}
      addChildGoal={addChildGoal}
      addChildGoalParentIndex={addChildGoalParentIndex}
      setAddChildGoalParentIndex={setAddChildGoalParentIndex}
      showMoreModal={showMoreModal}
      setMoreModalIndex={setMoreModalIndex}
    />
  )

  const treeView = () => (
    <>
      <div className="relative top-5 left-10">
        <ZoomControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </div>
      <div className="relative top-5 right-10">
        <ShowCompletedToggle handleToggle={handleToggle} toggleValue={completedToggle} />
      </div>
      <TreeView
        goals={goals}
        setGoals={setGoals}
        zoom={zoom}
        addChildGoal={addChildGoal}
        addChildGoalParentIndex={addChildGoalParentIndex}
        setAddChildGoalParentIndex={setAddChildGoalParentIndex}
        showCompleted={completedToggle}
        showMoreModal={showMoreModal}
        setMoreModalIndex={setMoreModalIndex}
      />
    </>
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Nav />
      <div className="bg-base-200 p-10 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="space-x-4 md:space-y-2 md:space-x-4">
            {goals.length == 0 ? <NewGoalButton handleNewGoalClick={handleNewGoalClick} /> : null }
          </div>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/contact">
              <button className="btn btn-neutral">Feedback</button>
            </Link>
            <ShareButton />
          </div>
        </div>
        <NewChildGoalModal goals={goals} setGoals={setGoals} passedParentGoal={addChildGoalParentIndex} />
        <NewGoalModal goals={goals} setGoals={setGoals} />
        <MoreModal goals={goals} setGoals={setGoals} index={moreModalIndex}/>
        {/* add edit modals to the dom so we can display them when eddit button is pressed. */}
        <EditModal goals={goals} index={moreModalIndex} setGoals={setGoals}></EditModal>

        {/* add delete modal to the dom so we can display them when edit button is pressed */}
        <DeleteModal setGoals={setGoals} index={moreModalIndex}></DeleteModal>
        <Tabs Component1={panelView} Component2={treeView} />
      </div>
    </>
  )
}


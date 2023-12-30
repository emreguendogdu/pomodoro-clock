import { useState } from "react"

import "./Tasks.css"
import TaskModal from "./TaskModal"

export default function Tasks() {
  // const [todos, setTodos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const submitTask = (taskValue) => {
    if (taskValue.trim() !== "") {
      alert("Task submitted: " + taskValue)
      closeModal()
    } else {
      alert("Please enter a task before submitting.")
    }
  }
  return (
    <>
      <button id="openDialogBtn" onClick={openModal}>
        Add To Do
      </button>
      <section id="tasks-section">
        {isModalOpen && (
          <TaskModal closeModal={closeModal} submitTask={submitTask} />
        )}
      </section>
    </>
  )
}

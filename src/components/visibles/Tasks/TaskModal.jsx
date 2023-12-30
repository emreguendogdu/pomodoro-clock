import React, { useState } from "react"
import "./Tasks.css"

function TaskModal({ closeModal, submitTask }) {
  const [taskValue, setTaskValue] = useState("")

  const handleInputChange = (event) => {
    setTaskValue(event.target.value)
  }

  const handleSubmit = () => {
    submitTask(taskValue)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Enter Task:</h2>
        <input
          type="text"
          value={taskValue}
          onChange={handleInputChange}
          placeholder="Enter your task"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default TaskModal

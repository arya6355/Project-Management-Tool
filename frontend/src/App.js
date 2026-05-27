import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [dueDate, setDueDate] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {

    if (!title || !description || !project || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {

      await axios.post("http://localhost:5000/api/tasks", {
        title,
        description,
        project,
        dueDate,
        status: "Pending"
      });

      setTitle("");
      setDescription("");
      setProject("");
      setDueDate("");

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // COMPLETE TASK
  const completeTask = async (id) => {

    try {

      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        status: "Completed"
      });

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {

    try {

      await axios.delete(`http://localhost:5000/api/tasks/${id}`);

      fetchTasks();

    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div style={{
      backgroundColor: "#eef2f7",
      minHeight: "100vh",
      padding: "40px"
    }}>

      <h1 style={{
        textAlign: "center",
        fontSize: "50px",
        marginBottom: "40px"
      }}>
        <h1>
           Project Management Tool 🚀
          </h1>
           <p style={{ color: "#555" }}>
           Manage projects, deadlines and team tasks efficiently
</p>
      </h1>

      {/* FORM */}

      <div style={{
        width: "80%",
        margin: "auto",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 0 10px lightgray"
      }}>

        <input
          type="text"
          placeholder="Enter Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        <textarea
          placeholder="Enter Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            width: "100%",
            height: "120px",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        <input
          type="text"
          placeholder="Enter Project Name"
          value={project}
          onChange={(e) => setProject(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid gray"
          }}
        />

        <button
          onClick={addTask}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Add Task
        </button>

      </div>

      {/* TASKS */}

      <div style={{
        width: "80%",
        margin: "40px auto"
      }}>

        {tasks.map((task) => (

          <div
            key={task._id}
            style={{
              backgroundColor: "white",
              padding: "25px",
              marginBottom: "25px",
              borderRadius: "15px",
              boxShadow: "0 0 10px lightgray"
            }}
          >

            <h2>{task.title}</h2>

            <p>{task.description}</p>

            <p>
              <b>Project:</b> {task.project}
            </p>

            <p>
              <b>Deadline:</b> {task.dueDate}
            </p>

            <p>
              <b>Status:</b> {task.status}
            </p>

            <button
              onClick={() => completeTask(task._id)}
              style={{
                backgroundColor: "green",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                marginRight: "10px",
                cursor: "pointer"
              }}
            >
              Complete
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Delete
            </button>

          </div>

        ))}

      </div>
        <footer
  style={{
    textAlign: "center",
    marginTop: "30px",
    color: "#555",
  }}
>
  Built with React, Node.js, Express & MongoDB
</footer>

    </div>
  );
}

export default App;  
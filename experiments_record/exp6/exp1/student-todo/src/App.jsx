import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [start, setStart] = useState("");
  const [due, setDue] = useState("");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("studentTasks")) || [],
  );

  const [now, setNow] = useState(new Date());

  // Save tasks
  useEffect(() => {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Add task
  const addTask = () => {
    if (task.trim() === "" || start === "" || due === "") {
      alert("Enter task, start time and due time");
      return;
    }

    if (new Date(due) <= new Date(start)) {
      alert("Due time must be after start time");
      return;
    }

    const newTask = {
      text: task,
      start: start,
      due: due,
      completed: false,
      completion: "",
      timeTaken: "",
    };

    setTasks([...tasks, newTask]);

    setTask("");
    setStart("");
    setDue("");
  };

  // Complete task
  const completeTask = (index) => {
    const updatedTasks = [...tasks];

    if (!updatedTasks[index].completed) {
      const completionTime = new Date();

      const startTime = new Date(updatedTasks[index].start);

      const difference = completionTime.getTime() - startTime.getTime();

      updatedTasks[index].completed = true;

      updatedTasks[index].completion = completionTime.toLocaleString();

      updatedTasks[index].timeTaken = formatDuration(difference);
    } else {
      updatedTasks[index].completed = false;
      updatedTasks[index].completion = "";
      updatedTasks[index].timeTaken = "";
    }

    setTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Calculate status
  const getStatus = (item) => {
    if (item.completed) {
      return "Completed";
    }

    const startTime = new Date(item.start);
    const dueTime = new Date(item.due);

    if (now < startTime) {
      return "Pending";
    }

    if (now > dueTime) {
      return "Delayed";
    }

    return "Ongoing";
  };

  // Calculate progress
  const getProgress = (item) => {
    if (item.completed) {
      return 100;
    }

    const startTime = new Date(item.start).getTime();
    const dueTime = new Date(item.due).getTime();
    const currentTime = now.getTime();

    const total = dueTime - startTime;
    const elapsed = currentTime - startTime;

    let progress = (elapsed / total) * 100;

    if (progress < 0) progress = 0;
    if (progress > 100) progress = 100;

    return Math.round(progress);
  };

  // Time remaining
  const getRemaining = (item) => {
    if (item.completed) {
      return "Completed";
    }

    const dueTime = new Date(item.due).getTime();
    const difference = dueTime - now.getTime();

    if (difference < 0) {
      return "Time exceeded";
    }

    return formatDuration(difference) + " remaining";
  };

  // Format duration
  function formatDuration(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }

    return `${remainingMinutes}m`;
  }

  const activeTasks = tasks.filter((item) => !item.completed);

  const previousTasks = tasks.filter((item) => item.completed);

  return (
    <div className="app">
      <header>
        <h2>Student Task Assignment</h2>
        <p>📅 Task Planner</p>
      </header>

      <main>
        {/* Add Task */}
        <div className="add-box">
          <input
            type="text"
            placeholder="Assignment name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <input
            type="datetime-local"
            value={due}
            onChange={(e) => setDue(e.target.value)}
          />

          <button onClick={addTask}>+ Add Task</button>
        </div>

        {/* Current Tasks */}
        <h3>My Tasks</h3>

        {activeTasks.length === 0 && <p className="empty">No active tasks</p>}

        {activeTasks.map((item) => {
          const index = tasks.indexOf(item);
          const status = getStatus(item);
          const progress = getProgress(item);

          return (
            <div className={`task ${status.toLowerCase()}`} key={index}>
              <div className="task-top">
                <input type="checkbox" onChange={() => completeTask(index)} />

                <div className="task-info">
                  <strong>{item.text}</strong>

                  <small>Start: {new Date(item.start).toLocaleString()}</small>

                  <small>Due: {new Date(item.due).toLocaleString()}</small>
                </div>

                <span className="status">{status}</span>

                <button className="delete" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>

              <div className="progress-bg">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="task-bottom">
                <span>{progress}% complete</span>
                <span>{getRemaining(item)}</span>
              </div>
            </div>
          );
        })}

        {/* Previous Tasks */}
        <h3>Previous Tasks</h3>

        {previousTasks.length === 0 && (
          <p className="empty">No completed tasks</p>
        )}

        {previousTasks.map((item) => {
          const index = tasks.indexOf(item);

          return (
            <div className="task completed" key={index}>
              <div className="task-top">
                <input
                  type="checkbox"
                  checked
                  onChange={() => completeTask(index)}
                />

                <div className="task-info">
                  <strong>{item.text}</strong>

                  <small>
                    Started: {new Date(item.start).toLocaleString()}
                  </small>

                  <small>Completed: {item.completion}</small>

                </div>

                <span className="status">Completed</span>

                <button className="delete" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;

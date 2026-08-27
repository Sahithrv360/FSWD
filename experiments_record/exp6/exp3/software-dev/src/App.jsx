import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [start, setStart] = useState("");
  const [due, setDue] = useState("");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("devTasks")) || [],
  );

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("devTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addTask = () => {
    if (task.trim() === "" || start === "" || due === "") {
      alert("Enter task, start time and due time");
      return;
    }

    if (new Date(due) <= new Date(start)) {
      alert("Due time must be after start time");
      return;
    }

    setTasks([
      ...tasks,
      {
        text: task,
        start: start,
        due: due,
        completed: false,
        completion: "",
        timeTaken: "",
      },
    ]);

    setTask("");
    setStart("");
    setDue("");
  };

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

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const getStatus = (item) => {
    if (item.completed) return "Completed";

    const startTime = new Date(item.start);
    const dueTime = new Date(item.due);

    if (now < startTime) return "Pending";

    if (now > dueTime) return "Delayed";

    return "Ongoing";
  };

  const getProgress = (item) => {
    if (item.completed) return 100;

    const startTime = new Date(item.start).getTime();
    const dueTime = new Date(item.due).getTime();

    let progress = ((now.getTime() - startTime) / (dueTime - startTime)) * 100;

    if (progress < 0) progress = 0;
    if (progress > 100) progress = 100;

    return Math.round(progress);
  };

  const getRemaining = (item) => {
    if (item.completed) return "Completed";

    const difference = new Date(item.due).getTime() - now.getTime();

    if (difference < 0) {
      return "Time exceeded";
    }

    return formatDuration(difference) + " remaining";
  };

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
        <h2>Software Development Tasks</h2>
        <p>📅 Development Planner</p>
      </header>

      <main>
        <div className="add-box">
          <input
            type="text"
            placeholder="Add development task"
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

        <h3>Development Tasks</h3>

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

                  <small>Deadline: {new Date(item.due).toLocaleString()}</small>
                </div>

                <span className="status">{status}</span>

                <button className="delete" onClick={() => deleteTask(index)}>
                  Delete
                </button>
              </div>

              <div className="progress-bg">
                <div
                  className="progress"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>

              <div className="task-bottom">
                <span>{progress}% complete</span>

                <span>{getRemaining(item)}</span>
              </div>
            </div>
          );
        })}

        <h3>Previous Development Tasks</h3>

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

                  <small>Time Taken: {item.timeTaken}</small>
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

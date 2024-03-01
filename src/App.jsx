import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Typography,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      completed: false,
    };
    setTasks([newTask, ...tasks]); // Prepend the new task
    setNewTaskText("");
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    const taskToMove = updatedTasks.find((task) => task.id === id);
    if (taskToMove.completed) {
      setCompletedTasks([taskToMove, ...completedTasks]);
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    } else {
      const filteredCompletedTasks = completedTasks.filter(
        (task) => task.id !== id
      );
      setCompletedTasks(filteredCompletedTasks);
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    const filteredCompletedTasks = completedTasks.filter(
      (task) => task.id !== id
    );
    setTasks(filteredTasks);
    setCompletedTasks(filteredCompletedTasks);
  };

  const editTask = (id) => {
    setEditingTaskId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditedTaskText(taskToEdit.text);
  };

  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTaskId ? { ...task, text: editedTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTaskText("");
  };

  return (
    <Box
      sx={{
        p: 7,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#333",
        background: "#ffd3d4",
        gap: 4,
        position: "relative",
      }}
    >
      <div className="logo" />
      <Typography
        variant="h2"
        sx={{ fontFamily: "cursive", marginBottom: "20px" }}
      >
        TO DO LIST
      </Typography>
      <Box sx={{ width: "100%", maxWidth: 1000, textAlign: "center" }}>
        <form onSubmit={addTask} style={{ marginBottom: 24 }}>
          <Input
            width="200%"
            placeholder="  Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            sx={{
              borderRadius: 20,
              bgcolor: "#fff",
              fontFamily: "cursive",
              "&::placeholder": {
                fontStyle: "italic",
              },
              "&:focus": {
                outline: "none",
                border: "none",
              },
              "&.MuiInput-underline:before": {
                borderBottom: "none",
              },
              "&.MuiInput-underline:after": {
                borderBottom: "none",
              },
              marginTop: "20px",
              marginBottom: "10px",
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 20,
              bgcolor: "#FFC0CB",
              color: "#fff",
              fontFamily: "cursive",
              marginLeft: 2,
            }}
          >
            Add Task
          </Button>
        </form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FFB6C1",
              padding: "20px",
              borderRadius: 20,
              boxShadow: "0px 14px 4px rgba(0, 0, 0, 0.2)",
              width: "48%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: "cursive", marginBottom: "20px" }}
            >
              DO
            </Typography>
            {tasks.map((task) => (
              <Box
                key={task.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                  bgcolor: "#f7daec",
                  borderRadius: 20,
                  fontFamily: "cursive",
                  width: "100%", // Ensure consistent width for each task
                  justifyContent: "space-between",
                  paddingLeft: "1px",
                  marginBottom: "8px", // Adjust the margin between tasks
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexGrow: 1,
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTaskCompleted(task.id)}
                    sx={{ mr: 2 }}
                  />
                  {editingTaskId === task.id ? (
                    <Input
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEditedTask();
                        }
                      }}
                      sx={{
                        textAlignLast: "center",
                        width: "86%",
                        marginLeft: "7px",
                        bgcolor: "#a698a1",
                        borderRadius: 7,
                        fontFamily: "cursive",
                        "&::placeholder": {
                          fontStyle: "italic",
                        },
                        "&:focus": {
                          outline: "none",
                          border: "none",
                        },
                        "&.MuiInput-underline:before": {
                          borderBottom: "none",
                        },
                        "&.MuiInput-underline:after": {
                          borderBottom: "none",
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      sx={{
                        flexGrow: 1,
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.text}
                    </Typography>
                  )}
                </div>
                <div>
                  {!task.completed && (
                    <IconButton
                      onClick={() => {
                        if (editingTaskId === task.id) {
                          saveEditedTask();
                        } else {
                          editTask(task.id);
                        }
                      }}
                      sx={{ mr: 1 }}
                    >
                      {editingTaskId === task.id ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                  )}
                  <IconButton onClick={() => deleteTask(task.id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFCCCC",
              padding: "20px",
              borderRadius: 20,
              boxShadow: "0px 14px 4px rgba(0, 0, 0, 0.2)",
              width: "48%",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontFamily: "cursive", marginBottom: "20px" }}
            >
              DONE
            </Typography>
            {completedTasks.map((task) => (
              <Typography
                key={task.id}
                sx={{
                  textDecoration: "line-through",
                  color: "#666",
                }}
              >
                {task.text}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;

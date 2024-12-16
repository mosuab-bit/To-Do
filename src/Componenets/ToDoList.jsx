import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToDo from "./ToDo";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "../Contexts/ToastContext";

// DIALOG IMPORT
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ToDoList() {
  const [taskName, setTaskName] = useState("");
  const [filter, setFilter] = useState("all");
  const [todos, setToDos] = useState([]);
  const showHideToast = useToast();

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setToDos(storageTodos);
  }, []);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [DialogTodo, setDialogTodo] = useState({ title: "", details: "" });

  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  function handleInputChange(event) {
    setTaskName(event.target.value);
  }
  function handleAddClick() {
    if (taskName.trim() === "") return;

    const newElement = {
      id: uuidv4(),
      title: taskName,
      details: "",
      isCompleted: false,
    };

    const updatedTodo = [...todos, newElement];
    setToDos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setTaskName("");
    showHideToast("Added successfully");
  }

  function handleTodoFilter(e) {
    setFilter(e.target.value);
  }

  function handleCloseDeleteDialog() {
    setShowDeleteDialog(false);
  }
  const filteredTodos = useMemo(() => {
    return filter === "completed"
      ? todos.filter((t) => t.isCompleted)
      : filter === "uncompleted"
      ? todos.filter((t) => !t.isCompleted)
      : todos;
  }, [todos, filter]);

  function OpenDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteTask() {
    const newTodos = todos.filter((t) => {
      return t.id != DialogTodo.id;
    });

    setToDos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setShowDeleteDialog(false);
    showHideToast("it's deleted successfully");
  }
  function handleCheck(id) {
    const updatetedElement = todos.map((t) => {
      if (t.id == id) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });

    setToDos(updatetedElement);
    localStorage.setItem("todos", JSON.stringify(updatetedElement));
    showHideToast("it's updated successfully");
  }

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleUdateDialog() {
    const updatedTodo = todos.map((t) => {
      if (t.id == DialogTodo.id) {
        return { ...t, title: DialogTodo.title, details: DialogTodo.details };
      }
      return t;
    });

    setToDos(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    setShowUpdateDialog(false);
    showHideToast("it's updated successfully");
  }

  function handleTitleChange(e) {
    setDialogTodo({ ...DialogTodo, title: e.target.value });
  }
  function handleDetailsChange(e) {
    setDialogTodo({ ...DialogTodo, details: e.target.value });
  }

  function handleCancelUpdateDialog() {
    setShowUpdateDialog(false);
  }
  const todosJsx = filteredTodos.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        handleCheck={handleCheck}
        showDelete={OpenDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      {/* Delete Task Dialog */}
      <Dialog
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are You Sure You Want To Delete This Task ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you want to delete it, you cannot recover it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Close</Button>
          <Button autoFocus onClick={handleDeleteTask}>
            OK, Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* === Delete Task Dialog === */}

      {/* UPDATE TASK DIALOG */}
      <Dialog open={showUpdateDialog}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={DialogTodo.title}
            onChange={handleTitleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="details"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            value={DialogTodo.details}
            onChange={handleDetailsChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelUpdateDialog}>Cancel</Button>
          <Button onClick={handleUdateDialog}>Update</Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE TASK DIALOG === */}

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent>
            <Typography
              style={{ textAlign: "center", fontFamily: "cursive" }}
              variant="h2"
            >
              My To Do List
            </Typography>

            <Divider />

            {/* TOOGLE BUTTON GROUP */}
            <ToggleButtonGroup
              value={filter}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
              }}
              aria-label="text alignment"
              // exclusive
              onChange={handleTodoFilter}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="uncompleted">Uncompleted</ToggleButton>
            </ToggleButtonGroup>
            {/* === TOOGLE BUTTON GROUP === */}

            {todosJsx}

            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid
                xs={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  id="outlined-basic"
                  label="Task Name"
                  value={taskName}
                  onChange={handleInputChange}
                  variant="outlined"
                  style={{
                    width: "300px",
                  }}
                />
              </Grid>
              <Grid
                xs={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  style={{
                    width: "200px",
                    height: "100%",
                  }}
                  onClick={handleAddClick}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

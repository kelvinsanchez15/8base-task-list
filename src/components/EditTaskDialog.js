import React from "react";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
} from "@material-ui/core";
import {
  LibraryAddCheck as LibraryAddCheckIcon,
  FaceOutlined as FaceOutlinedIcon,
  Edit as EditIcon,
} from "@material-ui/icons";
import { useMutation } from "react-apollo";
import { DELETE_TASK_MUTATION, UPDATE_TASK_MUTATION } from "../shared/graphql";

export default function EditTaskDialog({ task, refetchTasks }) {
  const [taskInput, setTaskInput] = React.useState({
    id: task.id,
    title: task.title,
    assignee: task.assignee || "",
  });
  const [open, setOpen] = React.useState(false);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    handleClose();
    await deleteTask({ variables: { id } });
    refetchTasks();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    await updateTask({ variables: taskInput });
    refetchTasks();
  };

  return (
    <div>
      <IconButton edge="end" aria-label="update" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
            <Button
              onClick={() => handleDelete(taskInput.id)}
              color="secondary"
              variant="outlined"
              style={{ marginRight: "24px" }}
              tabIndex={-1}
            >
              Delete
            </Button>
          </div>

          <DialogContent>
            <TextField
              id="description"
              margin="dense"
              name="description"
              label="Description"
              placeholder="Enter a task description"
              fullWidth
              variant="outlined"
              color="primary"
              value={taskInput.title}
              onChange={(e) =>
                setTaskInput({ ...taskInput, title: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents>
                    <LibraryAddCheckIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="Assignee"
              margin="dense"
              name="Assignee"
              label="Assignee"
              placeholder="Assign task"
              fullWidth
              variant="outlined"
              color="primary"
              value={taskInput.assignee}
              onChange={(e) =>
                setTaskInput({ ...taskInput, assignee: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" disablePointerEvents>
                    <FaceOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" aria-label="update task" color="primary">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

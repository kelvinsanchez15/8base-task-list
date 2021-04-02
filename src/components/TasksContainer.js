import { useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { TASK_LIST_QUERY, CREATE_TASK_MUTATION } from "../shared/graphql";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import {
  Send as SendIcon,
  LibraryAddCheckOutlined as LibraryAddCheckIcon,
  FaceOutlined as FaceOutlinedIcon,
} from "@material-ui/icons";
import Tasks from "./Tasks";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
  },
  inputs: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "initial",
    },
  },
  sendButton: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export default function TaskContainer() {
  const initialState = { title: "", assignee: "" };
  const classes = useStyles();
  const [taskInput, setTaskInput] = useState(initialState);

  const {
    loading: loadingTasks,
    data: tasks,
    refetch: refetchTasks,
  } = useQuery(TASK_LIST_QUERY);

  const [createTask] = useMutation(CREATE_TASK_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTaskInput(initialState);
    await createTask({ variables: { data: taskInput } });
    refetchTasks();
  };

  return (
    <Container maxWidth="md" component="main">
      <div className={classes.paper}>
        <form onSubmit={handleSubmit} className={classes.inputs}>
          <TextField
            id="description"
            margin="dense"
            name="description"
            label="Description"
            placeholder="Enter a new task"
            autoComplete="off"
            fullWidth
            variant="outlined"
            color="primary"
            disabled={loadingTasks}
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
            autoComplete="off"
            variant="outlined"
            color="primary"
            disabled={loadingTasks}
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
          <div>
            <Button
              endIcon={<SendIcon />}
              type="submit"
              aria-label="submit task"
              color="primary"
              variant="contained"
              disabled={loadingTasks}
              className={classes.sendButton}
            >
              Send
            </Button>
          </div>
        </form>
        <Tasks
          tasks={tasks}
          loadingTasks={loadingTasks}
          refetchTasks={refetchTasks}
        />
      </div>
    </Container>
  );
}

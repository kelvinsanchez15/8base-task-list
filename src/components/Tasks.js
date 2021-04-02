import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Typography,
  Chip,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Edit as EditIcon, Face as FaceIcon } from "@material-ui/icons";
import { formatRelative } from "date-fns";
import EditTaskDialog from "./EditTaskDialog";

export default function Tasks({ tasks, loadingTasks, refetchTasks }) {
  // Custom Cloud function to toggle task completation
  const handleToggle = async (id, completed) => {
    const UPDATE_COMPLETED_TASK_WEBHOOK_API_ENDPOINT = `https://api.8base.com/ckmv2a2xk00gu07la2q8g0p9s/webhook/tasks/${id}`;
    await fetch(UPDATE_COMPLETED_TASK_WEBHOOK_API_ENDPOINT, {
      method: "PUT",
      body: JSON.stringify({ completed: !completed }),
    });
    refetchTasks();
  };

  if (loadingTasks) {
    return (
      <List>
        {Array.from(new Array(8)).map((e, i) => (
          <ListItem key={i} dense button divider>
            <ListItemIcon>
              <Checkbox edge="start" disabled />
            </ListItemIcon>

            <ListItemText disableTypography>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                <Skeleton />
              </Typography>

              <Typography variant="body1" display="block">
                <Skeleton />
              </Typography>

              <Skeleton width="20%" height={30} />
            </ListItemText>

            <ListItemSecondaryAction>
              <IconButton edge="end" disabled>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }

  return (
    <List>
      {tasks?.tasksList.items.map((task, index) => {
        return (
          <ListItem
            key={task.id}
            role={undefined}
            dense
            button
            divider
            onClick={() => handleToggle(task.id, task.completed)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.completed}
                disableRipple
                tabIndex={-1}
              />
            </ListItemIcon>

            <ListItemText id={task.id} disableTypography>
              <Typography
                variant="caption"
                color="textSecondary"
                display="block"
              >
                {task.createdAt
                  ? formatRelative(new Date(task.createdAt), new Date(), {
                      addSuffix: true,
                    })
                  : "today at"}
              </Typography>

              <Typography variant="body1" display="block" gutterBottom>
                {task.title}
              </Typography>
              <Chip
                label={task.assignee || "Unassigned"}
                size="small"
                color="secondary"
                icon={<FaceIcon />}
              />
            </ListItemText>

            <ListItemSecondaryAction>
              <EditTaskDialog task={task} refetchTasks={refetchTasks} />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

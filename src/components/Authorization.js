import { useEffect } from "react";
import { useAuth } from "8base-react-sdk";
import { withApollo } from "react-apollo";
import { CURRENT_USER_QUERY, USER_SIGN_UP_MUTATION } from "../shared/graphql";
import { Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TasksContainer from "./TasksContainer";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(3),
  },
}));

const authProfileId = process.env.REACT_APP_PROFILE_ID;

function Authorization({ client }) {
  const classes = useStyles();
  const auth = useAuth();
  const shouldProcessAuthorizationResult =
    !auth.isAuthorized && document.location.hash.includes("access_token");

  useEffect(() => {
    const processAuthorizationResult = async () => {
      const { idToken, email } = await auth.authClient.getAuthorizedData();

      const context = { headers: { authorization: `Bearer ${idToken}` } };

      // Check if user exists, if not it'll return an error
      await client
        .query({
          query: CURRENT_USER_QUERY,
          context,
        })
        // If user is not found - sign them up
        .catch(() =>
          client.mutate({
            mutation: USER_SIGN_UP_MUTATION,
            variables: {
              user: { email },
              authProfileId,
            },
            context,
          })
        );

      // After succesfull signup store token in local storage
      // After that token will be added to a request headers automatically
      auth.authClient.setState({
        token: idToken,
      });
    };

    if (shouldProcessAuthorizationResult) {
      processAuthorizationResult();
    }
  }, [shouldProcessAuthorizationResult, auth, client]);

  if (auth.isAuthorized) {
    return <TasksContainer />;
  }

  const authorize = () => {
    auth.authClient.authorize();
  };

  // Check if we didn't return from cognito
  if (!document.location.hash.includes("access_token")) {
    return (
      <div>
        <Typography variant="h5" gutterBottom>
          Hello guest!
        </Typography>
        <Typography variant="body2">
          This is a private Task List Web Application, Sign in now to start
          using it.
        </Typography>
        <Button
          className={classes.button}
          onClick={authorize}
          variant="contained"
          color="primary"
        >
          Sign in
        </Button>
      </div>
    );
  }

  return <p>Authorizing...</p>;
}

export default withApollo(Authorization);

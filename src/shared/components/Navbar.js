import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, Link } from "@material-ui/core";
import { useAuth } from "8base-react-sdk";
import { withApollo } from "react-apollo";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function Navbar({ client }) {
  const classes = useStyles();
  const auth = useAuth();
  const handleSignIn = () => auth.authClient.authorize();
  const handleLogout = async () => {
    await client.clearStore();
    auth.authClient.logout();
  };

  return (
    <nav>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Link className={classes.title} href="/" color="inherit">
            <Typography variant="h6">Task List</Typography>
          </Link>

          {!auth.isAuthorized ? (
            <>
              <Button
                className={classes.navItem}
                onClick={handleSignIn}
                variant="contained"
                color="primary"
              >
                Sign in
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleLogout} variant="outlined" color="default">
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </nav>
  );
}

export default withApollo(Navbar);

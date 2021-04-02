import { AppProvider } from "8base-react-sdk";
import authClient from "../src/shared/auth";
import Navbar from "./shared/components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Container } from "@material-ui/core";
import Authorization from "./components/Authorization";

const { REACT_APP_8BASE_API_ENDPOINT } = process.env;

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <AppProvider uri={REACT_APP_8BASE_API_ENDPOINT} authClient={authClient}>
      {({ loading }) => {
        return (
          <>
            <Navbar />
            <Container className={classes.container}>
              {loading ? <CircularProgress /> : <Authorization />}
            </Container>
          </>
        );
      }}
    </AppProvider>
  );
};

export default App;

import React from "react";
import "./App.css";

import MenuTop from "./components/MenuTop";
import LoginForm from "./components/LoginForm";
import Container from "@material-ui/core/Container";

/* const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const classes = useStyles(); */

class App extends React.Component {
  state = {
    username: "",
    logged: false,
  };

  handleLogged() {
    this.setState({
      logged: true,
    });
  }

  render() {
    return (
      <>
        <MenuTop logged={this.state.logged == true ? true : false} />

        <Container maxWidth="sm">
          {this.state.logged == false ? (
            <LoginForm handleLogged={this.handleLogged.bind(this)} />
          ) : (
            <></>
          )}
        </Container>
      </>
    );
  }
}

export default App;

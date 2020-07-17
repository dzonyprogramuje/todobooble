import React from "react";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";

import MenuTop from "./components/MenuTop";
import LoginForm from "./components/LoginForm";
import Container from "@material-ui/core/Container";
import CardComponent from "./components/CardComponent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

// const useStyles = makeStyles((theme) => ({
//   main: {
//     backgroundColor: "#e8eaf6"
//   },
// }));
// const classes = useStyles();

class App extends React.Component {
  state = {
    username: "",
    logged: false,
    tasks: [
      {
        id: 0,
        kind: "Pryawtne",
        description: "Umyc w koncu samochod i zawoskowac.!!!",
        date: "Lipiec 01, 2020",
        done: false,
        liked: true,
        deleted: false,
      },
      {
        id: 1,
        kind: "Sport",
        description: "Na rower z tata 01.08.2020 o 16:30",
        date: "Lipiec 01, 2020",
        done: false,
        liked: false,
        deleted: false,
      },
      {
        id: 2,
        kind: "Praca",
        description:
          "Przygotowac dokumenty dla nowych pracownikow i zlozyc wypowiedzenie xd",
        date: "Lipiec 04, 2020",
        done: false,
        liked: false,
        deleted: false,
      },
      {
        id: 3,
        kind: "Rozrywka",
        description:
          "Wplaci zaliczke za wczasy i wydrukowac wszystkie dokumenty",
        date: "Lipiec 08, 2020",
        done: false,
        liked: true,
        deleted: false,
      },
    ],
  };

  handleLogged() {
    this.setState({
      logged: !this.state.logged,
    });
  }

  handleDeleteTask(id) {
    this.setState((prevState) => {
      const result = prevState.tasks;

      result[id].deleted = true;

      return {
        tasks: result,
      };
    });
    this.setState();
  }

  // Dorobic funkcje usuwania taska + funkcje ktora bedzie do edycji taskow
  // handleDeleteTask( id) {
  //   this.setState(prevState => {
  //     tasks[1].deleted: false
  //   });
  // }

  render() {
    return (
      <>
        <MenuTop
          logged={this.state.logged == true ? true : false}
          handleLogged={this.handleLogged.bind(this)}
        />

        <Container>
          {this.state.logged == false ? (
            <LoginForm handleLogged={this.handleLogged.bind(this)} />
          ) : (
            <>
              <CardComponent
                tasks={this.state.tasks}
                handleDeleteTask={(id) => this.handleDeleteTask(id)}
                // deleteTask={this.handleDeleteTask}
              />
            </>
          )}
        </Container>
      </>
    );
  }
}

export default App;

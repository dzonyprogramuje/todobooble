import React from "react";
import "./App.css";

import MenuTop from "./components/MenuTop";
import LoginForm from "./components/LoginForm";
import Container from "@material-ui/core/Container";
import CardComponent from "./components/CardComponent";
import CardDoneComponent from "./components/CardDoneComponent";
import EditTaskComponent from "./components/EditTaskComponent";
import UserComponent from "./components/UserComponent";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class App extends React.Component {
  state = {
    username: "admin",
    name: "Patryk",
    logged: false,
    newTaskOppened: false,
    editTask: undefined,
    user: false,
    tasks: [
      // {
      //   id: 0,
      //   kind: "Prywatne",
      //   description: "Umyc w koncu samochod i zawoskowac.!!!",
      //   date: "Lipiec 01, 2020",
      //   done: false,
      //   liked: true,
      //   deleted: false,
      // },
      // {
      //   id: 1,
      //   kind: "Sport",
      //   description: "Na rower z tata 01.08.2020 o 16:30",
      //   date: "Lipiec 01, 2020",
      //   done: false,
      //   liked: false,
      //   deleted: false,
      // },
      // {
      //   id: 2,
      //   kind: "Praca",
      //   description:
      //     "Przygotowac dokumenty dla nowych pracownikow i zlozyc wypowiedzenie xd",
      //   date: "Lipiec 04, 2020",
      //   done: false,
      //   liked: false,
      //   deleted: false,
      // },
      // {
      //   id: 3,
      //   kind: "Rozrywka",
      //   description:
      //     "Wplaci zaliczke za wczasy i wydrukowac wszystkie dokumenty",
      //   date: "Lipiec 08, 2020",
      //   done: false,
      //   liked: true,
      //   deleted: false,
      // },
    ],
  };

  handleLogged() {
    this.setState({
      logged: !this.state.logged,
    });
  }

  handleNewTask = () => {
    this.setState({
      newTaskOppened: !this.state.newTaskOppened,
    });
  };

  handleAddNewTask = (task) => {
    let table = this.state.tasks;
    table.push(task);

    this.setState({
      tasks: table,
    });
  };

  handleTaskStatus(id, kind) {
    // Przypisz do zmiennej poprzedniego state.task
    const result = this.state.tasks;

    if (kind === "delete") {
      result[id].deleted = !result[id].deleted;
    }

    if (kind === "edit") {
      this.setState({
        editTask: this.state.tasks[id],
      });
    }

    if (kind === "like") {
      result[id].liked = !result[id].liked;
    }

    if (kind === "done") {
      result[id].done = !result[id].done;
    }

    // Aktualizacja state
    this.setState({
      tasks: result,
    });
  }

  handleEditTask = () => {
    this.setState({
      editTask: undefined,
    });
  };

  handleEditTaskSave = (task) => {
    let tempTask = this.state.tasks;
    tempTask[task.id] = task;

    this.setState({
      tasks: tempTask,
    });
  };

  handleUser() {
    this.setState({
      user: !this.state.user,
    });
  }

  render() {
    return (
      <>
        <Router>
          <MenuTop
            logged={this.state.logged === true ? true : false}
            handleLogged={this.handleLogged.bind(this)}
            open={this.state.newTaskOppened}
            handleNewTask={this.handleNewTask.bind(this)}
            handleAddNewTask={this.handleAddNewTask.bind(this)}
            tasks={this.state.tasks}
            name={this.state.name}
            user={this.state.user}
            handleUser={this.handleUser.bind(this)}
          />

          <Container>
            {this.state.logged === false ? (
              <LoginForm handleLogged={this.handleLogged.bind(this)} />
            ) : (
              <>
                <Switch>
                  <Route path="/" exact>
                    <CardComponent
                      tasks={this.state.tasks}
                      handleTaskStatus={(id, kind) => {
                        this.handleTaskStatus(id, kind);
                      }}
                    />
                  </Route>
                  <Route path="/done">
                    <CardDoneComponent
                      tasks={this.state.tasks}
                      handleTaskStatus={(id, kind) => {
                        this.handleTaskStatus(id, kind);
                      }}
                    />
                  </Route>
                </Switch>
              </>
            )}

            {this.state.editTask ? (
              <EditTaskComponent
                task={this.state.editTask}
                handleEditTask={this.handleEditTask}
                handleEditTaskSave={this.handleEditTaskSave.bind(this)}
              />
            ) : (
              <></>
            )}

            {this.state.user ? (
              <UserComponent
                username={this.state.username}
                name={this.state.name}
                handleUser={this.handleUser.bind(this)}
              />
            ) : (
              <></>
            )}
          </Container>
        </Router>
      </>
    );
  }
}

export default App;

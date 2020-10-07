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

import axios from "axios";

const adress = "http://localhost:5000";

class App extends React.Component {
  state = {
    logged: false,
    loggedUser: "",
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
    tasksMongo: [],
  };

  handleLoggedUser = (username) => {
    this.setState({
      loggedUser: username,
      logged: true,
    });
    console.log(username);
  };

  handleNewTask = () => {
    this.setState({
      newTaskOppened: !this.state.newTaskOppened,
    });
  };

  downloadTasks = () => {
    axios
      .post(`${adress}/tasks/all`, {
        username: this.state.loggedUser,
      })
      .then((res) => {
        this.taskInit(res.data);
      });
  };

  handleAddNewTask = (newTask) => {
    let table = this.state.tasks;

    axios.post(`${adress}/tasks/new`, newTask).then((res) => {
      this.downloadTasks();
    });
  };

  handleTaskStatus(id, kind) {
    // Przypisz do zmiennej poprzedniego state.task
    const result = this.state.tasks;

    if (kind === "delete") {
      // result[id].deleted = !result[id].deleted;
      axios.post(`${adress}/tasks/delete`, { id: id }).then((res) => {
        this.downloadTasks();
      });
    }

    if (kind === "edit") {
      this.setState({
        editTask: this.state.tasks[id],
      });
    }

    // LIKE I DELETE- TRZEBA DOROBIC; NAJLEPIEJ WRZUCIC DO FUNKCJI EDIT
    if (kind === "like") {
      // result[id].liked = !result[id].liked;

      let tempTask = undefined;
      this.state.tasks.map((task) => {
        if (task._id == id) {
          tempTask = task;
        }
      });

      axios
        .post(`${adress}/tasks/update`, {
          _id: tempTask._id,
          done: tempTask.done,
          liked: !tempTask.liked,
          kind: tempTask.kind,
          description: tempTask.description,
        })
        .then((res) => {
          this.downloadTasks();
        });
    }

    if (kind === "done") {
      // result[id].done = !result[id].done;
      let tempTask = undefined;
      this.state.tasks.map((task) => {
        if (task._id == id) {
          tempTask = task;
        }
      });

      axios
        .post(`${adress}/tasks/update`, {
          _id: tempTask._id,
          done: !tempTask.done,
          kind: tempTask.kind,
          description: tempTask.description,
        })
        .then((res) => {
          this.downloadTasks();
        });
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

  // Edycja Taska z komponentu EditTaskComponent
  handleEditTaskSave = (task) => {
    // let tempTasks = this.state.tasks;
    // tempTasks[task.id] = task;

    // this.setState({
    //   tasks: tempTask,
    // });

    axios
      .post(`${adress}/tasks/update`, {
        _id: task._id,
        kind: task.kind,
        description: task.description,
        done: task.done,
        liked: task.liked,
      })
      .then((res) => {
        this.downloadTasks();
      });
  };

  handleUser() {
    this.setState({
      user: !this.state.user,
    });
  }

  taskInit = (tasks) => {
    this.setState({
      tasks: tasks,
    });
  };

  render() {
    return (
      <>
        <Router>
          <MenuTop
            logged={this.state.logged === true ? true : false}
            // handleLogged={this.handleLogged.bind(this)}
            loggedUser={this.state.loggedUser}
            open={this.state.newTaskOppened}
            handleNewTask={this.handleNewTask.bind(this)}
            handleAddNewTask={this.handleAddNewTask.bind(this)}
            tasks={this.state.tasks}
            user={this.state.user}
            handleUser={this.handleUser.bind(this)}
          />

          <Container>
            {this.state.logged === false ? (
              <LoginForm
                handleLoggedUser={this.handleLoggedUser.bind(this)}
                downloadTasks={this.downloadTasks}
                adress={adress}
              />
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

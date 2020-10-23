import React from "react";
import "./App.css";

import MenuTop from "./components/MenuTop";
import LoginForm from "./components/LoginForm";
import Container from "@material-ui/core/Container";
import CardComponent from "./components/CardComponent";
import CardDoneComponent from "./components/CardDoneComponent";
import EditTaskComponent from "./components/EditTaskComponent";
import UserComponent from "./components/UserComponent";
import AlertComponent from "./components/AlertComponent";
import NewsComponent from "./components/NewsComponent";
import SimpleListComponent from './components/SimpleListComponent';

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import axios from "axios";

import { adress, lat, lon, adressNews, keyWeather, adressWeather, adressExchangeRate_PLN, adressExchangeRate_USD } from './hidden.js';

class App extends React.Component {

  state = {
    selectedFile: null,
    palette: 'dark',
    logged: false,
    loggedUser: "",
    newTaskOppened: false,
    editTask: undefined,
    user: false,
    alert: undefined,
    alertStatus: "",
    alertOppened: false,
    tasks: [],
    simpleTasks: [],
    news: [],

    exchangeRate: {
      PLN: "",
      USD: "",
    },
    weather: {
      coord: {
        lat: 25.066668,
        lon: 34.900002,
      },
      main: {
        temp: null,
        pressure: null,
      },
      name: "",
      wind: {
        deg: null,
        speed: 2.1
      }
    }
  };

  theme = createMuiTheme({

    palette: {
      type: 'dark',
      primary: {
        main: '#BC4AC9',
      },
      secondary: {
        main: '#e6498e',
      },
    },
    shape: {
      borderRadius: '0'
    },
    typography: {
      button: {
        fontWeight: 400,
        fontSize: "0.75rem",
      }
    },


  });

  paletteSwitch = (value) => {

    this.setState({
      palette: value,
    });

    if (value === 'dark') {
      this.theme = createMuiTheme({
        palette: {
          type: 'dark',
          primary: {
            main: '#906dd2',
          },
          secondary: {
            main: '#e6498e',
          },
        },
        shape: {
          borderRadius: '0'
        },
        typography: {
          button: {
            fontWeight: 400,
            fontSize: "0.75rem",
          }
        }
      });
    } else {
      this.theme = createMuiTheme({
        palette: {
          type: 'light',
          primary: {
            main: '#0256ee',
          },
          secondary: {
            main: '#ff295e',
          },
          background: {
            default: '#f5f5f5'
          },
        },
        shape: {
          borderRadius: '0'
        },
        typography: {
          button: {
            fontWeight: 400,
            fontSize: "0.75rem",
          }
        },
      });
    }
  }

  handleSimpleList = (task) => {
    let newTask = {
      username: this.state.loggedUser,
      description: task
    };
    axios.post(`${adress}/simpletasks/new`, newTask).then((res) => {
      this.downloadTasks();
    });
  }

  deleteSimpleTask = (id) => {
    axios.post(`${adress}/simpletasks/delete`, { _id: id }).then((res) => {
      this.downloadTasks();
    });
  }

  apiNews = () => {
    axios.get(adressNews).then((res) => {
      this.setState({
        news: res.data.articles,
      });
    });
  };

  async apiWeather() {
    await axios.get(adressWeather).then((res) => {
      const prefix = res.data;

      this.setState({
        weather: {

          coor: {
            lat: null,
            lon: null,
          },

          main: {
            temp: prefix.main.temp,
            pressure: null,
          },
          name: prefix.name,
          rain: prefix.rain,
          snow: prefix.snow,
          icon: prefix.weather[0].icon,
          wind: {
            deg: prefix.wind.deg,
            speed: prefix.wind.speed
          }
        }
      });
    });

  };

  async exchange() {

    await axios.get(adressExchangeRate_PLN).then((res) => {
      this.setState({
        exchangeRate: {
          PLN: res.data.rates.PLN,
        }
      });
    });

    await axios.get(adressExchangeRate_USD).then((res) => {
      this.setState(prevState => {
        return {
          exchangeRate: {
            PLN: prevState.exchangeRate.PLN,
            USD: res.data.rates.PLN,
          }
        }
      });

    });

  }

  handleAlert = (status, message) => {
    this.setState({
      alert: message,
      alertStatus: status,
      alertOppened: true,
    });
  };

  alertClose = () => {
    this.setState({
      alertOppened: undefined,
    });
  };

  handleLoggedUser = (username) => {
    this.setState({
      loggedUser: username,
      logged: true,
    });
    this.apiWeather();
    this.exchange();
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

    axios
      .post(`${adress}/simpletasks/all`, {
        username: this.state.loggedUser,
      })
      .then((res) => {
        this.simpleTaskInit(res.data);
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
    // const result = this.state.tasks;

    let tempTask = undefined;
    this.state.tasks.map((task) => {
      if (task._id == id) {
        tempTask = task;
      }
    });

    if (kind === "delete") {
      // result[id].deleted = !result[id].deleted;
      axios.post(`${adress}/tasks/delete`, { _id: id }).then((res) => {
        this.downloadTasks();
      });
    }

    //Trzeva na podstawie _id zrobic id
    if (kind === "edit") {
      let tempTask = undefined;
      this.state.tasks.map((task) => {
        if (task._id == id) {
          tempTask = task;
        }
      });

      this.setState({
        editTask: tempTask,
      });

      tempTask = undefined;
    }

    // LIKE I DELETE- TRZEBA DOROBIC; NAJLEPIEJ WRZUCIC DO FUNKCJI EDIT
    if (kind === "like") {
      // result[id].liked = !result[id].liked;

      axios
        .post(`${adress}/tasks/update`, {
          _id: tempTask._id,
          done: tempTask.done,
          liked: !tempTask.liked,
          kind: tempTask.kind,
          description: tempTask.description,
          date: tempTask.date,
        })
        .then((res) => {
          this.downloadTasks();
        });
    }

    if (kind === "done") {
      // result[id].done = !result[id].done;

      axios
        .post(`${adress}/tasks/update`, {
          _id: tempTask._id,
          done: !tempTask.done,
          kind: tempTask.kind,
          description: tempTask.description,
          liked: tempTask.liked,
          date: tempTask.date,
        })
        .then((res) => {
          this.downloadTasks();
        });
    }

    // Aktualizacja state
    // this.setState({
    //   tasks: result,
    // });
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
        date: task.date,
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
    // localStorage.setItem('memory', JSON.stringify(this.state));
  };

  simpleTaskInit = (tasks) => {
    this.setState({
      simpleTasks: tasks,
    });

  };

  handleLogged = () => {
    this.setState({
      logged: false,
      loggedUser: undefined,
      tasks: [],
      simpleTasks: []
    });
    localStorage.removeItem('memory');
  };


  componentDidMount() {
    if (localStorage.getItem('memory') != null) {
      this.setState(
        JSON.parse(localStorage.getItem('memory'))
      );
    }
  }

  componentDidUpdate() {
    if (this.state.logged !== false) {
      localStorage.setItem('memory', JSON.stringify(this.state));
    } else {

    }

  }



  // fileSelectedHandler = e => {
  //   this.setState({
  //     selectedFile: event.target.files[0]
  //   });
  // }


  // fileUploadHandler = () =>{
  //   axios.post('');
  // }




  render() {
    return (
      <>
        <ThemeProvider theme={this.theme}>
          <CssBaseline />
          <Router>
            <MenuTop
              downloadTasks={this.downloadTasks}
              logged={this.state.logged === true ? true : false}
              handleLogged={this.handleLogged}
              loggedUser={this.state.loggedUser}
              open={this.state.newTaskOppened}
              handleNewTask={this.handleNewTask.bind(this)}
              handleAddNewTask={this.handleAddNewTask.bind(this)}
              tasks={this.state.tasks}
              user={this.state.user}
              handleUser={this.handleUser.bind(this)}
              weather={this.state.weather}
              pln={this.state.exchangeRate.PLN}
              usd={this.state.exchangeRate.USD}
              news={this.apiNews}
            />
            <AlertComponent
              alert={this.state.alert}
              alertStatus={this.state.alertStatus}
              alertOppened={this.state.alertOppened}
              alertClose={this.alertClose.bind(this)}
            />
            <Container>
              {/* <input type='file' onChange={this.fileSelectedHandler} />
              <button onClick={this.fileUploadHandler}></button> */}
              {this.state.logged === false ? (
                <LoginForm
                  handleLoggedUser={this.handleLoggedUser.bind(this)}
                  downloadTasks={this.downloadTasks}
                  adress={adress}
                  handleAlert={this.handleAlert.bind(this)}
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
                          handleNewTask={this.handleNewTask.bind(this)}
                        />
                      </Route>
                      <Route path="/done">
                        <CardDoneComponent
                          tasks={this.state.tasks}
                          handleTaskStatus={(id, kind) => {
                            this.handleTaskStatus(id, kind);
                          }}
                          handleNewTask={this.handleNewTask.bind(this)}
                        />
                      </Route>
                      <Route path="/news">
                        <NewsComponent news={this.state.news} />
                      </Route>

                      <Route path="/simple">
                        <SimpleListComponent deleteSimpleTask={this.deleteSimpleTask.bind(this)} handleSimpleList={this.handleSimpleList.bind(this)} simpleTasks={this.state.simpleTasks} />
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
                  username={this.state.loggedUser}
                  name={this.state.name}
                  handleUser={this.handleUser.bind(this)}
                  paletteSwitch={(value) => this.paletteSwitch(value)}
                  palette={this.state.palette}
                />
              ) : (
                  <></>
                )}
            </Container>
          </Router>
        </ThemeProvider>
      </>
    );
  }
}

export default App;
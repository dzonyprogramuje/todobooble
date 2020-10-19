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

const adress = "https://todohure.herokuapp.com";
// const adress = "http://localhost:5000";
// const keyNews = "5d3d946c272a4416a11bbbb8a6d0a04b";
// const adressNews = `https://newsapi.org/v2/top-headlines?country=pl&category=business&apiKey=${keyNews}`;
const lat = 51.1496361;
const lon = 15.0065645;
const adressNews = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
const keyWeather = "fe08ab0fa4e3a3f3b01650df3e38b7d0";
const adressWeather = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyWeather}&units=metric`;

const adressExchangeRate_PLN = `https://api.exchangeratesapi.io/latest?symbols=PLN`;
const adressExchangeRate_USD = `https://api.exchangeratesapi.io/latest?base=USD&symbols=PLN`;


class App extends React.Component {

  state = {
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
        main: '#784dc8',
      },
      secondary: {
        main: '#e52c78',
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
    console.log(value);

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

  apiWeather = () => {
    axios.get(adressWeather).then((res) => {

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

  exchange = () => {
    axios.get(adressExchangeRate_PLN).then((res) => {
      this.setState({
        exchangeRate: {
          PLN: res.data.rates.PLN,
        }
      });
    });

    axios.get(adressExchangeRate_USD).then((res) => {
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


    console.log(JSON.parse(localStorage.getItem('memory')) == this.state);

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
      loggedUser: "",
      tasks: [],
      news: [],
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
    localStorage.setItem('memory', JSON.stringify(this.state));

  }

  componentWillUnmount() {
    localStorage.setItem('memory', JSON.stringify(this.state));
  }

  render() {
    return (
      <>
        <ThemeProvider theme={this.theme}>
          <CssBaseline />
          <Router>
            <MenuTop
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

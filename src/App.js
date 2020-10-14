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

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import axios from "axios";

const adress = "https://todohure.herokuapp.com";
// const adress = "http://localhost:5000";
// const keyNews = "5d3d946c272a4416a11bbbb8a6d0a04b";
// const adressNews = `https://newsapi.org/v2/top-headlines?country=pl&category=business&apiKey=${keyNews}`;
const lat =51.1496361;
const lon =15.0065645;
const adressNews = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
const keyWeather="fe08ab0fa4e3a3f3b01650df3e38b7d0";
const adressWeather =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyWeather}&units=metric`;

const adressExchangeRate_PLN = `https://api.exchangeratesapi.io/latest?symbols=PLN`;
const adressExchangeRate_USD = `https://api.exchangeratesapi.io/latest?base=USD&symbols=PLN`;

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#bc477b",
      main: "#880e4f",
      dark: "#560027",
      contrastText: "#fff",
    },
    secondary: {
      light: "#b2fef7",
      main: "#80cbc4",
      dark: "#4f9a94",
      contrastText: "#000",
    },
  },
});

class App extends React.Component {
  state = {
    logged: false,
    loggedUser: "",
    newTaskOppened: false,
    editTask: undefined,
    user: false,
    alert: undefined,
    alertStatus: "",
    alertOppened: false,
    tasks: [],
    tasksMongo: [],
    news: [],
    exchangeRate: {
      PLN: "",
      USD: "",
    },
    
    weather : {
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

  apiNews = () => {
    axios.get(adressNews).then((res) => {
      this.setState({
        news: res.data.articles,
      });
      console.log(res.data);
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

exchange = ()=> {
  axios.get(adressExchangeRate_PLN).then((res) => {
    this.setState({   
      exchangeRate: {
        PLN: res.data.rates.PLN,   
      }              
    });   
  });

  axios.get(adressExchangeRate_USD).then((res) => {
    this.setState(prevState => {  
      return{ 
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
      console.log(id);
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
  };

  handleLogged = () => {
    this.setState({
      logged: false,
    });
  };

  render() {
    return (
      <>
        <ThemeProvider theme={theme}>
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
                    <Route path="/news">
                      <NewsComponent news={this.state.news} />
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

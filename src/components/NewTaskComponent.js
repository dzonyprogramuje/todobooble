import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";

// const useStyles = makeStyles({
//   avatar: {
//     backgroundColor: blue[100],
//     color: blue[600],
//   },
//   root: {
//     width: "100%",
//   },
// });

// export default function NewTaskComponents(props) {

// }
// const classes = useStyles();

class App extends React.Component {
  //  { open } = this.props;

  state = {
    kind: "",
    description: "",
  };

  handleNewTaskForm = (e, key) => {
    this.setState({
      // newTaskFormText: e.target.value,
      // [kind]: e.target.value,
      [key]: e.target.value,
    });
  };

  handleNewTaskPrepare = () => {
    const now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Formatowanie czasu:
    if (day < 10) {
      day = `0${day}`;
    }

    if (month < 10) {
      month = `0${month}`;
    }

    if (hour < 10) {
      hour = `0${hour}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    const time = `${day}.${month}.${year} | ${hour}:${minutes}:${seconds}`;
    let counter = 0;
    this.props.tasks.map((task, id) => {
      counter++;
    });

    const newTask = {
      id: counter,
      kind: this.state.kind,
      description: this.state.description,
      date: time,
      done: false,
      liked: false,
      deleted: false,
      username: this.props.loggedUser,
    };

    this.props.handleAddNewTask(newTask);
    this.props.handleNewTask();

    this.setState({
      kind: "",
      description: "",
    });
  };

  render() {
    return (
      <div>
        <Dialog
          fullWidth
          onClose={this.props.handleNewTask}
          aria-labelledby="simple-dialog-title"
          open={this.props.open}
        >
          <DialogTitle id="simple-dialog-title">Dodaj nowe zadanie</DialogTitle>

          <form noValidate autoComplete="off">
            <List>
              <ListItem>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Kategoria"
                  value={this.state.kind}
                  onChange={(e) => {
                    this.handleNewTaskForm(e, "kind");
                  }}
                  helperText="Wybierz kategorie swojego zadania"
                >
                  <MenuItem key="option_rozrywka" value="Rozrywka">
                    Rozrywka
                  </MenuItem>
                  <MenuItem key="option_praca" value="Praca">
                    Praca
                  </MenuItem>
                  <MenuItem key="option_sport" value="Sport">
                    Sport
                  </MenuItem>
                  <MenuItem key="option_prywatne" value="Prywatne">
                    Prywatne
                  </MenuItem>
                </TextField>
              </ListItem>

              <ListItem>
                <TextField
                  id="standard-full-width"
                  label="Tresc"
                  placeholder="Wprowadz tresc taska"
                  value={this.state.description}
                  onChange={(e) => {
                    this.handleNewTaskForm(e, "description");
                  }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>
            </List>
          </form>

          <DialogActions>
            <Button onClick={this.props.handleNewTask} color="primary">
              Anuluj
            </Button>
            <Button onClick={this.handleNewTaskPrepare} color="primary">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;

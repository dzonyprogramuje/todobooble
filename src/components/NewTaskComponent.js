import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

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
    kind: "Praca",
    description: "a",
  };

  handleNewTaskForm = (e, key) => {
    this.setState({
      // newTaskFormText: e.target.value,
      // [kind]: e.target.value,
      [key]: e.target.value,
    });
    console.log(this.state);
  };

  handleNewTaskPrepare = () => {
    const newTask = {
      id: 12,
      kind: this.state.kind,
      description: this.state.description,
      date: "Lipiec 01, 2020",
      done: false,
      liked: false,
      deleted: false,
    };

    this.props.handleAddNewTask(newTask);
    this.props.handleNewTask();
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

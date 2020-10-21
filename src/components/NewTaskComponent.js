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
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";

import SaveIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/CancelPresentation';

class App extends React.Component {

  state = {
    kind: '',
    description: "",
    error: "",
  };

  handleNewTaskForm = (e, key) => {
    if (key === "description" && this.state.description.length < 155) {
      this.setState({
        description: e.target.value,
      });
    } else if (key === "kind") {
      this.setState({
        kind: e.target.value,
      });
    }

  };

  cancel = () => {
    this.setState({
      error: ''
    });
    this.props.handleNewTask();
  }

  handleNewTaskPrepare = () => {
    if (this.state.kind !== '' && this.state.description !== '') {
      this.setState({
        error: ''
      });
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

    } else {
      this.setState({
        error: 'Prosze uzupelnic wszystkie pola'
      });
    }
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

          <form noValidate autoComplete="off">

            <List>
              <ListItem> <Typography variant='h6'>Dodaj nowe zadanie</Typography></ListItem>

              <ListItem>
                {this.state.error === '' ? null :
                  <Typography variant='inerheit' color='secondary'>
                    {this.state.error}
                  </Typography>}
              </ListItem>
              <ListItem>
                <TextField
                  id="standard-select-currency"
                  select
                  style={{ flex: 1 }}
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
                  multiline
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
            <Button
              onClick={this.cancel}
              color="secondary"
              variant="contained"
              startIcon={<CancelIcon />}
              iconSizeSmall
            >
              <Box p={'0 20px'}>Anuluj</Box>
            </Button>

            <Button
              onClick={this.handleNewTaskPrepare}
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              iconSizeSmall
            >
              <Box p={'0 20px'}>Zapisz</Box>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;

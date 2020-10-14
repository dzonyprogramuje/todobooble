import React from "react";
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

class EditTaskComponent extends React.Component {
  //  { open } = this.props;

  state = {
    id: undefined,
    kind: "",
    description: "",
    date: "",
    done: undefined,
    liked: undefined,
    deleted: undefined,
  };

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        _id: this.props.task._id,
        id: this.props.task.id,
        kind: this.props.task.kind,
        description: this.props.task.description,
        date: this.props.task.date,
        done: this.props.task.done,
        liked: this.props.task.liked,
        deleted: this.props.deleted,
      });
    }
  }

  handleTask = (e, key) => {
    this.setState({
      [key]: e.target.value,
    });
  };

  handleEditTaskSave = () => {
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

    const newTask = {
      _id: this.state._id,
      id: this.state.id,
      kind: this.state.kind,
      description: this.state.description,
      date: time,
      done: this.state.done,
      liked: this.state.liked,
      deleted: this.state.deleted,
    };

    this.props.handleEditTaskSave(newTask);
    this.props.handleEditTask();

    this.setState({});
  };

  render() {
    return (
      <div>
        <Dialog
          fullWidth
          onClose={this.props.handleEditTask}
          aria-labelledby="simple-dialog-title"
          open={this.props.task}
        >
          <DialogTitle id="simple-dialog-title">Edycja</DialogTitle>

          <form noValidate autoComplete="off">
            <List>
              <ListItem>
                <TextField
                  id="standard-select-currency"
                  select
                  color="secondary"
                  // label={}
                  value={this.state.kind}
                  onChange={(e) => {
                    this.handleTask(e, "kind");
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
                  color="secondary"
                  placeholder={this.state.description}
                  value={this.state.description}
                  onChange={(e) => {
                    this.handleTask(e, "description");
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
            <Button onClick={this.props.handleEditTask} color="secondary">
              Anuluj
            </Button>
            <Button onClick={this.handleEditTaskSave} color="secondary">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditTaskComponent;

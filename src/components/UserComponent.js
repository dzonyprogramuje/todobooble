import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

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

class UserComponent extends React.Component {
  //  { open } = this.props;

  state = {};

  render() {
    return (
      <div>
        <Dialog
          fullWidth
          onClose={this.props.handleUser}
          aria-labelledby="simple-dialog-title"
          open={true}
        >
          <DialogTitle id="simple-dialog-title">Panel uzytkownika</DialogTitle>

          <form noValidate autoComplete="off">
            <List>
              <ListItem>
                <TextField
                  id="standard-full-width"
                  label="Nazwa uzytkownika"
                  placeholder="Podaj nazwe uzytkownika"
                  disabled
                  value={this.props.username}
                  // onChange={(e) => {
                  //   this.handleTask(e, "description");
                  // }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>

              <ListItem>
                <TextField
                  id="standard-full-width"
                  label="Imie"
                  placeholder="Twoje imie"
                  value={this.props.name}
                  // onChange={(e) => {
                  //   this.handleTask(e, "description");
                  // }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </ListItem>

              <ListItem>
                <TextField
                  id="standard-select-currency"
                  select
                  // label={}
                  value="{this.state.kind}"
                  // onChange={(e) => {
                  //   this.handleTask(e, "kind");
                  // }}
                  helperText="Jeszcze nie wiem, moze fonts albo motyw"
                >
                  <MenuItem key="option_rozrywka" value="Rozrywka">
                    <ListItemIcon>
                      <SendIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">A short message</Typography>
                  </MenuItem>
                  <MenuItem key="option_praca" value="Praca">
                    1
                  </MenuItem>
                  <MenuItem key="option_sport" value="Sport">
                    2
                  </MenuItem>
                  <MenuItem key="option_prywatne" value="Prywatne">
                    3
                  </MenuItem>
                </TextField>
              </ListItem>
            </List>
          </form>

          <DialogActions>
            <Button onClick={this.props.handleUser} color="primary">
              Anuluj
            </Button>
            <Button onClick="{this.handleEditTaskSave}" color="primary">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserComponent;

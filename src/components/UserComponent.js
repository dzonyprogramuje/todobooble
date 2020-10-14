import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import DialogActions from "@material-ui/core/DialogActions";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import DraftsIcon from "@material-ui/icons/Drafts";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";


import KeyIcon from '@material-ui/icons/VpnKey';
import FaceIcon from '@material-ui/icons/Face';
import TextIcon from '@material-ui/icons/TextFields';

import DayIcon from '@material-ui/icons/WbSunny';
import NightIcon from '@material-ui/icons/Brightness2';

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
          <DialogTitle id="simple-dialog-title">Panel uzytkownika <b>IN PROGRESS</b></DialogTitle>

          <form noValidate autoComplete="off">
            <List>  
             <ListItem>

              <TextField
              color={"secondary"}
                  id="standard-full-width"
                  label="Twoja nazwa uzytkownika"
                  placeholder="Twoja nazwa uzytkownika"
                  disabled
                  value={this.props.username}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />                   

              </ListItem>
              <ListItem>
                <TextField
                color={"secondary"}
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
                color={"secondary"}
                  id="standard-select-currency"
                  select
                  // label={}
                  value="{this.state.kind}"
                  // onChange={(e) => {
                  //   this.handleTask(e, "kind");
                  // }}
                  helperText="Wybierz motyw kolorow"
                >
                  <MenuItem key="option_rozrywka" value="Rozrywka">
                    <ListItemIcon>
                      <NightIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Noc</Typography>
                  </MenuItem>
                  <MenuItem key="option_praca" value="Praca">
                  <ListItemIcon>
                      <DayIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="inherit">Dzien</Typography>
                  </MenuItem>

                </TextField>
              </ListItem>
            </List>
          </form>

          <DialogActions>
            <Button onClick={this.props.handleUser} color="secondary">
              Anuluj
            </Button>
            <Button onClick="{this.handleEditTaskSave}" color="secondary">
              Zapisz
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserComponent;




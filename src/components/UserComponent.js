import React from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';

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

import SaveIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/CancelPresentation';

import DayIcon from '@material-ui/icons/WbSunny';
import NightIcon from '@material-ui/icons/NightsStay';

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

  state = {
    passwordOld: '',
    passwordNew2: '',
    passwordNew2: ''
  }



  paletteSwitch = (e) => {

    this.props.paletteSwitch(e.target.value);
  }

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


          <List>
            <ListItem>

              <TextField
                margin='normal'
                id="standard-full-width"
                label="Twoja nazwa uzytkownika"
                placeholder="Twoja nazwa uzytkownika"
                disabled
                value={this.props.username}
                fullWidth

                InputLabelProps={{
                  shrink: true,
                }}
              />

            </ListItem>


            {/* 
            // Zmiana hasla uzytkownika
            <ListItem>
              <TextField
                margin='normal'
                id="standard-full-width"
                type='password'
                label="Chcesz zmienic swoje haslo?"
                placeholder="Podaj nowe haslo"
                value={this.props.name}
                // onChange={(e) => {
                //   this.handleTask(e, "description");
                // }}
                fullWidth

                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem>

            <ListItem>
              <TextField
                margin='normal'
                id="standard-full-width"
                type='password'
                label="Podaj ponownie nowe haslo"
                placeholder="Potwierdz nowe haslo"
                value={this.props.name}
                // onChange={(e) => {
                //   this.handleTask(e, "description");
                // }}
                fullWidth

                InputLabelProps={{
                  shrink: true,
                }}
              />
            </ListItem> */}

            <ListItem style={{ marginTop: 20 }}>
              <TextField

                style={{ flex: 1 }}
                id="standard-select-currency"
                select
                // label={}
                value={this.props.palette}
                onChange={(e) => {
                  this.paletteSwitch(e);
                }}
                helperText="Wybierz motyw kolorow"
              >

                <MenuItem key="option_praca" value="light">
                  <ListItemIcon>
                    <DayIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Dzien</Typography>
                </MenuItem>

                <MenuItem key="option_theme" value="dark">
                  <ListItemIcon>
                    <NightIcon fontSize="small" />
                  </ListItemIcon>
                  <Typography variant="inherit">Noc</Typography>
                </MenuItem>

              </TextField>
            </ListItem>
          </List>


          <DialogActions>
            <Button onClick={this.props.handleUser} color="secondary"
              variant="contained" startIcon={<CancelIcon />}>
              <Box p={'0 20px'}>Anuluj</Box>
            </Button>
            <Button onClick={this.props.handleUser} color="primary"
              variant="contained" startIcon={<SaveIcon />}>
              <Box p={'0 20px'}>Zapisz</Box>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserComponent;




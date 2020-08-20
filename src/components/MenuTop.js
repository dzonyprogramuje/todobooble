import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import ListIcon from "@material-ui/icons/TodayOutlined";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import LogoutIcon from "@material-ui/icons/LockOutlined";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";

import NewTaskComponent from "./NewTaskComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: 280,
  },
  fullList: {
    width: "auto",
  },
}));

function MenuTop(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    menu_left: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ menu_left: open });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {props.logged === true ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <Typography variant="h6" color="inherit">
            {props.logged === true ? <>Witaj, </> : <>Zaloguj sie</>}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <NewTaskComponent /> */}

      <Drawer
        anchor="left"
        open={state.menu_left}
        onClose={toggleDrawer(false)}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button key="Add" onClick={props.handleNewTask}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Nowe zadanie" />
            </ListItem>

            <ListItem button key="Tasks">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Moje zadania" />
            </ListItem>

            <ListItem button key="Done">
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText primary="Ukonczone zadania" />
            </ListItem>

            <Divider />

            <ListItem button key="User">
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary="Profil uzytkownika" />
            </ListItem>

            <ListItem button key="Logout" onClick={props.handleLogged}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj" />
            </ListItem>
          </List>
          ;
        </div>
      </Drawer>
      {/* close={closeDialog} state={state}  */}
      <NewTaskComponent
        open={props.open}
        handleNewTask={props.handleNewTask}
        handleAddNewTask={props.handleAddNewTask}
        tasks={props.tasks}
      />
    </div>
  );
}

export default MenuTop;

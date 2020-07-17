import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Divider from "@material-ui/core/Divider";

import PlaylistAddCheckOutlinedIcon from "@material-ui/icons/PlaylistAddCheckOutlined";
import PlaylistAddOutlinedIcon from "@material-ui/icons/PlaylistAddOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";

import ListIcon from "@material-ui/icons/TodayOutlined";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import LogoutIcon from "@material-ui/icons/LockOutlined";

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
          {props.logged == true ? (
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
            {props.logged == true ? <>Witaj, </> : <>Zaloguj sie</>}
          </Typography>
        </Toolbar>
      </AppBar>

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
            <ListItem button key="Inbox">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Moje zadania" />
            </ListItem>

            <ListItem button key="Inbox">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Nowe zadanie" />
            </ListItem>

            <Divider />

            <ListItem button key="Inbox">
              <ListItemIcon>
                <AccountIcon />
              </ListItemIcon>
              <ListItemText primary="Profil uzytkownika" />
            </ListItem>

            <ListItem button key="Inbox" onClick={props.handleLogged}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Wyloguj" />
            </ListItem>
          </List>
          ;
        </div>
      </Drawer>
    </div>
  );
}

export default MenuTop;

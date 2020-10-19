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
import Box from '@material-ui/core/Box';

import ListIcon from "@material-ui/icons/TodayOutlined";
import AddIcon from "@material-ui/icons/AddBoxOutlined";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import LogoutIcon from "@material-ui/icons/LockOutlined";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import NewsIcon from "@material-ui/icons/Receipt";
import Button from '@material-ui/core/Button';

import NewTaskComponent from "./NewTaskComponent";
import WeatherComponent from "./WeatherComponent";
import ExchangeRateComponent from "./ExchangeRateComponent";

import { BrowserRouter as Router, Link } from "react-router-dom";

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
  title: {
    flexGrow: 1,
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

          {props.logged === true ? (
            <>
              <Box flexGrow={1} display={{ xs: 'none', sm: 'flex' }}>
                <Typography variant="overline" color="inherit" className={classes.title}>
                  Witaj, {props.loggedUser}
                </Typography>
              </Box>



              <Box display="flex" flexGrow={1} justifyContent="flex-end">
                <ExchangeRateComponent pln={props.pln} usd={props.usd} />
                <WeatherComponent weather={props.weather} />
              </Box>
            </>
          ) : (
              <>
                <Typography variant="overline" color="inherit" className={classes.title}>

                  Zaloguj sie
              </Typography>
              </>
            )}


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



          <List className="navigation_bar">
            <ListItem button key="Shopping" to="/simple" component={Link} >
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Szybki task" />
            </ListItem>


            <ListItem button key="Add" onClick={props.handleNewTask}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Nowe zadanie" />
            </ListItem>

            <ListItem button key="Tasks" to="/" component={Link}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              {/* <Typography style={{ textDecoration: 'none' }}>XXD</Typography> */}
              <ListItemText color='innerheit' primary="Moje zadania" />
            </ListItem>

            <ListItem button key="Done" to="/done" component={Link} >
              <ListItemIcon>
                <DoneIcon />
              </ListItemIcon>
              <ListItemText primary="Ukonczone zadania" />
            </ListItem>




            <Divider />

            <ListItem button key="User" to="/news" component={Link} onClick={props.news} >
              <ListItemIcon>
                <NewsIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItem>

            <ListItem button key="User" onClick={props.handleUser}>
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

        </div>
      </Drawer>
      {/* close={closeDialog} state={state}  */}
      <NewTaskComponent
        open={props.open}
        handleNewTask={props.handleNewTask}
        handleAddNewTask={props.handleAddNewTask}
        tasks={props.tasks}
        loggedUser={props.loggedUser}
      />
    </div>
  );
}

export default MenuTop;

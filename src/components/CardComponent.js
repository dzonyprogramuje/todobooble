import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import HelpIcon from '@material-ui/icons/Help';
import AddIcon from '@material-ui/icons/Add';

import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "",
  },
}));

export default function CardComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMiniMenu = (kind) => {
    // Funkcja do obslugi mini menu (Edycja, Usun)
    props.handleTaskStatus(anchorEl.id, kind);
    setAnchorEl(undefined);
  };

  const handleTaskIcons = (e, kind) => {

    props.handleTaskStatus(e.currentTarget.id, kind);
    setAnchorEl(undefined);
  };

  let tasks = props.tasks;
  let counter = 0;
  tasks.map(task => {
    if (task.done === false) {
      counter++
    }
  });

  return (
    <Grid container spacing={2} style={{ marginTop: 18 }}>
      {
        counter > 0

          ?

          tasks.map((task, id) => {
            if (task.done == false) {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={4}
                >
                  <Card style={{ height: "100%" }} key={`tasks_${id}`}>
                    <CardHeader
                      avatar={<Avatar src="/broken-image.jpg" />}
                      action={
                        <IconButton id={task._id} onClick={handleClick}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={task.kind}
                      subheader={"Dodano: " + task.date}
                    />
                    <CardContent>
                      <Typography
                        multiline
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {task.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing flex md={0}>
                      <IconButton
                        aria-label="add to favorites"
                        id={task._id}
                        onClick={(e, kind) => {
                          handleTaskIcons(e, "like");
                        }}
                      >
                        <FavoriteIcon color={task.liked ? "primary" : ""} />
                      </IconButton>
                      <IconButton
                        aria-label="done"
                        id={task._id}
                        onClick={(e, kind) => {
                          handleTaskIcons(e, "done");
                        }}
                      >
                        <DoneIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Menu
                    id="options-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      id={task._id}
                      onClick={(kind) => {
                        handleMiniMenu("edit");
                      }}
                    >
                      Edytuj
                </MenuItem>
                    <MenuItem
                      id={task._id}
                      onClick={(kind) => {
                        handleMiniMenu("delete");
                      }}
                    >
                      Usun
                </MenuItem>
                  </Menu>
                </Grid>
              );
            }
          })

          :

          <Grid
            item
            xs={12}
            flex={1}
          >
            <Button startIcon={<AddIcon />} fullWidth color='secondary' variant="contained" onClick={props.handleNewTask}>
              Nie posiadasz zadnych zadan
              </Button>
          </Grid>
      }
    </Grid>
  );
}

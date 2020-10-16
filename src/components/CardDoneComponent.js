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
import BackupIcon from "@material-ui/icons/Backup";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import HelpIcon from '@material-ui/icons/Help';

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "",
  },
}));

export default function CardDoneComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleOptionDelete = () => {
  //   // Usuwanie konkretnego taska.
  //   props.handleDeleteTask(anchorEl.id);
  //   setAnchorEl(undefined);
  // };

  const handleMiniMenu = (kind) => {
    // Funkcja do obslugi mini menu (Edycja, Usun)
    props.handleTaskStatus(anchorEl.id, kind);
    setAnchorEl(undefined);
  };

  const handleTaskIcons = (e, kind) => {
    // Funkcja do obslugi mini menu (Edycja, Usun)
    // props.handleTaskStatus(id, kind);

    props.handleTaskStatus(e.currentTarget.id, kind);
    setAnchorEl(undefined);
  };

  const tasks = props.tasks;

  return (

    < Grid container spacing={2} style={{ marginTop: 18 }}>
      {

        tasks.map(task => {
          if (task.done == true)
            return task
        }) != false ?

          tasks.map((task, id) => {
            if (task.deleted !== true) {
              return (
                <Grid item xs={12} style={{ marginTop: 10 }}>
                  <Card key={`task_${id}`}>
                    <CardHeader
                      avatar={<Avatar src="/broken-image.jpg" />}
                      action={
                        <IconButton id={task._id} onClick={handleClick}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={task.kind}
                      subheader={task.date}
                    />
                    <CardMedia
                      className={classes.media}
                      image="/static/images/cards/paella.jpg"
                      title="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {task.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
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
                        <BackupIcon />
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
            <Button startIcon={<HelpIcon />} fullWidth color='secondary' variant="contained">Nie posiadasz zadnych ukonczonych zadan</Button>
          </Grid>

      }
    </Grid >
  );
}



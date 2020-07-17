import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "",
  },
}));

export default function CardComponent(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionDelete = () => {
    // Usuwanie konkretnego taska
    console.log("Usun dla: " + anchorEl.id); // Nie wiem kurwa jak to zrobilem ale dziala xd
    setAnchorEl(undefined);
  };

  const tasks = props.tasks;

  return (
    <Grid container spacing={1}>
      {tasks.map((task, id) => (
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <Card>
            <CardHeader
              avatar={<Avatar src="/broken-image.jpg" />}
              action={
                <IconButton id={id} onClick={handleClick}>
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
              <Typography variant="body2" color="textSecondary" component="p">
                {task.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon color={task.liked ? "secondary" : ""} />
              </IconButton>
              <IconButton aria-label="share">
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
            <MenuItem>Edytuj</MenuItem>
            <MenuItem id={id} onClick={handleOptionDelete}>
              Usun
            </MenuItem>
          </Menu>
        </Grid>
      ))}
    </Grid>
  );
}

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
import { BrowserRouter as Router, Link } from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';
import { deepOrange, green } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "",
  },
  rounded: {
    color: '#fff',

  },
}));

export default function NewsComponent(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <Grid container spacing={2}>
      {props.news.map((item, id) => {

        if (item.source.name !== "Google News") {



          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              style={{ marginTop: 10 }}
            >
              <Card style={{ height: "100%" }} key={`tasks_${id}`}>
                <CardHeader
                  avatar={<Avatar variant="rounded" className={classes.rounded}>
                    <AssignmentIcon />
                  </Avatar>}
                  title={item.title}
                  subheader={item.publishedAt}
                />
                <CardMedia
                  style={{ height: 300 }}
                  className={classes.media}
                  image={item.urlToImage}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                  </Typography>

                  <Typography
                    style={{ marginTop: 50 }}
                    variant="body2"
                    color="secondary"

                    component="p"
                  >

                    {item.source.name}


                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        }
      })}
    </Grid>
  );

}

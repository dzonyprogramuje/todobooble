import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function AlertComponent(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.alertOppened}
        autoHideDuration={4000}
        onClose={props.alertClose}
      >
        <Alert variant="filled" severity={props.alertStatus}>{props.alert}</Alert>
      </Snackbar>
    </div>
  );
}

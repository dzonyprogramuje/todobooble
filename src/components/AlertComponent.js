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
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }
  //     setOpen(false);
  //   };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={props.alertOppened}
        autoHideDuration={4000}
        onClose={props.alertClose}
      >
        <Alert severity={props.alertStatus}>{props.alert}</Alert>
      </Snackbar>

      {/* <Alert severity="warning">This is a warning alert — check it out!</Alert>
      <Alert severity="info">This is an info alert — check it out!</Alert>
      <Alert severity="success">This is a success alert — check it out!</Alert> */}
    </div>
  );
}

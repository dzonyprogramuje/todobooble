import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingIcon from '@material-ui/icons/AddShoppingCart';
import { Typography } from '@material-ui/core';


// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import DoneIcon from "@material-ui/icons/AssignmentTurnedIn";
// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import Button from "@material-ui/core/Button";
// import HelpIcon from '@material-ui/icons/Help';
import ItemIcon from '@material-ui/icons/AttachFile';

import Grid from "@material-ui/core/Grid";
import axios from "axios";


export default class SimpleListComponent extends React.Component {

    state = {
        value: ''
    }

    handleTaskInput = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handleTaskSave = () => {
        this.props.handleSimpleList(
            this.state.value);
        this.setState({
            value: ''
        });
    }

    deleteTask = (e) => {
        this.props.deleteSimpleTask(e.currentTarget.id);
    }

    render() {
        return (
            <>
                <Grid container spacing={2} style={{ marginTop: 18 }}>

                    < Grid item xs={12} md={10} >
                        <TextField autoFocus value={this.state.value} fullWidth label="Dodaj szybki task" variant="outlined" onChange={(e) => this.handleTaskInput(e)} value={this.state.value} />
                    </Grid >
                    <Grid item xs={12} md={2}>
                        <Button
                            color='secondary'
                            style={{ height: '100%' }}
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={this.handleTaskSave}
                        >
                            Zapisz
                </Button>
                    </Grid>


                    {
                        this.props.simpleTasks.map(task => {

                            return (
                                <Grid item xs={12} md={12}>

                                    <ListItem id={task._id} button onClick={(e) => this.deleteTask(e)}>
                                        <ListItemIcon>
                                            <ItemIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={task.description} />
                                    </ListItem>

                                </Grid>

                            )
                        })
                    }


                </Grid >
            </>
        )

    }

}

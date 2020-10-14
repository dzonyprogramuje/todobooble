import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

import weather_01d from "../img/01d.png";
import weather_01n from "../img/01n.png";
import weather_02d from "../img/02d.png";
import weather_02n from "../img/02n.png";
import weather_03d from "../img/03d.png";
import weather_03n from "../img/03n.png";
import weather_04d from "../img/04d.png";
import weather_04n from "../img/04n.png";
import weather_50d from "../img/50d.png";
import weather_50n from "../img/50n.png";
import weather_09d from "../img/09d.png";
import weather_09n from "../img/09n.png";
import weather_10d from "../img/10d.png";
import weather_10n from "../img/10n.png";
import weather_11d from "../img/11d.png";
import weather_11n from "../img/11n.png";
import weather_13d from "../img/13d.png";
import weather_13n from "../img/13n.png";
import weather_unknown from "../img/unknown.png";

import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   width: "100%",
  //   "& > * + *": {
  //     marginTop: theme.spacing(2),
  //   },
  // },
}));

let icon = undefined;




export default function WeatherComponent(props) {

  const classes = useStyles();

  if(props.weather.icon == "01d"){
    icon = weather_01d;
  };

  if(props.weather.icon == "01n"){
    icon = weather_01n;
  };
  if(props.weather.icon == "02d"){
    icon = weather_02d;
  };
  if(props.weather.icon == "02n"){
    icon = weather_02n;
  };

  if(props.weather.icon == "03d"){
    icon = weather_03d;
  };
  if(props.weather.icon == "03n"){
    icon = weather_03n;
  }

  if(props.weather.icon == "04d"){
    icon = weather_04d;
  };
  if(props.weather.icon == "04n"){
    icon = weather_04n;
  }

  if(props.weather.icon == "50d"){
    icon = weather_50d;
  };
  if(props.weather.icon == "50n"){
    icon = weather_50n;
  }

  if(props.weather.icon == "09d"){
    icon = weather_09d;
  };
  if(props.weather.icon == "09n"){
    icon = weather_09n;
  }

  if(props.weather.icon == "10d"){
    icon = weather_10d;
  };
  if(props.weather.icon == "10n"){
    icon = weather_10n;
  }

  if(props.weather.icon == "11d"){
    icon = weather_11d;
  };
  if(props.weather.icon == "11n"){
    icon = weather_11n;
  }

  if(props.weather.icon == "unknown"){
    icon = weather_unknown;
  };


  

  return (
    
        <>
        <Box display="flex" mr={3}>
        <Typography variant="overline" fontWeight={300}>
        {props.weather.name}: <b>{Math.round(props.weather.main.temp*10)/10}°</b>
        </Typography>
        </Box>
        <Box display="flex" alignItems="center">
        <img src={icon} height="30"/>
        </Box>

    
     </>
  );
}
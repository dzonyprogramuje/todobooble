import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';


let icon = undefined;


export default function ExchangeRateComponent(props) {

  return (

    <>
      <Box display="flex" mr={3}>
        <Typography variant="overline" fontWeight={200}>
          PLN/EUR: <b>{Math.round(props.pln * 100) / 100}</b>
        </Typography>
      </Box>
      <Box display="flex" mr={3}>
        <Typography variant="overline" fontWeight={200}>
          PLN/USD: <b>{Math.round(props.usd * 100) / 100}</b>
        </Typography>
      </Box>

    </>
  );
}

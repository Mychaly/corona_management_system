import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';
import { Coronavirus, SportsFootball } from "@mui/icons-material";
import coronaService from "../Services/coronaService";
import { LineChart } from "@mui/x-charts/LineChart";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Summary = () => {
  const [count, setCount] = useState(0);
  const [arrPerDay, setArrPerDay] = useState([]); //return
   const [open, setOpen] = React.useState(false);//window

  useEffect(() => {
    mountVaccines();
    getLast30DaysData();
  }, [open]);

  const mountVaccines = async () => {
    var arr = await coronaService.getAllCorona();
    var x = 0,
      c;
    for (let item in arr) {
      c = arr[item];
      console.log(arr[item].recoveryDate);
      if (
        c.dateA != null &&
        c.dateB != null &&
        c.dateC != null &&
        c.dateD != null
      )
        x++;
    }
    setCount(x);
  };

  const getLast30DaysData = async () => {
    var currentDate = new Date();
    var startDate = new Date(currentDate);
    startDate.setDate(startDate.getDate() - 30);//start day
    var allCoronaData = await coronaService.getAllCorona();
    var last30DaysData = [];
    var i = 0;
    for (let date = new Date(startDate);date <= currentDate;date.setDate(date.getDate() + 1))
     {
      console.log(i)
      last30DaysData[i]=0;
      for (let item in allCoronaData)
     {     
        var c = allCoronaData[item];
        console.log(c,c.positiveResultDate)
        console.log(c.positiveResultDate,">",date.toISOString().split("T")[0])
        if ((c.recoveryDate!=null&&date.toISOString().split("T")[0] < c.recoveryDate )||(c.positiveResultDate!=null&&c.positiveResultDate > date.toISOString().split("T")[0] ))
          {last30DaysData[i]=last30DaysData[i]+1;}      
        } i++;
    }
      setArrPerDay(last30DaysData);
       
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (

    <React.Fragment>
    <Button id="openG" onClick={handleClickOpen} >
    Summary
    </Button>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"> <p id="vaccinated">Unvaccinated people: {count}</p>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
      <LineChart
        series={[
          {
            data: arrPerDay,
          },
        ]}
        width={500}
        height={300} />   
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>

      </DialogActions>
    </Dialog>
  </React.Fragment>
   
  );
};

export default Summary;

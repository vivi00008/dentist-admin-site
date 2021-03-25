import { makeStyles, TextField, Typography, Grid, Button, FormControl, Select, InputLabel, MenuItem, Mui } from '@material-ui/core';
import React, { useContext, useState, useCallback } from 'react';
import sessionApi from '../api/sessionApi'
import { UserContext } from '../context/UserContext'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    },
    btnGrid: {
        marginTop: theme.spacing(3),
        textAlign: 'end',
    },
}))

const AddSessionForm = ({ close, roomData, refresh }) => {
    const [room, setRoom] = useState()
    const [sessionInDay, setSessionInDay] = useState()
    const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));

    const handleRoom = useCallback((e) => {
        setRoom(e.target.value)
    }, [])

    const handleSessionInDay = useCallback((e) => {
        setSessionInDay(e.target.value)
    }, [])

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const user = useContext(UserContext)

    const classes = useStyles()

    const handleSubmit = async() => {
        const response = await sessionApi.post("/create", {floorId:room, sessionInDay:sessionInDay, start:selectedDate,end:selectedDate}, {
            headers:{
                Authorization:user?.user?.token
            }
        })
        
        if(response.data.success){
            refresh()
            close()
        }
        
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-outlined-label">เลือกห้อง</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={room}
                            onChange={handleRoom}
                            label="ห้อง"
                        >
                            {roomData.map((e) => {
                                return (
                                    <MenuItem value={e?.id}>{e?.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-outlined-label">เลือกช่วงเวลา</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={room}
                            onChange={handleSessionInDay}
                            label="เวลา"
                        >
                            <MenuItem value={"morning"}>เช้า (9.30 - 12.30)</MenuItem>
                            <MenuItem value={"afternoon"}>บ่าย (13.30 - 16.30)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12} className={classes.btnGrid}>
                    <Button variant="contained" color="primary" type="submit" size="large" onClick={handleSubmit}><Typography>ยืนยัน</Typography></Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddSessionForm
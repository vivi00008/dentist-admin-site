import { makeStyles, TextField, Typography, Grid, Button } from '@material-ui/core';
import React, { useContext, useState, useCallback } from 'react';
import roomApi from '../api/roomApi'
import {UserContext} from '../context/UserContext'

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

const roomCategory = [
    'ทันตกรรมเด็ก',
    'ศัลยกรรมช่องปาก',
    'ตรวจสุขภาพช่องปาก',
    'ทันตกรรมผู้ใหญ่',
];

const AddroomForm = ({ close, refresh }) => {
    const [roomName, setRoomName] = useState()
    const [numSeats, setNumSeats] = useState()
    
    const user = useContext(UserContext)

    const handleRoomName = useCallback((e) =>{
        setRoomName(e.target.value)
    })

    const handleSetNumSeats = useCallback((e) =>{
        setNumSeats(e.target.value)
    })

    const classes = useStyles();

    const handleSubmit = async () => {
        try {
            const response = await roomApi.post('/create', {name:roomName, numSeats:numSeats}, {
                headers:{
                    Authorization: user?.user?.token
                }
            })

            if(response.data.success){
                console.log('create success')
                console.log(response.data.message)
                refresh()
                close()
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="ชื่อห้อง" value={roomName} onChange={handleRoomName}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="จำนวนที่นั่ง(ยูนิต)" value={numSeats} onChange={handleSetNumSeats}/>
                </Grid>
                <Grid item xs={12} className={classes.btnGrid}>
                    <Button variant="contained" color="primary" type="submit" size="large" onClick={handleSubmit}><Typography>ยืนยัน</Typography></Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddroomForm
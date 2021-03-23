import { makeStyles, TextField, Typography, Grid, Button } from '@material-ui/core';
import React, { useContext, useState } from 'react';

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

const roomDetail = {
    roomNum: '',
    roomCat: '',
    unitAmount: '',
    available: '',
    unavailable: '',
}


const AddroomForm = () => {
    const [roomdetail, setRoomDetail] = useState(roomDetail);
    const [roomCategory, setRoomCategory] = useState([]);

    const classes = useStyles();

    const handleSubmit = e => {}


    return(
        <form onSubmit={handleSubmit} className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField variant="outlined" name="roomNum" label="เลขห้อง" value={roomDetail.roomNum} />
                    <TextField variant="outlined" label="จำนวนที่นั่ง(ยูนิต)" name="unitAmount" value={roomDetail.unitAmount}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="outlined" name="available" label="จำนวนที่นั่งใช้งานได้" value={roomDetail.available}/>
                    <TextField variant="outlined" name="unavailable" label="จำนวนที่นั่งชำรุด" value={roomDetail.unavailable}/>
                </Grid>
                <Grid item xs={12} className={classes.btnGrid}>
                    <Button variant="contained" color="primary" type="submit" size="large"><Typography>ยืนยัน</Typography></Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default AddroomForm
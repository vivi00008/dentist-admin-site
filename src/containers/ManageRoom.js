import React, { useEffect, useContext, useState, useCallback } from 'react'
import Header from '../components/Header'
import roomApi from '../api/roomApi'
import AddroomForm from '../components/AddroomForm'
import { UserContext } from '../context/UserContext'
import { Button, Grid, Typography, makeStyles, Card, CardActionArea, CardContent,
        DialogContent, Dialog, DialogTitle } from '@material-ui/core'
import AirlineSeatFlatAngledIcon from '@material-ui/icons/AirlineSeatFlatAngled';
import CloseIcon from '@material-ui/icons/Close';
import SpinningCircles from 'react-loading-icons/dist/components/spinning-circles'


const useStyles = makeStyles({
    gridContent: {
        marginTop: 20,
        textAlign: 'center'
    },
    card: {
        maxWidth: 345,
        textAlign: 'center'
    },
    textCard: {
        fontSize: 18
    },
    selectCard: {
        backgroundColor: "#c577c4"
    },
    gridChair: {
        marginTop: 20,
    },
    chairIcon: {
        textAlign: 'center',
        color: "#c4c4c4",
    },
    chairCard: {
        maxWidth: 75,
        textAlign: 'center',
        height: 'auto',
        marginLeft: '48px'
    },
    chairContent: {
        marginTop: 10,
        fontSize: 18,
    },
    gridRenderChair: {
        textAlign: 'center',
    },
    unavailableChairCard:{
        color:'#f1b261',
        marginLeft: '48px'
    },
    dialogWrapper: {
        position: 'absolute',
    },
    dialogTitle: {
        paddingRight:'0px'
    },
    loadingindicator: {
        alignmentBaseline: 'middle',
        marginLeft: 650,
        paddingTop: 300
    },
    selectText:{
        color:"#fff"
    }
})

const ManageRoom = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [roomData, setRoomData] = useState([])
    const [selectRoom, setSelectRoom] = useState()
    const [open, setOpen] = useState(false);
    const [createRoomSuccess, setCreateRoomSuccess] = useState(1)

    const user = useContext(UserContext)
    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleIsLoading = useCallback((value) => {
        setIsLoading(value)
    }, [])

    const handleRoomData = useCallback((value) => {
        setRoomData(value)
    },[])

    const handleSelectRoom = useCallback((value) => {
        setSelectRoom(value)
    },[])

    const handleCreateSuccess = useCallback(() =>{
        setCreateRoomSuccess(createRoomSuccess +1)
    }, [])

    const chooseRoomCard = useCallback((value) => {
        handleSelectRoom(value)
    }, [selectRoom, roomData])

    const fetchData = async () => {
        handleIsLoading(false)
        try {
            const response = await roomApi.get('/floors', {
                headers: {
                    Authorization: user?.user?.token
                }
            })
            if (response.data.success) {
                handleRoomData(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
        handleIsLoading(true)
    }

    useEffect(() => {
        fetchData()
    }, [createRoomSuccess])

    return (
        <Grid container>
            <Header title={"ประเภทห้องทันตกรรม"} />
            {isLoading ?
                <React.Fragment>

                    <Grid container direction="row" className={classes.gridContent}>
                        <Grid item xs={6}>
                            <Typography>เลือกประเภทห้องทันตกรรม</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" onClick={handleClickOpen}><Typography>เพิ่มห้อง</Typography></Button>
                            <Dialog open={open} maxWidth="md" classes={{paper :classes.dialogWrapper}} spacing={2}>
                                <DialogTitle className={classes.dialogTitle}>
                                    <div style={{display: 'flex'}}>
                                        <Typography variant="h5" component="div" style={{flexGrow:1}}>เพิ่มห้องทันตกรรม</Typography>
                                        <Button color="secondary" onClick={handleClose}><CloseIcon/></Button>
                                    </div>
                                </DialogTitle>
                                <DialogContent dividers>
                                    <AddroomForm close={handleClose} refresh={handleCreateSuccess}/>
                                </DialogContent>
                        </Dialog>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={3} style={{ marginTop: 10 }}>
                        {roomData.map((e) => {
                            return (
                                <Grid item xs={3}>
                                    <Card className={[classes.card, selectRoom === e ? classes.selectCard : null]}>
                                        <CardActionArea onClick={() => chooseRoomCard(e)}>
                                            <CardContent>
                                                <Typography className={[classes.textCard, selectRoom === e ? classes.selectText:null]}>{e?.name}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>

                    <Grid container direction="row" className={classes.gridContent}>
                        <Grid item xs={8}>
                            <Typography>ที่นั่ง (ยูนิต)</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary"><Typography>เพิ่มยูนิต</Typography></Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="secondary" ><Typography>ลบยูนิต</Typography></Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={5} className={classes.gridChair}>
                        {selectRoom?.seats.map((e) => {
                            const name = Object.keys(e)
                            return (
                                <Grid item md={2} xs={4} className={classes.gridRenderChair} direction='column'>
                                    <Card className={e === 0 ? classes.unavailableChairCard: classes.chairCard}>
                                        <AirlineSeatFlatAngledIcon fontSize="large" className={classes.chairIcon}/>
                                    </Card>
                                    <Typography className={classes.chairContent}>{name}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>


                </React.Fragment>
                : <SpinningCircles className={classes.loadingindicator}/>}
        </Grid>
    )
}

export default ManageRoom
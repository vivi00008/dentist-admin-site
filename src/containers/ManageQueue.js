import React, { useState, useContext, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import { Button, Grid, makeStyles, Typography, Card, CardActionArea, CardContent,Dialog, DialogTitle, DialogContent, CardHeader} from '@material-ui/core'
import sessionApi from '../api/sessionApi'
import roomApi from '../api/roomApi'
import cartApi from '../api/cartApi'
import { UserContext } from '../context/UserContext'
import moment from 'moment'
import SpinningCircles from 'react-loading-icons/dist/components/spinning-circles'
import CloseIcon from '@material-ui/icons/Close';
import AddSessionForm from '../components/AddSessionForm'
import Avatar from '@material-ui/core/Avatar'
import { yellow } from '@material-ui/core/colors'


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
    dialogTitle: {
        paddingRight:'0px'
    },
    selectText:{
        color:'#fff'
    },
    loadingindicator: {
        alignmentBaseline: 'middle',
        marginLeft: 650,
        paddingTop: 300
    },
    descrptiontext: {
        paddingTop: 15,
    },
    avatar: {
        backgroundColor: '#f1b261',
    },
    cardHead: {
        backgroundColor: "#663399",
        height: 25
    },
    cartCard:{
        minHeight:250,
        maxWidth:300
    }
})

const ManageQueue = () => {
    const [isLoading, setIsloading] = useState(false)
    const [sessionData, setSessionData] = useState([])
    const [filterSessionData, setFilterSessionData] = useState([])
    const [roomData, setRoomData] = useState([])
    const [cartData, setCartData] = useState([])
    const [filterCartData, setFilterCartData] = useState([])
    const [selectRoom, setSelectRoom] = useState()
    const [selectSession, setSelectSession] = useState('')
    const [open, setOpen] = useState(false)
    const [createSuccess, setCreateSuccess] = useState(1)

    const [isSelectRoom, setIsSelectRoom] = useState(false)
    const [isSelectSession, setIsSelectSession] = useState(false)

    const handleCreateSuccess = useCallback(() =>{
        setCreateSuccess(createSuccess+1)
    }, [])

    const handleClose = useCallback(() =>{
        setOpen(false)
    }, [])

    const handleOpen = useCallback(() => {
        setOpen(true)
    },[])

    const handleIsLoading = useCallback((value) => {
        setIsloading(value)
    }, [])

    const handleSessionData = useCallback((value) => {
        setSessionData(value)
    }, [])

    const handleRoomData = useCallback((value) => {
        setRoomData(value)
    }, [])

    const handleSelectRoom = useCallback((value) => {
        setSelectRoom(value)
    }, [])

    const handleFilterSessionData = useCallback((value) => {
        setFilterSessionData(value)
    }, [selectRoom])

    const handleSelectSession = useCallback((value) => {
        setSelectSession(value)
    }, [])

    const handleCartData = useCallback((value) => {
        setCartData(value)
    }, [])

    const handleFilterCartData = useCallback((value) => {
        setFilterCartData(value)
    }, [selectRoom])

    useEffect(() => {
        fetchSessionData()
        fetchRoomData()
        fetchCartdata()
    }, [createSuccess])

    useEffect(() => {
        if (sessionData) {
            handleIsLoading(true)
        }
    }, [sessionData, roomData, cartData])

    const classes = useStyles()
    const user = useContext(UserContext)

    const fetchSessionData = async () => {

        const response = await sessionApi.get("/sessions", {
            headers: {
                Authorization: user.user?.token
            }
        })

        if (response.data.success) {
            handleSessionData(response.data.message)
        }
        handleIsLoading(true)
    }

    const fetchRoomData = async () => {

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

    }

    const fetchCartdata = async () => {
        try {
            const response = await cartApi.get('/all-carts', {
                headers: {
                    Authorization: user?.user?.token
                }
            })
            if (response.data.success) {
                handleCartData(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const chooseRoomCard = (value) => {
        setIsSelectRoom(true)
        setIsSelectSession(false)
        handleSelectRoom(value)
        handleFilterCartData([])
        handleFilterSessionData(sessionData.filter((item) => item.floorId === value.id))
    }

    const chooseSessionCard = (value) => {
        setIsSelectSession(true)
        handleSelectSession(value)
        handleFilterCartData(cartData.filter((item) => item.sessionId === value.id))
    }

    return (
        <div>
            <Header title={"???????????????????????????????????????"} />
            <Grid container className={classes.gridContent}>
                <Grid item xs={6}><Typography>????????????????????????????????????????????????????????????????????????</Typography></Grid>
                <Grid item xs={6}><Button variant="contained" color="primary" onClick={handleOpen}><Typography>??????????????????????????????????????????</Typography></Button></Grid>
                <Dialog open={open}>
                        <DialogTitle>
                        <DialogTitle className={classes.dialogTitle}>
                                    <div style={{display: 'flex'}}>
                                        <Typography variant="h5" component="div" style={{flexGrow:1}}>??????????????????????????????????????????</Typography>
                                        <Button color="secondary" onClick={handleClose}><CloseIcon/></Button>
                                    </div>
                                </DialogTitle>
                                <DialogContent dividers>
                                    <AddSessionForm close={handleClose} roomData={roomData} refresh={handleCreateSuccess}/>
                                </DialogContent>
                        </DialogTitle>
                    </Dialog>
            </Grid>
            {isLoading ?
                <Grid direction="column">
                    <Grid container direction="row" spacing={3} style={{ marginTop: 10 }}>
                        {roomData.map((e) => {
                            return (
                                <Grid item xs={3}>
                                    <Card className={[classes.card, selectRoom === e ? classes.selectCard : null]}>
                                        <CardActionArea onClick={() => chooseRoomCard(e)}>
                                            <CardContent>
                                                <Typography className={[classes.textCard, selectRoom === e ? classes.selectText : null]}>{e?.name}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>


                    {isSelectRoom ? <Grid item align="center" direction="column">
                        <Typography className={classes.descrptiontext}>?????????????????????????????????????????????</Typography>
                    </Grid> : null}

                    <Grid container direction="row" spacing={3} style={{ marginTop: 10 }}>
                        {filterSessionData.map((e) => {
                            let textTitle = moment(new Date(e.end))
                            textTitle = textTitle.format('DD/MM/YYYY')
                            let timeInDay = ""
                            let avatar_char = ""
                            if (e.sessionInDay === 'morning') {
                                timeInDay = "???????????? (9.30 - 12.30)"
                                avatar_char = "???"
                            } else {
                                timeInDay = "???????????? (13.30 - 16.30)"
                                avatar_char = "???"
                            }
                            return (
                                <Grid item xs={3} >
                                    <Card className={[classes.card, selectSession === e ? classes.selectCard : null]}>
                                        <CardHeader avatar={<Avatar aria-label="recipe" className={classes.avatar}>{avatar_char}</Avatar>} className={classes.cardHead}/>
                                        <CardActionArea>
                                            <CardContent onClick={() => chooseSessionCard(e)}>
                                                <Grid container direction="column" className={selectSession === e ? classes.selectText : null}>
                                                    <Grid item>
                                                        <Typography>?????????????????? : {textTitle}</Typography>

                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>??????????????????????????????????????? : {e.seatsAvailable} ?????????</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>???????????????????????? : {timeInDay} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>

                    {isSelectSession ? <Grid item align="center" direction="column">
                        <Typography className={classes.descrptiontext}>???????????????????????????????????????</Typography>
                    </Grid> : null}

                    <Grid container direction="row" spacing={3} style={{ marginTop: 10 }}>
                        {filterCartData.map((e) => {
                            return (
                                <Grid item xs={2}>
                                    <Card className={classes.cartCard}>
                                        <CardHeader className={classes.cardHead}/>
                                        <CardContent>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <Typography>???????????? : {e?.user_docs?.name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography>ID : {e?.user_docs?.username}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography>????????????????????? : {e?.teacherName}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography>???????????????: {e?.state}</Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                : <SpinningCircles className={classes.loadingindicator}/>}
        </div >
    )
}

export default ManageQueue
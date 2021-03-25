import React, { useState, useContext, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import { Button, Grid, makeStyles, Typography, Card, CardActionArea, CardContent } from '@material-ui/core'
import sessionApi from '../api/sessionApi'
import roomApi from '../api/roomApi'
import cartApi from '../api/cartApi'
import { UserContext } from '../context/UserContext'
import moment from 'moment'
import SpinningCircles from 'react-loading-icons/dist/components/spinning-circles'

const useStyles = makeStyles({
    loadingindicator: {
        alignmentBaseline: 'middle',
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
})

const ManageQueue = () => {
    const [isLoading, setIsloading] = useState()
    const [sessionData, setSessionData] = useState([])
    const [filterSessionData, setFilterSessionData] = useState([])
    const [morningData, setMorningData] = useState([])
    const [afternoonData, setAfternoonData] = useState([])
    const [roomData, setRoomData] = useState([])
    const [cartData, setCartData] = useState([])
    const [filterCartData, setFilterCartData] = useState()
    const [selectRoom, setSelectRoom] = useState()
    const [selectSession, setSelectSession] = useState('')

    const handleIsLoading = useCallback((value) => {
        setIsloading(value)
    }, [])

    const handleSessionData = useCallback((value) => {
        setSessionData(value)
    }, [])

    const handleMorningData = useCallback((value) => {
        setMorningData(value)
    }, [])

    const handleAfternoonData = useCallback((value) => {
        setAfternoonData(value)
    }, [])

    const handleRoomData = useCallback((value) => {
        setRoomData(value)
    }, [])

    const handleSelectRoom = useCallback((value) => {
        setSelectRoom(value)
    }, [])

    const handleFilterSessionData = useCallback((value) => {
        setFilterSessionData(value)
    }, [])

    const handleSelectSession = useCallback((value) => {
        setSelectSession(value)
    }, [])

    const handleCartData = useCallback((value) =>{
        setCartData(value)
    }, [])

    useEffect(() => {
        fetchSessionData()
        fetchRoomData()
        fetchCartdata()
    }, [])

    useEffect(() => {
        if (sessionData) {
            handleMorningData(filterData('morning'))
            handleAfternoonData(filterData('afternoon'))
            handleIsLoading(true)
        }
    }, [sessionData, roomData])

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

    const fetchCartdata = async () =>{
        try{
            const response = await cartData.get('/all-carts', {
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

    const filterData = (time) => {
        return sessionData.filter((item) => item.sessionInDay === time)
    }

    const chooseRoomCard = useCallback((value) => {
        handleSelectRoom(value)
        handleFilterSessionData(sessionData.filter((item) => item.floorId === value.id))
    }, [roomData])

    const chooseSessionCard = useCallback((value) => {
        handleSelectSession(value)
        
    }, [])

    return (
        <div>
            <Header title={"การจองทั้งหมด"} />
            <Grid container>
                <Grid item xs={6}><Typography>กรุณาห้องที่ต้องการ</Typography></Grid>
                <Grid item xs={6}><Button variant="contained">สร้างรอบการจอง</Button></Grid>
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
                                                <Typography className={classes.textCard}>{e?.name}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>


                        <Grid item align="center" direction="column">
                            <Typography>เลือกรอบที่เปิด</Typography>
                        </Grid>

                    <Grid container direction="row" spacing={3} style={{ marginTop: 10 }}>
                        {filterSessionData.map((e) => {
                            let textTitle = moment(new Date(e.end))
                            textTitle = textTitle.format('DD/MM/YYYY')
                            let timeInDay = ""
                            if (e.sessionInDay === 'morning') {
                                timeInDay = "เช้า (9.30 - 12.30)"
                            } else {
                                timeInDay = "บ่าย (13.30 - 16.30)"
                            }
                            return (
                                <Grid item xs={4} >
                                    <Card className={[classes.card, selectSession === e ? classes.selectCard : null]}>
                                        <CardActionArea>
                                            <CardContent onClick={() => chooseSessionCard(e)}>
                                                <Grid container direction="column" >
                                                    <Grid item>
                                                        <Typography>วันที่ : {textTitle}</Typography>

                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>จำนวนที่ยูนิต : {e.seatsAvailable} ตัว</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography>ช่วงเวลา : {timeInDay} </Typography>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>

                     <Grid item align="center" direction="column">
                        <Typography>การจองทั้งหมด</Typography>
                    </Grid>

                    <Grid container direction="row" spacing={3} style={{ marginTop: 10 }}>
                        
                    </Grid>


                </Grid>
                : <SpinningCircles className={classes.loadingindicator} />}
        </div >
    )
}

export default ManageQueue
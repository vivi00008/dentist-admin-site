import React, { useEffect, useContext, useState, useCallback } from 'react'
import Header from '../components/Header'
import roomApi from '../api/roomApi'
import { UserContext } from '../context/UserContext'
import { Button, Grid, Typography, makeStyles, Card, CardActionArea, CardContent, } from '@material-ui/core'
import AirlineSeatFlatAngledIcon from '@material-ui/icons/AirlineSeatFlatAngled';

const useStyles = makeStyles({
    gridContent: {
        marginTop: 20
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
        color: "#c4c4c4",
        textAlign: 'center'
    },
    chairCard: {
        maxWidth: 75,
        textAlign: 'center',
        height: 'auto'
    },
    chairContent: {
        marginTop: 10,
        fontSize: 18,
    },
    gridRenderChair: {
        textAlign: 'center'
    },
    unavailableChairCard:{
        color:'#f1b261'
    }
})

const ManageRoom = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [roomData, setRoomData] = useState([])
    const [selectRoom, setSelectRoom] = useState()

    const user = useContext(UserContext)
    const classes = useStyles()

    const handleIsLoading = (value) => {
        setIsLoading(value)
    }

    const handleRoomData = (value) => {
        setRoomData(value)
    }

    const handleSelectRoom = (value) => {
        setSelectRoom(value)
    }

    const chooseRoomCard = useCallback((value) => {
        handleSelectRoom(value)
    }, [selectRoom, roomData])

    const fetchData = async () => {
        handleIsLoading(false)
        try {
            const response = await roomApi.get('/floors', {
                headers: {
                    Authorization: user.token
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
    }, [])

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
                            <Button variant="contained" color="primary" ><Typography>เพิ่มห้อง</Typography></Button>
                        </Grid>
                    </Grid>

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

                    <Grid container direction="row" className={classes.gridContent}>
                        <Grid item xs={8}>
                            <Typography>ที่นั่ง (ยูนิต)</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" color="primary" ><Typography>เพิ่มยูนิต</Typography></Button>
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
                                        <AirlineSeatFlatAngledIcon fontSize="large" className={classes.chairIcon} />
                                    </Card>
                                    <Typography className={classes.chairContent}>{name}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>


                </React.Fragment>
                : <div>
                    Loading data ..
                    </div>}
        </Grid>
    )
}

export default ManageRoom
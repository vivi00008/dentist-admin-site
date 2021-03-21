import React, { useEffect, useContext, useState, useCallback } from 'react'
import Header from '../components/Header'
import roomApi from '../api/roomApi'
import { UserContext } from '../context/UserContext'
import { Button, Grid, Typography, makeStyles, Card, CardActionArea, CardContent, } from '@material-ui/core'

const useStyles = makeStyles({
    gridContent: {
        marginTop: 20
    },
    card:{
        maxWidth: 345,
        textAlign:'center'
    },
    textCard:{
        fontSize:18
    },
    selectCard:{
        backgroundColor:"#c577c4"
    }
})

const ManageRoom = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [roomData, setRoomData] = useState([])
    const [selectRoom, setSelectRoom] = useState()
    const [filterData, setFilterData] = useState()

    const user = useContext(UserContext)
    const classes = useStyles()

    const handleIsLoading = useCallback((value) => {
        setIsLoading(value)
    }, [])

    const handleRoomData = useCallback((value) => {
        setRoomData(value)
    }, [])

    const handleSelectRoom = useCallback((value) => {
        setSelectRoom(value)
    }, [])

    const handleFilterData = useCallback((value) => {
        setFilterData(value)
    }, [])

    const chooseRoomCard = (value) =>{
        handleSelectRoom(value)
        const queryData = roomData.filter(item => item === selectRoom)
        handleFilterData(queryData[0])
    }
 
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
                                    <Card className={[classes.card, selectRoom === e ? classes.selectCard:null]}>
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

                    {<Grid>
                        <Typography>{filterData?.name}</Typography>
                    </Grid>}


                </React.Fragment>
                : <div>
                    Loading data ..
                    </div>}
        </Grid>
    )
}

export default ManageRoom
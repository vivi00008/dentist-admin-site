import React, { useEffect, useContext, useState, useCallback } from 'react'
import Header from '../components/Header'
import roomApi from '../api/roomApi'
import { UserContext } from '../context/UserContext'
import { Button, Grid, Typography, makeStyles, IconButton } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RoomCard from '../components/RoomCard'

const useStyles = makeStyles({
    gridContent: {
        marginTop: 20
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
        handleFilterData()
    }, [])
    
    const handleFilterData = useCallback(() =>{
        
    }, [selectRoom])

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
                                    <RoomCard item={e} select={handleSelectRoom} isSelected={e === selectRoom} />
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


                </React.Fragment>
                : <div>
                    Loading data ..
                    </div>}
        </Grid>
    )
}

export default ManageRoom
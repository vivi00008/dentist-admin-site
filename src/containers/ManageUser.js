import React, { useEffect, useState, useContext, useCallback } from 'react'
import Header from '../components/Header'
import userApi from '../api/userApi'
import { UserContext } from '../context/UserContext'
import { makeStyles, Typography, Card, CardActionArea, CardContent, Grid, Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'

const useStyles = makeStyles({
    tableRoot: {
        width: '100%',
        marginTop:30
    },
    container: {
        maxHeight: 800,
    },
    buttonHeader:{
        marginTop:20
    },
    deleteButton:{
        color:"#d80126"
    },
    editButton:{
        color:"#f1b261"
    },
    selectCard:{
        backgroundColor:"#b565b4"
    }
})

const ManageUser = () => {

    const [allUserData, setAllUserData] = useState([])
    const [selectRole, setSelectRole] = useState()
    const [filterData, setFilterData] = useState([])

    const classes = useStyles()

    const user = useContext(UserContext)

    const fetchData = async () => {
        const response = await userApi.get("/all-users", {
            headers: {
                Authorization: user.user?.token
            }
        })
        if (response.data.success) {
            setAllUserData(response.data.message)
            setFilterData(response.data.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const chooseRole = (item) => {
        setSelectRole(item)
        console.log(item)
        const queryData = filterItem(item)
        setFilterData(queryData)
    }

    const filterItem = (item) =>{
        return allUserData.filter((items) => items.role === item)
    }


    const roleUser = [
        {
            id: 1,
            role: 'doctor',
            label: "นักศึกษา"
        },
        {
            id: 2,
            role: 'professor',
            label: "อาจารย์"
        }
    ]

    const columns = [
        {
            id: 1,
            label: 'ID',
            minWidth: 100,
            value:'id'
        },
        {
            id: 2,
            label: 'ชื่อ-สกุล',
            minWidth: 170,
            value:'name'
        },
        {
            id: 3,
            label: 'อีเมลล์',
            minWidth: 170,
            value:'email'
        },
        {
            id: 4,
            label: 'รหัสประจำตัว',
            minWidth: 170,
            value:'telephone'
        },
        {
            id:5,
            label:'ตำแหน่ง',
            minWidth:170,
            value:'role'
        },
        {
            id: 6,
            label: '',
            minWidth: 230,
            value:''
        }
    ]
    return (
        <div>
            <Header title={"รายชื่อบัญชีผู้ใช้"} />

            <Grid container direction="row" spacing={3} className={classes.buttonHeader}>

                {roleUser.map((e) => {
                    return (
                        <Grid item>
                            <Card md={6} className={selectRole === e.role && classes.selectCard}>
                                <CardActionArea onClick={() => chooseRole(e.role)}>
                                    <CardContent>
                                        <Typography>
                                            {e.label}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}

            </Grid>

            <Paper className={classes.tableRoot}>
                <TableContainer className={classes.container}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((item) => {
                                        return (
                                            <TableCell
                                                key={item.id}
                                                align={item?.align}
                                                style={{ minWidth: item?.minWidth }}
                                            >
                                                {item.label}
                                            </TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterData.map((e) => {
                                let roleText = ''
                                if(e.role == "doctor"){
                                    roleText += 'นักศึกษา'
                                }else{
                                    roleText += 'อาจารย์'
                                }
                                return (
                                    <TableRow  hover role="checkbox" tabIndex={-1} key={e.id}>
                                        <TableCell>{e.id}</TableCell>
                                        <TableCell>{e.name}</TableCell>
                                        <TableCell>{e.email}</TableCell>
                                        <TableCell>{e.username || '-'}</TableCell>
                                        <TableCell>{roleText}</TableCell>
                                        <TableCell>
                                            <Grid container>
                                                <Grid item>
                                                    <Button variant="contained" style={{marginRight:20, backgroundColor:"#f5a81e", color:"#fff"}}><Typography>แก้ไข</Typography></Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="secondary"><Typography>ลบ</Typography></Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default ManageUser
import React, { useEffect, useState, useContext, useCallback } from 'react'
import Header from '../components/Header'
import userApi from '../api/userApi'
import { UserContext } from '../context/UserContext'
import { makeStyles, Typography, Card, CardActionArea, CardContent, Grid, Table, Paper, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core'

const useStyles = makeStyles({
    tableRoot: {
        width: '100%'
    },
    container: {
        maxHeight: 440,
    },
})

const ManageUser = () => {

    const [allUserData, setAllUserData] = useState([])
    const [selectRole, setSelectRow] = useState()

    const classes = useStyles()

    const handleAllUserData = useCallback((value) => {
        setAllUserData(value)
    }, [])

    const handleSelectRole = useCallback((value) => {
        setSelectRow(value)
    }, [])

    const user = useContext(UserContext)

    const fetchData = async () => {
        const response = await userApi.get("/all-users", {
            headers: {
                Authorization: user.user?.token
            }
        })
        if (response.data.success) {
            console.log(response.data.message)
            handleAllUserData(response.data.message)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const chooseRole = useCallback((item) => {
        handleSelectRole(item)
    }, [])
    const roleUser = [
        {
            id: 1,
            role: 'docter',
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
            minWidth: 100
        },
        {
            id: 2,
            label: 'ชื่อ-สกุล',
            minWidth: 170
        },
        {
            id: 3,
            label: 'อีเมลล์',
            minWidth: 170,


        },
        {
            id: 4,
            label: 'เบอร์โทรศัพท์',
            minWidth: 170
        },
        {
            id: 5,
            label: '',
            minWidth: 230
        }
    ]
    return (
        <div>
            <Header title={"รายชื่อบัญชีผู้ใช้"} />

            <Grid container direction="row" spacing={3}>

                {roleUser.map((e) => {
                    return (
                        <Grid item>
                            <Card md={6}>
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
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default ManageUser
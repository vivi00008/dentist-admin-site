import React, { useCallback, useState, useContext } from 'react'
import { makeStyles, TextField, Typography, Grid, Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import userApi from '../api/userApi'
import { UserContext } from '../context/UserContext'
import { SpinningCircles } from 'react-loading-icons';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    loadindicator: {
        marginLeft: 200,
        paddingTop: 10,
    },
}))

const AddUserForm = ({ close, refresh }) => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [prefix, setPrefix] = useState('')
    const [loaddata, setLoadData] = useState(true)

    const user = useContext(UserContext)
    const classes = useStyles()

    const handleName = useCallback((e) => {
        setName(e.target.value)
    }, [])

    const handleEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [])

    const handleUserName = useCallback((e) => {
        setUsername(e.target.value)
    }, [])

    const handlePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    const handleRole = useCallback((e) => {
        setRole(e.target.value)
    }, [])

    const handleConfirmPassword = useCallback((e) => {
        setConfirmPassword(e.target.value)
    }, [])

    const handlePrefix = useCallback((e) => {
        setPrefix(e.target.value)
    }, [])

    const handleSubmit = async () => {
        try {
            setLoadData(false)

            if (password !== confirmPassword) {
                return console.log('fail register password not match')
            }

            const response = await userApi.post(`/register-${role}`, { name: `${prefix} ${name}`, email: email, username: username, password: password }, {
                headers: {
                    Authorization: user?.user?.token
                }
            })

            console.log(response.data)

            if (response.data.success) {
                setLoadData(true)
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
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">คำนำหน้า</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={prefix}
                            onChange={handlePrefix}
                            label="คำนำหน้า"
                        >
                            <MenuItem value={'นาย'}>นาย</MenuItem>
                            <MenuItem value={'นางสาว'}>นางสาว</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="ชื่อ - นามสกุล นักศึกษา" value={name} onChange={handleName} />
                </Grid>
                <Grid item xs={6}>
                    <TextField variant="outlined" label="รหัสนักศึกษา" value={username} onChange={handleUserName} />
                </Grid>
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">ตำแหน่ง</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={role}
                            onChange={handleRole}
                            label="ตำแหน่ง"
                        >
                            <MenuItem value={'doctor'}>นักศึกษา</MenuItem>
                            <MenuItem value={'professor'}>อาจารย์</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <TextField variant="outlined" label="อีเมล" value={email} onChange={handleEmail} />
                </Grid>

                <Grid item xs={12}>
                    <TextField variant="outlined" label="รหัสผ่าน" value={password} type="password" onChange={handlePassword} />
                </Grid>

                <Grid item xs={12}>
                    <TextField variant="outlined" label="ยืนยันรหัสผ่าน" value={confirmPassword} type="password" onChange={handleConfirmPassword} />
                </Grid>

                <Grid item xs={12} className={classes.btnGrid}>
                    <Button variant="contained" color="primary" type="submit" size="large" onClick={handleSubmit}><Typography>ยืนยัน</Typography></Button>
                </Grid>
                {loaddata?null:(<div className={classes.loadindicator} ><SpinningCircles/></div>)}
            </Grid>
        </div>
    )
}

export default AddUserForm;
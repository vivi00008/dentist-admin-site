import React, {useState, useCallback, useContext} from 'react'
import { Grid, TextField, Button, Typography} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import userApi from '../api/userApi'
import {UserContext} from '../context/UserContext'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root:{
        display:'flex'
    },
    img: {
        height: '100%',
        width: '100%',
        minWidth: '216px',
        minHeight: 'auto'
    },
    logo: {
        width: '20%',
        height: 'auto',
        alignSelf:'center'
    },
    centerGrid: {
        display:'flex',
        justifyContent:'center'
    },
    input:{
        width:"50%"
    },
    left:{
        display:'flex'
    },
    right:{
        display:'flex'
    },
    appLogo:{
        width:"40%",
        height: 'auto',
        alignSelf:'center'
    },
    submitButton:{
        width:"40%",
        height:'60px'
    },
    buttonGird:{
        height:'auto',
        marginTop:20,
        marginBottom:40
    },
    buttonFont:{
        fontSize:18,
        color:'#ffffff'
    }
}));

const Login = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const user = useContext(UserContext)
    const { history } =props

    const handleUsername = useCallback((text) =>{
        setUsername(text)
    }, [])

    const handlePassword = useCallback((text) => {
        setPassword(text)
    },[])

    const doLogin = async () => {
        try {
            
            const response = await userApi.post(
                "/login-admin",
                { username: username, password: password },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                },
            );
                
            if (response.data.success) {
                console.log("success")
                user.setUser(response.data)
                user.setIsAuth(true);
                history.push('/manage-room')
            }
        } catch (err) {}
    };

    const classes = useStyles();
    return (
        <Grid container className={classes.root}>

            <Grid item sm={12} md={6} direction="column" className={classes.left}>
                <img src="/images/bg-login.png" className={classes.img} alt=""/>
            </Grid>

            <Grid item sm={12} md={6} direction="column" className={classes.right}>
                <Grid item >
                    <img src="/images/dentist-logo.png" className={classes.logo} alt=""/>
                </Grid>
                <Grid item className={classes.centerGrid}>
                    <img src="/images/app-logo.png" className={classes.appLogo} alt="" />
                </Grid>
                <Grid item className={classes.centerGrid}>
                    <TextField label="บัญชีผู้ใช้" variant="outlined" className={classes.input} value={username} onChange={e => handleUsername(e.target.value)}/>
                </Grid>
                <Grid item className={classes.centerGrid} style={{paddingTop:24}}>
                    <TextField label="รหัสผ่าน" variant="outlined" className={classes.input} value={password} onChange={e => handlePassword(e.target.value)} type="password"/>
                </Grid>
                <Grid item className={[classes.centerGrid, classes.buttonGird]} style={{paddingTop:24}}>
                    <Button variant='contained' color="primary" className={classes.submitButton} onClick={doLogin} ><Typography className={classes.buttonFont}>เข้าสู่ระบบ</Typography></Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withRouter(Login)
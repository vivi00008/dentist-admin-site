import React, { useContext } from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#fff',
    },
    logo1: {
        color: '#4B0082'
    },
})

const Header = () => {
    const classes = useStyles()

    const history = useHistory()
    const user = useContext(UserContext)

    const doLogout = () => {
        user.setIsAuth(false)
        history.push('/')
    }

    return (
        <Grid container alignItems="center">
            <Grid item>
                <LocalHospitalIcon classes={{ root: classes.logo1 }} />
            </Grid>
            <Grid item sm></Grid>
            <Grid item>
                <Link to="/">
                    <IconButton onClick={doLogout}>
                        <PowerSettingsNewIcon fontSize="small" />
                    </IconButton>
                </Link>
            </Grid>
        </Grid>
    )
}

export default Header
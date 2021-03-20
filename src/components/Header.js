import React, { useContext } from 'react';
import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles({
    root: {
        paddingTop:10
    },
    gridHeader: {
        
    },
    textHeader:{
        fontSize:36
    }
})

const Header = ({ title }) => {
    const classes = useStyles()

    const history = useHistory()
    const user = useContext(UserContext)

    const doLogout = () => {
        user.setIsAuth(false)
        history.push('/')
    }

    return (
        <Grid container className={classes.root} direction="row">
            <Grid item xs className={classes.gridHeader}>
                <Typography className={classes.textHeader}>{title}</Typography>
            </Grid>
            <Link to="/">
                <IconButton onClick={doLogout}>
                    <PowerSettingsNewIcon fontSize="large" />
                </IconButton>
            </Link>
        </Grid>
    )
}

export default Header
import React, { useContext } from 'react';
import { Grid, IconButton, makeStyles } from '@material-ui/core';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles({

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
        <Grid container>
                <Link to="/">
                    <IconButton onClick={doLogout}>
                        <PowerSettingsNewIcon fontSize="large" />
                    </IconButton>
                </Link>
        </Grid>
    )
}

export default Header
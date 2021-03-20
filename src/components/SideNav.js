import React from 'react';
import { makeStyles, MenuItem, MenuList, Grid } from "@material-ui/core"
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
    sideNav: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: 'auto',
        height: '100%',
        backgroundColor: '#893188'
    },
    img: {
        height: "auto",
        width: "100%"
    },
    imgGrid: {
        height: 'auto',
        width: '100px',
        paddingTop: 20
    },
    centerGrid: {
        display: 'flex',
        justifyContent: 'center',
        height:'100px'
    },
    buttonList: {
        paddingTop: 100
    },
    homeIcon: {
        color: "#fff"
    },
    buttonIcon:{
        marginTop:20
    }
})

const SideNav = () => {
    const classes = useStyles();
    console.log(classes)
    return (
        <Grid className={classes.sideNav} direction="column">
            <MenuList align="center">
                <Grid container direction="column">
                    <Grid item className={classes.imgGrid}>
                        <img src="/images/homeIcon.png" alt="" className={classes.img} />
                    </Grid>
                    <Grid container direction="column" className={classes.buttonList}>
                        <Grid item className={classes.buttonIcon}>
                            <MenuItem className={classes.centerGrid}><HomeIcon fontSize="large" className={classes.homeIcon} /></MenuItem>
                        </Grid>
                        <Grid item >
                            <MenuItem className={classes.centerGrid}><HomeIcon fontSize="large" className={classes.homeIcon} /></MenuItem>
                        </Grid>
                        <Grid item>
                            <MenuItem className={classes.centerGrid}><HomeIcon fontSize="large" className={classes.homeIcon} /></MenuItem>
                        </Grid>
                    </Grid>
                </Grid>
            </MenuList>
        </Grid>
    )
}

export default SideNav
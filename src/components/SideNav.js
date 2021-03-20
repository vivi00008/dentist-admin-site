import React, { useState } from 'react';
import { makeStyles, MenuItem, MenuList, Grid} from "@material-ui/core"
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AirlineSeatFlatAngledIcon from '@material-ui/icons/AirlineSeatFlatAngled';
import { Link } from 'react-router-dom'

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
        height: '100px'
    },
    buttonList: {
        paddingTop: 100
    },
    homeIcon: {
        color: "#fff"
    },
    logout: {
        display:'flex',
        flexDirection:'column',
    },
    selectGrid: {
        backgroundColor: "#fff",
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px'
    },
    selectIcon: {
        color: '#893188'
    },
    logoutIcon:{
        
    }
})

const SideNav = () => {
    const classes = useStyles();
    const [selectOne, setSelectOne] = useState(true)
    const [selectTwo, setSelectTwo] = useState(false)
    const [selectThree, setSelectThree] = useState(false)

    const chooseOne = () => {
        setSelectOne(true)
        setSelectTwo(false)
        setSelectThree(false)
    }

    const chooseTwo = () => {
        setSelectOne(false)
        setSelectTwo(true)
        setSelectThree(false)
    }
    const chooseThree = () => {
        setSelectOne(false)
        setSelectTwo(false)
        setSelectThree(true)
    }

    return (
        <Grid className={classes.sideNav} direction="column">
            <MenuList align="center">
                <Grid container direction="column">
                    <Grid item className={classes.imgGrid}>
                        <img src="/images/homeIcon.png" alt="" className={classes.img} />
                    </Grid>
                    <Grid container direction="column" className={classes.buttonList}>
                        <Grid item className={[selectOne && classes.selectGrid]} >
                            <Link to="/manage-room" onClick={chooseOne}>
                                <MenuItem className={classes.centerGrid}><AirlineSeatFlatAngledIcon fontSize="large" className={[classes.homeIcon, selectOne && classes.selectIcon]} /></MenuItem>
                            </Link>
                        </Grid>
                        <Grid item className={[selectTwo && classes.selectGrid]}>
                            <Link to="/manage-user" onClick={chooseTwo}>
                                <MenuItem className={classes.centerGrid}><PeopleAltIcon fontSize="large" className={[classes.homeIcon, selectTwo && classes.selectIcon]} /></MenuItem>
                            </Link>
                        </Grid>
                        <Grid item className={[selectThree && classes.selectGrid]}>
                            <Link to="/manage-queue" onClick={chooseThree}>
                                <MenuItem className={classes.centerGrid}><EventNoteIcon fontSize="large" className={[classes.homeIcon, selectThree && classes.selectIcon]} /></MenuItem>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </MenuList>
        </Grid>
    )
}

export default SideNav
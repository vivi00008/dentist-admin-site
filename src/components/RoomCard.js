import React from 'react';
import {Card, CardActionArea, CardContent, makeStyles, Typography} from '@material-ui/core'

const useStyle = makeStyles({
    root:{
        maxWidth: 345,
        textAlign:'center'
    },
    textContent:{
        fontSize:18
    },
    selectStyle:{
        backgroundColor:"#c577c4"
    }
})

const RoomCard = ({item, select, isSelected}) =>{
    const classes = useStyle()
    return (
        <Card className={[classes.root, isSelected && classes.selectStyle]}>
            <CardActionArea onClick={() => select(item?.name)}>
                <CardContent>
                    <Typography className={classes.textContent}>{item?.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default RoomCard
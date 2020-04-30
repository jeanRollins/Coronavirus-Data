import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'


const Bar = (props) => {

    return(
        <AppBar position="static" >
            <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu"></IconButton>
            
            { (props.type == 'footer') ? (
                <Typography style={{  textAlign : 'center'  }}  component="h2" className="">
                    Datos : https://github.com/pomber/covid19 
                </Typography>
            ) : (
                <Typography variant="h6" >
                    {props.title}
                </Typography>
            )}   
            
            </Toolbar>
        </AppBar>
    )
}

export default Bar

import React from 'react'
import Typography from '@material-ui/core/Typography'




export default function Footer ()  {
    
    return (
        <>
            <div style = {style}>
                <Typography style={{  textAlign : 'center'  }}  component="h2" className="">
                    Datos : https://github.com/pomber/covid19 
                </Typography>    
            </div> 
            
        </>
    )
}

const style = {
    width : '100%' , 
    backgroundColor : '#3f51b5' ,
    color : '#fff' , 
    padding : '20px 0px 20px 0px'
}
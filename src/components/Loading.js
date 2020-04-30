import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import 'typeface-roboto'

export default function Loading(){
    return (
        <> 
           <Container style={{marginTop : '30px'}} >
                <Grid container   
                    spacing={1} 
                    style={{marginTop: '300px' }}
                >
                    <Grid  item xs={3} lg = {4}  ></Grid>
                    <Grid  item xs={2} lg = {1} >
                        <CircularProgress /> 
                    </Grid>
                    <Grid  item xs={3}  >

                        <Typography >
                            <span style={{verticalAlign: 'sub' }}>   Cargando... </span> 
                        </Typography>
                    
                    </Grid>
                </Grid>
            </Container>
        </>
    )
} 

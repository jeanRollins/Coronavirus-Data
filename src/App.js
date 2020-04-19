import React , { useState , useEffect } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'



import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Container from '@material-ui/core/Container'

//table
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Box from '@material-ui/core/Box';


import axios from 'axios'
import Loading from './components/Loading'



//
function getLastData(arr){
 
  const arrayLenght = arr.length 
  const daysAfters = ( arrayLenght - 4 )
  const days = []

  for (let i = daysAfters ; i < arr.length; i++) {
    
    days.push(arr[i])
    
  }
  return days
}


function App() {

  let url = 'https://pomber.github.io/covid19/timeseries.json'

  const  [lastConfirmated, setLastConfirmated] = useState(false) 
  
  const fetchApi = async () => {

    let dataLastDays = await axios.get(url)

    let daysLast = await getLastData( dataLastDays.data.Chile )
    await setLastConfirmated(daysLast)

  }
  useEffect( () => {
    fetchApi()

  }, [])

  return (lastConfirmated !== false) ? (
  <>

    <AppBar position="static" >
      <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
        
        </IconButton>
        <Typography variant="h6" >
          Coronavirus Chile abril 2020
        </Typography>
      
      </Toolbar>
    </AppBar>

    <Container style={{marginTop : '30px'}}>
     

      <Grid container   spacing={1} >
        <Grid  item xs={12}  >

          <TableContainer 
            component={Paper}
           
            >
            <Table className={""} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell align="left"  >Día </TableCell>
                  <TableCell align="left">Casos confirmados</TableCell>
                  <TableCell align="left">Muertes</TableCell>
                  <TableCell  align="left">Recuperados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { lastConfirmated.map( (data) => (
                <TableRow key={data.date}>
                  <TableCell align="left" style={{width : '100%'}}> {data.date.substring(5, 9)}</TableCell>
                  <TableCell align="left">{data.confirmed}</TableCell>
                  <TableCell align="left">{data.deaths}</TableCell>
                  <TableCell align="left">{data.recovered}</TableCell>
                </TableRow>

              ))}


              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>

    
    </>
    ) : (
      <Loading/>
    )
}

export default App;



import React , { useState , useEffect } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'



import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Container from '@material-ui/core/Container'

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import axios from 'axios'

//components
import Loading from './components/Loading'
import Rechart from './components/Rechart'
import Chart , {FilterData} from './components/Chart'


function getLastData(arr, last = true ){
 
  
  const arrayLenght = arr.length 
  const daysAfters = ( arrayLenght - 4 )
  const days = []

  if(!last){
    return arr[ arrayLenght - 1 ]
  }
  for (let i = daysAfters ; i < arr.length; i++) {
    
    days.push(arr[i])
    
  }

  return days

}

var formatNumber = {
  separador: ".", // separador para los miles
  sepDecimal: ',', // separador para los decimales
  formatear:function (num){
  num +='';
  var splitStr = num.split('.');
  var splitLeft = splitStr[0];
  var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
  var regx = /(\d+)(\d{3})/;
  while (regx.test(splitLeft)) {
  splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
  }
  return this.simbol + splitLeft +splitRight;
  },
  new:function(num, simbol){
  this.simbol = simbol ||'';
  return this.formatear(num);
  }
 }

function numberFormat(amount, decimals) {

  amount += ''; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) 
      return parseFloat(0).toFixed(decimals);

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = '' + amount.toFixed(decimals);

  var amount_parts = amount.split('.'),
      regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

  return amount_parts.join('.');
}


function App() {

  let url = 'https://pomber.github.io/covid19/timeseries.json'

  const  [lastConfirmated, setLastConfirmated] = useState(false) 
  const  [lastConfirmatedCountry, setLastConfirmatedCountry] = useState(false) 
  const  [lastItem, setLastItem] = useState(false) 



  const dataChart = {
    datasets : [
      {
          label : 'Lorem ipzum Dolor',
          borderWidth : 4 
      }
    ] 
  }

  const fetchApi = async () => {

    let dataLastDays = await axios.get(url)
    let daysLast = await getLastData( dataLastDays.data.Chile )

    let lastItemTemp = await getLastData(dataLastDays.data.Chile, false )
    console.log('dataLastDays.data.Chile', dataLastDays.data.Chile);
    
    await setLastConfirmatedCountry( dataLastDays.data.Chile )
    await setLastConfirmated( daysLast )
    await setLastItem( lastItemTemp )

  }

  const setData = () => {
    
    if( lastConfirmatedCountry !== false ){

      dataChart.datasets[0] =  FilterData( lastConfirmatedCountry , [ 'red' , 'green' , 'blue' ] )
      let lastIndex = dataChart.datasets[0].lastIndex
      let lastIndexObject = lastConfirmatedCountry[lastIndex] 
      
      dataChart.labels = ['Muertos : ' + dataChart.datasets[0].data[1] , 'Recuperados : ' + dataChart.datasets[0].data[0] , 'Contaminados a la fecha: ' + dataChart.datasets[0].data[2] ]
      console.log('dataChart***' , dataChart)
    }
    
  }
  console.log('lastItem' , lastItem);
  

  useEffect( () => {
    fetchApi()
  }, [])
  
  setData()
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
            component = {Paper}
            >
            <Table className={""} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell align="left"  >Día </TableCell>
                  <TableCell align="left">Infect.</TableCell>
                  <TableCell align="left">Muertes</TableCell>
                  <TableCell  align="left">Recuperados</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              { lastConfirmated.map( (data) => (
                <TableRow key={data.date}>
                  <TableCell align="center" style={{width : '100%'}}> {data.date.substring(5, 9)}</TableCell>
                  <TableCell align="right">{ formatNumber.new(data.confirmed) }</TableCell>
                  <TableCell align="right">{ formatNumber.new(data.deaths)}</TableCell>
                  <TableCell align="right">{ formatNumber.new(data.recovered)}</TableCell>
                </TableRow>

              ))}


              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Grid container style={{marginTop : '50px' }} spacing={1} >
        <Grid  item xs={12}  >
          <Typography  component="h2" className="textPrimary">
             Total contaminados : { formatNumber.new(lastItem.confirmed)  + " (" + lastItem.date + ")" } 
          
          </Typography>
        </Grid>
        <Grid  item xs={12}  >

          <Chart
            type      = { 'Pie' }
            dataChart = { dataChart }
          />
        </Grid>
      </Grid>
    </Container>

    
    </>
    ) : (
      <Loading/>
    )
}

export default App;



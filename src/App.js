import React , { useState , useEffect } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Container from '@material-ui/core/Container'
import {GetDataCountries} from './Data'

import {formatNumber} from './Commons'
//components
import Loading from './components/Loading'
import Chart , {FilterData} from './components/Chart'
import TableResponsive  from './components/Table'
import Select from 'react-select'
 import {transformData} from './components/Autocomplete'


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



function App() {

  const  [ countriesData , setCountriesData ] = useState(false) 
  const  [ countryName , setCountryName ] = useState('Chile') 


  const  [ lastConfirmated, setLastConfirmated ] = useState(false) 
  const  [ lastItem , setLastItem ] = useState(false) 
  const  [ keysCountries , setKeysCountries ] = useState([]) 

  const  [ chartData  , setChartData  ] = useState(false) 
  const  [selectAutocomplete, setSelectAutocomplete] = useState('') 

  const headerTable = [ { name:'Día',align:'center'}, {name:'Infec.', align:'left'}, {name: 'Muertes', align:'left' }, {name: 'Recuperados', align:'left' } ] 

  const dataChart = {
    datasets : [
      {
          label : 'Lorem ipzum Dolor',
          borderWidth : 4 
      }
    ] 
  }
  const setStateCountryName = (name) => setCountryName(name)

  const fetchApi = async () => {

    try {
      let dataLastDays = await GetDataCountries()
      await setCountriesData( dataLastDays )
      console.log('countriesData* : ' , dataLastDays[countryName])

      await setLastConfirmated( getLastData( dataLastDays[countryName]))
      await setLastItem( getLastData(dataLastDays[countryName], false ) )  

      await setKeysCountries( Object.keys(dataLastDays))
      await setData()
    } 
    catch (error) {
      console.log(error)
    }

  }

  const setData = async () => {
    
    if( ( countriesData[countryName] !== false ) && 
        ( countriesData[countryName] !== undefined ) ){

      dataChart.datasets[0] =  FilterData(  countriesData[countryName] , [ 'red' , 'green' , 'blue' ] )
      dataChart.labels = ['Muertos : ' + dataChart.datasets[0].data[1] , 'Recuperados : ' + dataChart.datasets[0].data[0] , 'Contaminados a la fecha: ' + dataChart.datasets[0].data[2] ]
      
    }
    
    
  }


  setData()
  
  useEffect( () => {
    fetchApi()
    setData()
    console.log('USEEFFECT ***************' )

  }, [countryName])
  
  return ( (countriesData !== false) && ( lastConfirmated !== false) ) ? (
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

    <Container style={{marginTop : '20px'}} >

      <Grid container   spacing={1} >
        <Grid  item xs={12}  >
          
          
        <Select 
            options  = { transformData( keysCountries ) }
            value    = { countryName }
            onChange = { e =>  { setStateCountryName( e.value ) }}
        />
        
        </Grid>
      </Grid>     

      <Grid container style={{marginTop : '20px'}}  spacing={1} >
        <Grid  item xs={12}  >
          
          <TableResponsive
            headers = {headerTable}
            data = {lastConfirmated}
          />
        
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

export default App
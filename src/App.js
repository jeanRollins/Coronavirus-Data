import React , { useState , useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Container from '@material-ui/core/Container'
import {GetDataCountries , GetNoticeNews} from './Data'

import {formatNumber} from './Commons'
//components
import Loading from './components/Loading'
import TableResponsive  from './components/Table'
import Select from 'react-select'
import { transformData } from './components/Autocomplete'
import Rechart from './components/Rechart'
import Bar from './components/Bar'

import {getMonth} from './Commons'
import Footer from './components/Footer'

function App() {

  const  [ countriesData , setCountriesData ] = useState(false) 

  const  [ countryName , setCountryName ] = useState('Chile') 
  const  [ lastConfirmated, setLastConfirmated ] = useState(false) 
  const  [ lastItem , setLastItem ] = useState(false) 
  const  [ keysCountries , setKeysCountries ] = useState([]) 
  const  [ chartData  , setChartData  ] = useState(false) 
  const  [ loop  , setLoop  ] = useState(false) 

  const headerTable = [ { name:'Día',align:'center'}, {name:'Infec.', align:'left'}, {name: 'Muertes', align:'left' }, {name: 'Recuperados', align:'left' } ] 

  const setStateCountryName = (name) => setCountryName(name)
  const setStateDataChart   = (chartDataTemp) => setChartData(chartDataTemp.map( (row) => (row) ))


 
  const setData = async () => {

    if( ( countriesData[countryName] !== false )     && 
        ( countriesData[countryName] !== undefined ) &&
        ( lastConfirmated !== false )  ){

      const  colors = [ 'red' , 'green' , 'blue' ]

      let dataChartTemp =  getLastData( countriesData[countryName]).map( (row) => ({
        name : row.date.substring(5, 9)   , 
        Muertos      : row.deaths ,
        Recuperados   : row.recovered  ,
        confirmed   : row.confirmed  ,
        country : countryName 
      }))

      console.log('countriesData[countryName]' , countriesData[countryName]);
      
      
      setStateDataChart( dataChartTemp )
      setLoop(false) 

    } 
  }

  function getLastData(arr, last = true ){
    const arrayLenght = countriesData[countryName].length 
    const daysAfters = ( arrayLenght - 5 )
    const days = []
  
    if( !last ){
      return arr[ arrayLenght - 1 ]
    }
    for (let i = daysAfters ; i < arr.length; i++) {
      
      days.push(arr[i])
    }
    return days
  }

  const fetchApi = async () => {
    setLoop(true) 
    try {
      let dataLastDays = await GetDataCountries()
      await setCountriesData( dataLastDays )
      await setLastConfirmated( getLastData( dataLastDays[countryName]))
      await setLastItem( getLastData(dataLastDays[countryName], false ) )  
      await setKeysCountries( Object.keys(dataLastDays))
    } 
    catch (error) {
      console.log(error)
    }
    setLoop(false) 
  }

  useEffect( () => {

    fetchApi()
    setData()
    
  }, [ loop, countryName ])

  return ( ( countriesData   !== false ) && 
           ( lastConfirmated !== false ) && 
           ( chartData       !== false  ) ) ? (
    
  <>
    <Bar
      title = {'Coronavirus Chile ' + getMonth() + ' 2020'}
    />

    <Container style={{marginTop : '20px' , marginBottom : '40px'}} >

      <Grid container   spacing={1} >
        <Grid  item xs={12}  >
        <Select 
          className       = "basic-single"
          classNamePrefix = "select"
          options         = { transformData( keysCountries ) }
          defaultValue    = { countryName }
          onChange        = { e => setStateCountryName( e.value ) }
          placeholder     = {'Seleccione país...'} 
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

      <Typography style={{ marginTop : '30px' }} variant="h6" className="textPrimary">
        {'Infectados ' + countryName + ' : ' + formatNumber.new(lastItem.confirmed)  + " (" + lastItem.date + ")" } 
      </Typography>

      <Grid container style={{ marginTop : '30px' }} spacing={1} >
        <Grid  item 
          xs={12} 
          sm={12} 
          md={6} 
          lg={6} 
          xl={6}
        >
          <Rechart
            keys  = {'Muertos'}
            data  = {chartData}
            chart = {'syncAreaChart'}
            color = {'ff3333'}
            title = { 'Total muertes : ' + formatNumber.new(lastItem.deaths )  }
          />
        </Grid>

        <Grid  item 
          xs={12} 
          sm={12} 
          md={6} 
          lg={6} 
          xl={6}
        >
          <Rechart
            keys  = {'Recuperados'}
            data  = {chartData}
            chart = {'syncAreaChart'}
            title = { 'Total recuperados : ' + formatNumber.new(lastItem.recovered)  + " (" + lastItem.date + ")" }
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop : '30px' }} spacing={1} >
        <Grid  item 
          xs={12} 
          sm={12} 
          md={6} 
          lg={6} 
          xl={6}
        >
        
        </Grid>

      </Grid>

    </Container>
    <Footer/>
  </>
    ) : (
      <Loading/>
    )
}

export default App
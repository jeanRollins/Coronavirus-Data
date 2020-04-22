import axios from 'axios'

export const GetDataCountries = async () => {

    const url   =  'https://pomber.github.io/covid19/timeseries.json'
    const data  =  await axios.get(url)
    return data.data
}
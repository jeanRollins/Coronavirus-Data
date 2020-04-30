import axios from 'axios'

export const GetDataCountries = async () => {

    const url   =  'https://pomber.github.io/covid19/timeseries.json'
    const data  =  await axios.get(url)
    return data.data
}

export const GetNoticeNews = async () => {

    //const url   =  'https://newsapi.org/v2/everything?domains=hipertextual.com&q=coronavirus&apiKey=5e2d5cf387554d43a6d80b3f57478ec2'
    const url   =  'https://newsapi.org/v2/top-headlines?sources=cnn-es&q=coronavirus&apiKey=5e2d5cf387554d43a6d80b3f57478ec2'
    const data  =  await axios.get(url)
    return data.data
}

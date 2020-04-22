import React , {useState} from 'react'
import {Line, Pie} from 'react-chartjs-2'

export default function Chart(props) {
    console.log('props***', props)
 
    const [chartsData, setChartData] = useState( props.dataChart )
    const [chart, setChart] = useState( false )


    const chartFetch = async () => {
        
        if( props.type == 'Pie' ){
            setChart( <Pie
                responsive = {true}
                data={chartsData}
            /> )
        }

        if( props.type == 'Line' ){
            setChart( 
            <Line
                data={chartsData}
            /> )
        }

    }
    
    React.useEffect( () => {
        chartFetch()
       
    }, [])

    return(
        <>
            {(chart)}
        </>
    )
}

export const FilterData = (data, colors) => {

    let lastIndex = ( ( data.length ) - 1 )

    let contaminatedActives = ( data[lastIndex].confirmed  - ( data[lastIndex].recovered + data[lastIndex].deaths )) 

    return {
        data : [
            data[lastIndex].deaths    ,
            data[lastIndex].recovered ,
            contaminatedActives 
        ] ,
        backgroundColor : colors ,
        lastIndex : lastIndex
    }
}

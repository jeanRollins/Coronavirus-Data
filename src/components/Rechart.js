import React, { useState, useEffect } from 'react'
import {
  PieChart, Pie, Sector, Cell, Legend, Tooltip
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const data01 = [
  { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



export default function  Rechart(props){

    let lastDay =  (props.dates.length - 1 )

    const [chart , setChart] = useState(false)
    const [dates , setDates] = useState(  translateData(props.dates[lastDay]) )


    useEffect( () => {

      if(  props.type == 'PieChartWithCustomizedLabel' ){
        setChart( PieChartWithCustomizedLabel(dates) )
      }
      if(  props.type == 'TwoSimplePieChart' ){
        setChart( TwoSimplePieChart(dates) )
      }
      if(  props.type == 'TwoLevelPieChart' ){
        setChart( TwoLevelPieChart(dates) )
      }
    
    }, [])

  

    return (
        <>
            {chart}
        </>
    )
  
}

function translateData (  dates ){

  return[ 
    {
      name  : dates.recovered  ,
      
      value : dates.recovered
    },
    {
      name  : dates.deaths  ,
      value : dates.deaths
    },
    {
      name  : dates.confirmed  ,
      value : dates.confirmed
    },
 
  ]
}

function TwoSimplePieChart(dates){


  return (
    <>
      <PieChart width={400} height={400}>
        <Pie dataKey="value" isAnimationActive={false} data={dates} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
        <Tooltip />
      </PieChart>
    </>
  )
}

function TwoLevelPieChart(dates){
  console.log('TwoLevelPieChart**' , dates);

  
  return (
    <>
      <PieChart width={400} height={400}>
        <Pie data={dates} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
      </PieChart>
    </>
  )
}

function PieChartWithCustomizedLabel(dates){
    
    console.log('data', dates)
    
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={dates}
                cx={200}
                cy={200}
                labelLine={false}
                
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                >
                {
                    dates.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
        </PieChart>
    )
}

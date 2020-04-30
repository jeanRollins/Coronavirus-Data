import React from 'react'
import Typography from '@material-ui/core/Typography'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,PieChart, Pie, Sector, Cell
} from 'recharts'

export const FilterData = (data) => {

  let lastIndex = ( ( data.length ) - 1 )
  let contaminatedActives = ( data[lastIndex].confirmed  - ( data[lastIndex].recovered + data[lastIndex].deaths )) 
  return {
      deaths : data[lastIndex].deaths    ,
      recovered : data[lastIndex].recovered ,
      contaminatedActives 
  }
}

export default function Rechart(props) {
  let chart = null 

  if( props.chart == 'syncAreaChart' ) {
    chart = syncAreaChart(props.data, props.keys, props.color ,props.title) 
  }
  if( props.chart == 'PieChartWithCustomizedLabel' ) {
    chart = PieChartWithCustomizedLabel(props.data) 
  }
  
  return (
    <> 
      {chart}
    </> 
  )
}

function syncAreaChart (dataChart, key ,color = null ,title ) {

  color = ( color === null ) ? '82ca9d' : color 

  return(
    <>
      <Typography style={{ marginBottom : '20px' }}  component="h2" className="textPrimary">
        {title} 
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
     
            data={dataChart}
            syncId="anyId"
            margin={{
                top: 10, right: 30, left: 0, bottom: 0,
            }}
            >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area 
            type = "monotone" 
            dataKey = {key} 
            stroke = { "#" + color } 
            fill = { "#" + color } 
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  )
}




//
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};




export const PieChartWithCustomizedLabel = (dataChart) => {

 console.log('dataChart***' , dataChart);

 const datas = [
  { name: 'Group A', value: dataChart[4].confirmed },
  { name: 'Group B', value: dataChart[4].Muertos },
];
  
    return (
        <PieChart width={400} height={400}>
        <Pie
          data={datas}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            datas.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  
}
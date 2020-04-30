import React, { PureComponent , useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts'

import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'


export default function ChartTest() {

    const [state, setstate] = useState([
        {
          name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
          name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
          name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
          name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        }
    ])

    const clickTest = () => {

        setstate([
            {
              name: 'Page A', uv: 3000, pv: 4400, amt: 2400,
            },
            {
              name: 'Page B', uv: 7000, pv: 3398, amt: 6810,
            },
            {
              name: 'Page C', uv: 8000, pv: 9800, amt: 5290,
            },
            {
              name: 'Page D', uv: 2780, pv: 6908, amt: 4000,
            }
          ])

        console.log('click**');
        
    } 

    return (
        <>
            <Button variant="outlined" onClick={ e => clickTest() } color="primary">
                Primary
            </Button>
            <h4>A demo of synchronized AreaCharts</h4>
            <AreaChart
                width={500}
                height={200}
                data={state}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
            <p>Maybe some other content</p>
            <AreaChart
                width={500}
                height={200}
                data={state}
                syncId="anyId"
                margin={{
                    top: 10, right: 30, left: 0, bottom: 0,
                }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
        </>

    )
}

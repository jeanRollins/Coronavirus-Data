import React , {useState} from 'react'
import {Chart} from 'react-chartjs-2'

export default function ChartTest(){
    var mixedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Bar Dataset',
                data: [10, 20, 30, 40]
            }, {
                label: 'Line Dataset',
                data: [50, 50, 50, 50],
    
                // Changes this dataset to become a line
                type: 'line'
            }],
            labels: ['January', 'February', 'March', 'April']
        },
        options: options
    });

    return(
        mixedChart
    )
} 
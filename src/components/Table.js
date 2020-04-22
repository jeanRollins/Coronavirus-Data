import React from 'react'

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {formatNumber} from '../Commons'


function TableResponsive(props) {
    
    return(
        <>
            <TableContainer 
                component = {Paper}
                >
                <Table className={""} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        { Object.keys(props.headers).map( (row) => {
                            let dataTemp = props.headers[row]

                            return <TableCell 
                                        key={row} 
                                        align={dataTemp.align}  
                                    > 
                                        {dataTemp.name}
                                    </TableCell>
            
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                { props.data.map( (data) => (
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
        </>
    )
}

export default TableResponsive
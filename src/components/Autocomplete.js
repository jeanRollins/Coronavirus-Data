
import React, { useState } from 'react'
import Select from 'react-select'
import Typography from '@material-ui/core/Typography'


const optionsTest = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export function transformData(data){
    const arrayToMap = data.map( (row) => (
        { value: row, label: row }
    ))
    return arrayToMap
}

const AutocompleteSelect = (props) => {

    

    const  [dataSelect, setDataSelect] = useState('') 

    console.log('dataSelect' , dataSelect)
    

    const options = transformData(props.data)
    return (
        <>
            <Select 
                options={options}
                value={dataSelect}
            />
        </>
    )
}

export default AutocompleteSelect
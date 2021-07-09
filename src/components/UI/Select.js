import React from 'react'
import {
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText
} from '@material-ui/core'

const Select = ({
    label,
    name,
    value,
    error,
    items,
    ...rest
}) => {
    return (
        <FormControl 
            margin="normal" 
            fullWidth 
            variant="outlined"
            {...(error && { error: true })}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                fullWidth
                label={label}
                name={name}
                value={value}
                {...rest}
            >
                {
                    items && items.map((item, index) => (
                        <MenuItem key={index} value={item.id}>{item.title}</MenuItem>
                    ))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select

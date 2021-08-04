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
    error,
    items,
    isObject,
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
                label={label}
                {...rest}
            >
                {isObject ? items && items.map((item, index) => (
                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                    ))
                    : items && items.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select

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
                {
                    items && items.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    ))
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

export default Select

import React from 'react'
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup as MuiRadioGroup,
    Radio
} from '@material-ui/core'

const RadioGroup = ({
    name,
    value,
    label,
    items,
    ...rest
}) => {
    return (
        <FormControl margin="normal" fullWidth>
            <FormLabel>{label}</FormLabel>
            <MuiRadioGroup
                row
                name={name}
                value={value}
                {...rest}
            >
                {
                    items && items.map((item, index) => (
                        <FormControlLabel key={index} value={item.id} control={<Radio color="primary" />} label={item.title} />
                    ))
                }
            </MuiRadioGroup>
        </FormControl>
    )
}

export default RadioGroup

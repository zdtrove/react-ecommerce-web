import React from 'react'
import {
    makeStyles,
    FormControl,
    InputLabel,
    Select as MuiSelect,
    MenuItem,
    FormHelperText
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSelect-root': {
            padding: `${theme.spacing(1.3)}px ${theme.spacing(1.8)}px`,
            [theme.breakpoints.up('sm')]: {
                padding: `${theme.spacing(2.25)}px ${theme.spacing(1.8)}px`
            }
        },
        '& .MuiInputLabel-outlined': {
            transform: `translate(9px, 13px) scale(1)`,
            [theme.breakpoints.up('sm')]: {
                transform: `translate(14px, 20px) scale(1)`
            }
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: `translate(14px, -6px) scale(0.75)`
        }
    },
    paddingLv2: {
        paddingLeft: 50
    },
    paddingLv3: {
        paddingLeft: 100
    },
    paddingLv4: {
        paddingLeft: 150
    },
    paddingLv5: {
        paddingLeft: 200
    }
}))

const Select = ({
    label,
    error,
    items,
    isObject,
    ...rest
}) => {
    const classes = useStyles()

    return (
        <FormControl 
            margin="normal" 
            fullWidth
            variant="outlined"
            {...(error && { error: true })}
            className={classes.root}
        >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                {...rest}
            >
                {isObject ? items && items.map((item, index) => {
                        let leveClass
                        if (item.level === 2) leveClass = classes.paddingLv2
                        if (item.level === 3) leveClass = classes.paddingLv3
                        if (item.level === 4) leveClass = classes.paddingLv4
                        if (item.level === 5) leveClass = classes.paddingLv5
                        return <MenuItem
                            className={leveClass}
                            key={index} 
                            value={item.id}
                        >{item.name}</MenuItem>
                    })
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

import React from 'react'
import { TextField } from '@material-ui/core'

const Input = ({
	variant,
	fullWidth,
	margin,
	name,
	label,
	value,
	onChange,
	error,
	...rest
}) => {
	return (
		<TextField
			variant={variant || "outlined"}
			fullWidth={fullWidth || true}
			margin={margin || "normal"}
			name={name}
			label={label}
			value={value}
			onChange={onChange}
			{...(error && { error: true, helperText: error })}
			{...rest}
		/>
	)
}

export default Input
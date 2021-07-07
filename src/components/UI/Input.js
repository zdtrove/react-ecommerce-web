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
	...rest
}) => {
	return (
		<TextField
			variant={variant || "outlined"}
			fullWidth={fullWidth || "true"}
			margin={margin || "normal"}
			name={name}
			label={label}
			value={value}
			onChange={onChange}
			{...rest}
		/>
	)
}

export default Input
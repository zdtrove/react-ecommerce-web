import React from 'react'
import { TextField, InputAdornment } from '@material-ui/core'

const Input = ({
	variant,
	fullWidth,
	margin,
	type,
	error,
	startIcon,
	endIcon,
	...rest
}) => {
	const adornment = () => {
		const result = {}
		result.startAdornment = startIcon && <InputAdornment position="start">
			{startIcon}
		</InputAdornment>
		result.endAdornment = endIcon && <InputAdornment position="end">
			{endIcon}
		</InputAdornment>

		return { InputProps: result }
	}
	return (
		<TextField
			variant={variant || "outlined"}
			fullWidth={fullWidth || true}
			margin={margin || "normal"}
			type={type || "text"}
			{...((startIcon || endIcon) && adornment())}
			{...(error && { error: true, helperText: error })}
			{...rest}
		/>
	)
}

export default Input
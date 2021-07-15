import React from 'react'
import {
	FormGroup,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Checkbox
} from '@material-ui/core'

const Checkboxes = ({
	label,
	name,
	items,
	formikValue,
	error,
	...rest
}) => {
	return <FormControl margin="normal">
		<FormLabel>{label}</FormLabel>
		<FormGroup row>
			{items && items.map((item, index) => (
				<FormControlLabel
					key={index}
					control={<Checkbox
						name={name}
						value={item}
						checked={formikValue.includes(item)}
						{...rest}
					/>}
					label={item}
				/>
			))}
		</FormGroup>
		<FormHelperText>{error}</FormHelperText>
	</FormControl>
}

export default Checkboxes
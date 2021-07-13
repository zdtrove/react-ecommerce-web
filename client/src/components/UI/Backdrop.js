import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles, Backdrop as MuiBackdrop, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.tooltip + 1
	}
}))

const Backdrop = () => {
	const { ui: { backdrop } } = useSelector(state => state)
	const classes = useStyles()

	return <MuiBackdrop
		classes={{ root: classes.backdrop }}
		open={backdrop}
	>
		<CircularProgress />
	</MuiBackdrop>
}

export default Backdrop
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uiTypes } from '../../redux/types'
import { makeStyles, Backdrop as MuiBackdrop, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.tooltip + 1
	}
}))

const Backdrop = () => {
	const { ui } = useSelector(state => state)
	const dispatch = useDispatch()
	const classes = useStyles()

	return <MuiBackdrop
		classes={{ root: classes.backdrop }}
		open={ui.backdrop}
		onClick={() => dispatch({ type: uiTypes.HIDE_BACKDROP, payload: false })}
	>
		<CircularProgress />
	</MuiBackdrop>
}

export default Backdrop
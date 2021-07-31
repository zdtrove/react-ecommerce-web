import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Layout from '../components/layouts/Layout'
import {
	makeStyles,
	Toolbar,
	Paper,
	Box,
	Grid,
	Typography,
	InputAdornment,
	Tooltip,
	Zoom,
	IconButton,
	Avatar
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Input, Button } from '../components/UI'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import { login } from '../redux/actions/auth.action'

const initialValues = {
	email: '',
	password: ''
}

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required")
		.max(32, "Max email length is 32"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Min password length is 6")
		.max(24, "Max password length is 24")
})

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(10),
		'& .MuiFormHelperText-root': {
			marginLeft: 0,
			marginTop: '3px'
		},
		'& .MuiOutlinedInput-adornedEnd': {
			paddingRight: '5px'
		},
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(3),
			paddingLeft: theme.spacing(1.5),
			paddingRight: theme.spacing(1.5)
		},
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginBottom: theme.spacing(2),
		'& .MuiAvatar-root': {
			background: green[500],
			margin: theme.spacing(2)
		}
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
		'& button': {
			marginLeft: theme.spacing(1)
		},
		marginTop: theme.spacing(1.5)
	},
	tooltip: {
		margin: '7px 0'
	}
}))

const Login = () => {
	const classes = useStyles()
	const { auth } = useSelector(state => state)
	const dispatch = useDispatch()
	const history = useHistory()
	const [showPass, setShowPass] = useState(false)
	const [typePass, setTypePass] = useState('password')

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: values => {
			dispatch(login(values))
		}
	})

	const handleShowPass = () => {
		setShowPass(!showPass)
		setTypePass(showPass ? 'password' : 'text')
	}

	useEffect(() => {
		if (auth.isAuthenticated) history.push('/')
	}, [auth.isAuthenticated, history])

    return (
        <Layout maxWidth="sm">
            <Toolbar />
            <Paper className={classes.root} component={Box} p={3} pt={2} mx="auto" maxWidth="xs">
				<Box className={classes.header}>
					<Avatar>
						<LockRoundedIcon color="inherit" />
					</Avatar>
					<Typography variant="h4">Login</Typography>
				</Box>
				<form onSubmit={formik.handleSubmit}>
					<Grid container>
						<Grid item sm={12}>
							<Input
								name="email"
								label="Email"
								type="email"
								value={formik.values.email}
								{...formik.getFieldProps('email')}
								error={formik.touched.email && formik.errors.email}
								startIcon={<EmailRoundedIcon />}
							/>
							<Input
								name="password"
								label="Password"
								type={typePass}
								value={formik.values.password}
								{...formik.getFieldProps('password')}
								error={formik.touched.password && formik.errors.password}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockRoundedIcon />
										</InputAdornment>
									),
									endAdornment: (
										formik.values.password && <InputAdornment position="end" onClick={handleShowPass}>
											<Tooltip classes={{ tooltipPlacementTop: classes.tooltip }} TransitionComponent={Zoom} arrow title={`${showPass ? 'Hide Password' : 'Show Password'}`} placement="top">
												<IconButton size="medium">
													{showPass 
														? <VisibilityOffRoundedIcon />
														: <VisibilityRoundedIcon />
													}
												</IconButton>
											</Tooltip>
										</InputAdornment>
									)
								}}
							/>
							<div className={classes.buttons}>
								<Button type="submit" text="LOGIN" />
								<Button onClick={() => formik.resetForm()} color="secondary" text="RESET" />
							</div>
						</Grid>
					</Grid>
				</form>
            </Paper>
        </Layout>
    )
}

export default Login

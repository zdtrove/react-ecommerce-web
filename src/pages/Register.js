import React, { useState } from 'react'
import Layout from '../components/layouts/Layout'
import {
	makeStyles,
	Toolbar,
	Paper,
	Box,
	Grid,
	Button,
	Typography,
	InputAdornment,
	Tooltip,
	IconButton,
	Backdrop,
	CircularProgress,
	Zoom,
	Avatar
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import { Input, RadioGroup, Select } from '../components/UI'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';

const initialValues = {
	fullName: '',
	email: '',
	phone: '',
	gender: 'male',
	city: '',
	password: '',
	passwordConfirm: ''
}

const validationSchema = Yup.object().shape({
	fullName: Yup.string()
		.required("Full Name is required")
		.max(24, "Full Name max length is 24"),
	email: Yup.string()
		.email("Email format incorrect")
		.required("Email is required")
		.max(32, "Email max length is 32"),
	phone: Yup.string()
		.required("Phone is required")
		.max(10, "Phone max length is 10"),
	city: Yup.string()
		.required("City is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password min length is 6")
		.max(24, "Password max length is 24"),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], "Password not matched")
})

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(10),
		marginBottom: theme.spacing(5),
		'& .MuiFormHelperText-root': {
			marginLeft: 0,
			marginTop: '3px'
		},
		'& .MuiOutlinedInput-adornedEnd': {
			paddingRight: '5px'
		},
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(5),
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
	},
	backdrop: {
		zIndex: theme.zIndex.tooltip + 1
	}
}))

const gender = [
	{ id: 'male', title: 'Male' },
	{ id: 'female', title: 'Female' },
	{ id: 'other', title: 'Other' }
]

const city = [
	{ id: 1, title: "Ha Noi" },
	{ id: 2, title: "Ho Chi Minh" },
	{ id: 3, title: "Da Nang" }
]

const Register = () => {
	const classes = useStyles()
	const [showPass, setShowPass] = useState(false)
	const [showPassCf, setShowPassCf] = useState(false)
	const [typePass, setTypePass] = useState("password")
	const [typePassCf, setTypePassCf] = useState("password")
	const [showBackdrop, setShowBackdrop] = useState(false)

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: values => {
			console.log(values)
			setShowBackdrop(true)
		}
	})

	const handleShowPass = () => {
		setShowPass(!showPass)
		setTypePass(showPass ? 'password' : 'text')
	}

	const handleShowPassCf = () => {
		setShowPassCf(!showPassCf)
		setTypePassCf(showPassCf ? 'password' : 'text')
	}

    return (
        <Layout maxWidth="sm">
            <Toolbar />
			<Backdrop classes={{ root: classes.backdrop }} open={showBackdrop}>
				<CircularProgress />
			</Backdrop>
            <Paper className={classes.root} component={Box} p={3} pt={2} mx="auto">
				<Box className={classes.header}>
					<Avatar>
						<LockRoundedIcon color="inherit" />
					</Avatar>
					<Typography variant="h4">Register</Typography>
				</Box>
            	<form onSubmit={formik.handleSubmit}>
	            	<Grid container>
	            		<Grid item sm={12}>
	            			<Input
	            				name="fullName"
	            				label="Full Name"
	            				value={formik.values.fullName}
	            				{...formik.getFieldProps('fullName')}
	            				error={formik.touched.fullName && formik.errors.fullName}
								startIcon={<AccountCircleRoundedIcon />}
	            			/>
	            			<Input
	            				name="email"
	            				label="Email"
	            				value={formik.values.email}
	            				{...formik.getFieldProps('email')}
	            				error={formik.touched.email && formik.errors.email}
								startIcon={<EmailRoundedIcon />}
	            			/>
							<Input
	            				name="phone"
	            				label="Phone"
	            				value={formik.values.phone}
	            				{...formik.getFieldProps('phone')}
	            				error={formik.touched.phone && formik.errors.phone}
								startIcon={<PhoneAndroidRoundedIcon />}
	            			/>
							<RadioGroup 
								row 
								name="gender"
								label="Gender"
								value={formik.values.gender}
								{...formik.getFieldProps('gender')}
								items={gender}
							/>
							<Select
								label="City"
								name="city"
								value={formik.values.city}
								error={formik.touched.city && formik.errors.city}
								{...formik.getFieldProps('city')}
								items={city}
							/>
	            			<Input
								type={typePass}
	            				name="password"
	            				label="Password"
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
	            			<Input
								type={typePassCf}
	            				name="passwordConfirm"
	            				label="Password Confirm"
	            				value={formik.values.passwordConfirm}
	            				{...formik.getFieldProps('passwordConfirm')}
	            				error={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<LockRoundedIcon />
										</InputAdornment>
									),
									endAdornment: (
										formik.values.passwordConfirm && <InputAdornment position="end" onClick={handleShowPassCf}>
											<Tooltip classes={{ tooltipPlacementTop: classes.tooltip }} TransitionComponent={Zoom} arrow title={`${showPassCf ? 'Hide Password' : 'Show Password'}`} placement="top">
												<IconButton size="medium">
													{showPassCf
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
	            				<Button type="submit" variant="contained" color="primary">Register</Button>
	            				<Button onClick={() => formik.resetForm()} variant="contained" color="secondary">Reset</Button>
	            			</div>
	            		</Grid>
	            	</Grid>
	            </form>
            </Paper>
        </Layout>
    )
}

export default Register

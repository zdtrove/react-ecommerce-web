import React from 'react'
import Layout from '../components/layouts/Layout'
import {
	makeStyles,
	Toolbar,
	Paper,
	Box,
	Grid,
	Button,
	Typography
} from '@material-ui/core'
import { Input } from '../components/UI'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
	fullName: '',
	email: '',
	password: '',
	phone: ''
}

const validationSchema = Yup.object().shape({
	fullName: Yup.string()
		.required("Full Name is required")
		.max(24, "Full Name max length is 24"),
	email: Yup.string()
		.email("Email format incorrect")
		.required("Email is required")
		.max(32, "Email max length is 32"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password min length is 6")
		.max(24, "Password max length is 24"),
	passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], "Password not matched"),
	phone: Yup.string()
		.required("Phone is required")
		.max(10, "Phone max length is 10")
})

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(6),
		'& .MuiFormHelperText-root': {
			marginLeft: 0,
			marginTop: '3px'
		}
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
		'& button': {
			marginLeft: theme.spacing(1)
		}
	}
}))

const Register = () => {
	const classes = useStyles()
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: values => {
			console.log(values)
		}
	})

    return (
        <Layout>
            <Toolbar />
            <Paper className={classes.root} component={Box} p={4} pt={1} mx="auto" width="50%">
            	<Typography variant="h4">Register</Typography>
            	<form onSubmit={formik.handleSubmit}>
	            	<Grid container>
	            		<Grid item sm={12}>
	            			<Input
	            				name="fullName"
	            				label="Full Name"
	            				value={formik.values.fullName}
	            				{...formik.getFieldProps('fullName')}
	            				error={formik.touched.fullName && formik.errors.fullName}
	            			/>
	            			<Input
	            				name="email"
	            				label="Email"
	            				value={formik.values.email}
	            				{...formik.getFieldProps('email')}
	            				error={formik.touched.email && formik.errors.email}
	            			/>
	            			<Input
	            				name="password"
	            				label="Password"
	            				value={formik.values.password}
	            				{...formik.getFieldProps('password')}
	            				error={formik.touched.password && formik.errors.password}
	            			/>
	            			<Input
	            				name="passwordConfirm"
	            				label="Password Confirm"
	            				value={formik.values.passwordConfirm}
	            				{...formik.getFieldProps('passwordConfirm')}
	            				error={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
	            			/>
	            			<Input
	            				name="phone"
	            				label="Phone"
	            				value={formik.values.phone}
	            				{...formik.getFieldProps('phone')}
	            				error={formik.touched.phone && formik.errors.phone}
	            			/>
	            			<div className={classes.buttons}>
	            				<Button variant="contained" color="primary">Register</Button>
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

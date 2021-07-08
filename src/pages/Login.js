import React from 'react'
import Layout from '../components/layouts/Layout'
import {
	makeStyles,
	Toolbar,
	Paper,
	Box,
	Grid,
	Button,
	Typography,
	InputAdornment
} from '@material-ui/core'
import { Input } from '../components/UI'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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

const Login = () => {
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
            	<Typography variant="h4">Login</Typography>
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
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{formik.values.email && <span>
												{formik.values.email.length}/32
											</span>}
										</InputAdornment>
									)
								}}
							/>
							<Input
								name="password"
								label="Password"
								type="password"
								value={formik.values.password}
								{...formik.getFieldProps('password')}
								error={formik.touched.password && formik.errors.password}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											{formik.values.password && <span>
												{formik.values.password.length}/24
											</span>}
										</InputAdornment>
									)
								}}
							/>
							<div className={classes.buttons}>
								<Button type="submit" variant="contained" color="primary">Login</Button>
								<Button onClick={() => formik.resetForm()} variant="contained" color="secondary">Reset</Button>
							</div>
						</Grid>
					</Grid>
				</form>
            </Paper>
        </Layout>
    )
}

export default Login

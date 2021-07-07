import React from 'react'
import Layout from '../components/layouts/Layout'
import {
	makeStyles,
	Toolbar,
	Paper,
	Box,
	Grid,
	TextField,
	Button,
	Typography
} from '@material-ui/core'
import { useForm, Form } from '../hooks/useForm'
import { Input } from '../components/UI'

const initialValues = {
	email: '',
	password: ''
}

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(6)
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
		'& button': {
			marginLeft: theme.spacing(0.5)
		}
	}
}))

const Login = () => {
	const classes = useStyles()
	const {
		values,
		setValues,
		handleInputChange,
		resetForm
	} = useForm(initialValues)

	const handleSubmit = () => {
		console.log(values)
	}

    return (
        <Layout>
            <Toolbar />
            <Paper className={classes.paper} component={Box} p={4} pt={1} mx="auto" width="50%">
            	<Typography variant="h4">Login</Typography>
            	<Form onSubmit={handleSubmit}>
	            	<Grid container>
	            		<Grid item sm={12}>
	            			<Input
	            				name="email"
	            				label="Email"
	            				value={values.email}
	            				onChange={handleInputChange}
	            			/>
	            			<Input
	            				name="password"
	            				label="Password"
	            				value={values.password}
	            				onChange={handleInputChange}
	            			/>
	            			<div className={classes.buttons}>
	            				<Button variant="contained" color="primary">Login</Button>
	            				<Button variant="contained" color="secondary">Reset</Button>
	            			</div>
	            		</Grid>
	            	</Grid>
	            </Form>
            </Paper>
        </Layout>
    )
}

export default Login

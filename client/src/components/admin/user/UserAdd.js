import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	makeStyles,
    DialogContent,
    DialogActions,
    IconButton,
    InputAdornment,
    Zoom,
    Tooltip
} from '@material-ui/core'
import { Input, RadioGroup, Select, Checkboxes, Button, Dialog } from '../../../components/UI'
import { userConst } from '../../../constants'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addUser } from '../../../redux/actions/user.action'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';

const { GENDER, CITY, PAYMENT_METHODS, ROLES } = userConst

const useStyles = makeStyles(theme => ({
    tooltip: {
        margin: '7px 0'
    }
}))

const validationSchema = Yup.object().shape({
    fullname: Yup.string()
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
        .required("Password confirm is required")
        .oneOf([Yup.ref('password'), null], "Password not matched")
})

const initialValues = {
    fullname: '',
    email: '',
    phone: '',
    gender: 'Male',
    city: '',
    payments: [],
    password: '',
    passwordConfirm: '',
    role: 'user'
}

const UserAdd = ({
    showUserAdd,
    setShowUserAdd
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [showPass, setShowPass] = useState(false)
    const [showPassCf, setShowPassCf] = useState(false)
    const [typePass, setTypePass] = useState("password")
    const [typePassCf, setTypePassCf] = useState("password")

    const handlePayments = e => {
        const { checked, value } = e.target;
        if (checked) {
          formik.setFieldValue("payments", [...formik.values.payments, value]);
        } else {
          formik.setFieldValue(
            "payments",
            formik.values.payments.filter((v) => v !== value)
          );
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            await dispatch(addUser(values))
            setShowUserAdd(false)
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

    return <Dialog
            show={showUserAdd}
            setShow={setShowUserAdd}
            title="USER EDIT"
        >
            <DialogContent dividers>
                <form onSubmit={formik.handleSubmit}>
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
                        name="fullname"
                        label="Full Name"
                        value={formik.values.fullname}
                        {...formik.getFieldProps('fullname')}
                        error={formik.touched.fullname && formik.errors.fullname}
                        startIcon={<AccountCircleRoundedIcon />}
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
                        items={GENDER}
                    />
                    <RadioGroup 
                        row 
                        name="role"
                        label="Role"
                        value={formik.values.role}
                        {...formik.getFieldProps('role')}
                        items={ROLES}
                    />
                    <Select
                        label="City"
                        name="city"
                        value={formik.values.city}
                        error={formik.touched.city && formik.errors.city}
                        {...formik.getFieldProps('city')}
                        items={CITY}
                    />
                    <Checkboxes
                        name="payments"
                        label="Payment Methods"
                        items={PAYMENT_METHODS}
                        formikValue={formik.values.payments}
                        onChange={handlePayments}
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
                                    <Tooltip 
                                        classes={{ tooltipPlacementTop: classes.tooltip }} 
                                        TransitionComponent={Zoom} 
                                        arrow 
                                        title={`${showPass ? 'Hide Password' : 'Show Password'}`} 
                                        placement="top"
                                    >
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
                                    <Tooltip 
                                        classes={{ tooltipPlacementTop: classes.tooltip }} 
                                        TransitionComponent={Zoom} 
                                        arrow 
                                        title={`${showPassCf ? 'Hide Password' : 'Show Password'}`} 
                                        placement="top"
                                    >
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button disabled={!(formik.isValid && formik.dirty)} onClick={() => formik.submitForm()} text="SAVE" />
                <Button onClick={() => formik.resetForm()} color="secondary" text="RESET" />
            </DialogActions>
        </Dialog>
    
}

export default UserAdd

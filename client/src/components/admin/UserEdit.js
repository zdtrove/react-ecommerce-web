import React from 'react'
import { useDispatch } from 'react-redux'
import {
	makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { Input, RadioGroup, Select, Checkboxes, Button } from '../../components/UI'
import { userConst } from '../../constants'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateUser } from '../../redux/actions/user.action'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';

const { GENDER, CITY, PAYMENT_METHODS, ROLES } = userConst

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 500,
        maxWidth: 500,
        maxHeight: 500,
        "& .MuiDialogContent-root::-webkit-scrollbar": {
            display: 'none'
        }
    },
    marginBtn: {
        margin: theme.spacing(.5)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
}))

const validationSchema = Yup.object().shape({
    fullname: Yup.string()
        .required("Full Name is required")
        .max(24, "Full Name max length is 24"),
    phone: Yup.string()
        .required("Phone is required")
        .max(10, "Phone max length is 10"),
    city: Yup.string()
        .required("City is required")
})

const UserCard = ({
    showUserEdit,
    setShowUserEdit,
    userRecord
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { _id, email, fullname, phone, gender, city, payments, role } = userRecord

    let initialValues = {
        email,
        fullname,
        phone,
        gender,
        city,
        payments,
        role
    }

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
            await dispatch(updateUser({_id, ...values}))
            setShowUserEdit(false)
        }
    })

    return <Dialog
            classes={{ paper: classes.root }}
            open={showUserEdit}
        >
            <DialogTitle>
                USER EDIT
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setShowUserEdit(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <form id="userEditForm" onSubmit={formik.handleSubmit}>
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        value={formik.values.email}
                        disabled
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button disabled={!(formik.isValid && formik.dirty)} onClick={() => formik.submitForm()} text="SAVE" />
                <Button onClick={() => formik.resetForm()} color="secondary" text="RESET" />
            </DialogActions>
        </Dialog>
    
}

export default UserCard

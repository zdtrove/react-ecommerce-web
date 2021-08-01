import React from 'react'
import {
	makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '../../components/UI'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 500,
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
    },
    input: {
        width: '100%'
    }
}))

const UserDetail = ({
    showUserDetail,
    setShowUserDetail,
    userRecord
}) => {
    const classes = useStyles()
    const { fullname, email, phone, city, gender, payments, role } = userRecord

    return <>
        <Dialog
            classes={{ paper: classes.root }}
            open={showUserDetail}
        >
            <DialogTitle>
                USER DETAIL
                <IconButton aria-label="close" className={classes.closeButton} onClick={() => setShowUserDetail(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="h6">Full Name</Typography>
                <DialogContentText>{fullname}</DialogContentText>
                <Typography variant="h6">Email</Typography>
                <DialogContentText>{email}</DialogContentText>
                <Typography variant="h6">Phone</Typography>
                <DialogContentText>{phone}</DialogContentText>
                <Typography variant="h6">City</Typography>
                <DialogContentText>{city}</DialogContentText>
                <Typography variant="h6">Role</Typography>
                <DialogContentText>{role}</DialogContentText>
                <Typography variant="h6">Payment Methods</Typography>
                <DialogContentText>
                    {payments.map((pay, idx) => (
                        <Button className={classes.marginBtn} key={idx} text={pay} />
                    ))}
                </DialogContentText>
                <Typography variant="h6">Gender</Typography>
                <DialogContentText>{gender}</DialogContentText>
            </DialogContent>
        </Dialog>
    </>
}

export default UserDetail

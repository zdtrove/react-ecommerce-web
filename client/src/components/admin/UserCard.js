import React from 'react'
import {
	makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 500
    },
    marginBtn: {
        margin: theme.spacing(.5)
    }
}))

const UserCard = ({
    showUserDetail,
    setShowUserDetail,
    userDetail
}) => {
    const classes = useStyles()

    return <>
        {userDetail && <Dialog
            classes={{ paper: classes.root }}
            open={showUserDetail}
        >
            <DialogTitle>User Detail</DialogTitle>
            <DialogContent dividers>
                <Typography variant="h5">Full Name</Typography>
                <DialogContentText>{userDetail.fullname}</DialogContentText>
                <Typography variant="h5">Email</Typography>
                <DialogContentText>{userDetail.email}</DialogContentText>
                <Typography variant="h5">Phone</Typography>
                <DialogContentText>{userDetail.phone}</DialogContentText>
                <Typography variant="h5">City</Typography>
                <DialogContentText>{userDetail.city}</DialogContentText>
                <Typography variant="h5">Role</Typography>
                <DialogContentText>{userDetail.role}</DialogContentText>
                <Typography variant="h5">Payment Methods</Typography>
                <DialogContentText>
                    {userDetail.payments.map((pay, idx) => (
                        <Button className={classes.marginBtn} key={idx} size="small" variant="contained" color="primary">{pay}</Button>
                    ))}
                </DialogContentText>
                <Typography variant="h5">Gender</Typography>
                <DialogContentText>{userDetail.gender}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => setShowUserDetail(false)}>Close</Button>
            </DialogActions>
        </Dialog>}
    </>
}

export default UserCard

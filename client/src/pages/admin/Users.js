import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../components/admin/layouts/LayoutAdmin'
import { Input, Button } from '../../components/UI'
import { getUsers, deleteUser } from '../../redux/actions/user.action'
import {
	makeStyles,
	Paper,
	TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Card,
    Typography,
    Toolbar,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import UserDetail from '../../components/admin/UserDetail'
import UserEdit from '../../components/admin/UserEdit'
import UserAdd from '../../components/admin/UserAdd'

const useStyles = makeStyles(theme => ({
    header: {
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(3)
    },
    headerIcon: {
        display: 'inline-block',
        padding: theme.spacing(2),
        color: '#3c44b1'
    },
    headerTitle: {
        paddingLeft: theme.spacing(4),
        '& .MuiTypography-subtitle2': {
            opacity: '0.6'
        }
    },
	marginBtn: {
		margin: theme.spacing(.5)
	},
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    dialogActions: {
        justifyContent: "center"
    }
}))

const Users = () => {
    const { user } = useSelector(state => state)
    const { users } = user
	const dispatch = useDispatch()
	const classes = useStyles()
	const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const [allUsers, setAllUsers] = useState([])
    const [showUserDetail, setShowUserDetail] = useState(false)
    const [showUserEdit, setShowUserEdit] = useState(false)
    const [showUserDelete, setShowUserDelete] = useState(false)
    const [showUserAdd, setShowUserAdd] = useState(false)
    const [userRecord, setUserRecord] = useState(null)

    useEffect(() => {
        dispatch(getUsers()).then(users => setAllUsers(users))
    }, [dispatch])

    const onPageChange = (event, nextPage) => {
        setPage(nextPage)
    }

    const onRowsPerPageChange = e => {
        setRowsPerPage(e.target.value)
        setPage(0)
    }

    const handleSearch = e => {
        const { value } = e.target
        let usersFilter

        if (value) {
            usersFilter = allUsers.filter(user => user.fullname.toLowerCase().includes(value))
        } else {
            usersFilter = users
        }

        setAllUsers(usersFilter)
    }

    const handleDeleteUser = async id => {
        await dispatch(deleteUser(id))
        setShowUserDelete(false)
    }

    return (
        <LayoutAdmin>
            <Paper>
                <div className={classes.header}>
                    <Card className={classes.headerIcon}>
                        <PeopleOutlineTwoToneIcon />
                    </Card>
                    <div className={classes.headerTitle}>
                        <Typography variant="h6" component="div">Users</Typography>
                        <Typography variant="subtitle2" component="div">List Users</Typography>
                    </div>
                </div>
            </Paper>
            <Paper>
                {allUsers && <TableContainer>
                    <Toolbar>
                        <Input
                            label="Search Employees"
                            className={classes.searchInput}
                            startIcon={<SearchIcon />}
                            onChange={handleSearch}
                        />
                        <Button
                            onClick={() => setShowUserAdd(true)}
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                            text="ADD NEW"
                        />
                    </Toolbar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{user.fullname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button 
                                            onClick={() => {
                                                setUserRecord(user)
                                                setShowUserDetail(true)
                                            }} 
                                            className={classes.marginBtn}
                                            text="DETAIL"
                                            color="default"
                                        />
                                        <Button
                                            onClick={() => {
                                                setUserRecord(user)
                                                setShowUserEdit(true)
                                            }}
                                            className={classes.marginBtn}
                                            text="EDIT"
                                        />
                                        <Button 
                                            className={classes.marginBtn} 
                                            color="secondary" text="DELETE"
                                            onClick={() => {
                                                setUserRecord(user)
                                                setShowUserDelete(true)
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[3, 6, 10, 25, 50]}
                        component="div"
                        count={allUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </TableContainer>}
            </Paper>
            {showUserAdd && <UserAdd {...{
                showUserAdd,
                setShowUserAdd
            }} />}
            {showUserDetail && <UserDetail {...{
                showUserDetail,
                setShowUserDetail,
                userRecord
            }} />}
            {showUserEdit && <UserEdit {...{
                showUserEdit,
                setShowUserEdit,
                userRecord
            }} />}
            {showUserDelete && <Dialog open={showUserDelete}>
                <DialogContent>
                    <DialogContentText>Are you sure to delete <strong>{userRecord.fullname}</strong>?</DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={() => handleDeleteUser(userRecord._id)} color="secondary" text="DELETE" />
                    <Button onClick={() => setShowUserDelete(false)} color="default" text="CANCEL" />
                </DialogActions>
            </Dialog>}
        </LayoutAdmin>
    )
}

export default Users

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LayoutAdmin from '../../components/admin/layouts/LayoutAdmin'
import { Input } from '../../components/UI'
import { getUsers } from '../../redux/actions/user.action'
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
    Button,
    Card,
    Typography,
    Toolbar,
} from '@material-ui/core'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import UserCard from '../../components/admin/UserCard'

const useStyles = makeStyles(theme => ({
    headerRoot: {
        backgroundColor: '#fdfdff'
    },
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
    }
}))

const Users = () => {
	const dispatch = useDispatch()
	const classes = useStyles()
	const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(3)
    const [allUsers, setAllUsers] = useState([])
    const [showUserDetail, setShowUserDetail] = useState(false)
    const [userDetail, setUserDetail] = useState(null)

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
        let usersFilter = allUsers.filter(user => user.fullname.toLowerCase().includes(value))
        setAllUsers(usersFilter)
    }

    return (
        <LayoutAdmin>
            <Paper elevation={0} square className={classes.rootHeader}>
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
                            variant="outlined"
                            startIcon={<AddIcon />}
                            className={classes.newButton}
                        >Add New</Button>
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
                                                setUserDetail(user)
                                                setShowUserDetail(true)
                                            }} 
                                            className={classes.marginBtn} 
                                            size="small" 
                                            variant="contained"
                                        >Detail</Button>
                                        <Button className={classes.marginBtn} size="small" variant="contained" color="primary">Edit</Button>
                                        <Button className={classes.marginBtn} size="small" variant="contained" color="secondary">Delete</Button>
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
            <UserCard {...{
                showUserDetail,
                setShowUserDetail,
                userDetail
            }} />
        </LayoutAdmin>
    )
}

export default Users

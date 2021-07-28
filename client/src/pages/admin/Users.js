import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutAdmin from '../../components/layouts/admin/LayoutAdmin'
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
    Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	marginBtn: {
		margin: theme.spacing(.5)
	}
}))

const Users = () => {
	const { user } = useSelector(state => state)
	const { users } = user
	const dispatch = useDispatch()
	const classes = useStyles()
	const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(3)

    const onPageChange = (event, nextPage) => {
        setPage(nextPage)
    }

    const onRowsPerPageChange = e => {
        setRowsPerPage(e.target.value)
        setPage(0)
    }

	useEffect(() => {
		if (users.length === 0) dispatch(getUsers())
	}, [dispatch, users.length])

    return (
        <LayoutAdmin>
            {users && <TableContainer component={Paper}>
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
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{user.fullname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                	<Button className={classes.marginBtn} size="small" variant="contained">Detail</Button>
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </TableContainer>}
        </LayoutAdmin>
    )
}

export default Users

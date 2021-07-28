import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, addCategory } from '../../redux/actions/category.action'
import { getUsers } from '../../redux/actions/user.action'
import LayoutAdmin from '../../components/layouts/admin/LayoutAdmin'
import { makeStyles, Toolbar, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    main: {
        marginLeft: 250
    }
}))

const Dashboard = () => {
    const classes = useStyles()
	const { category, user } = useSelector(state => state)
	const { categories } = category
    const { users } = user
	const dispatch = useDispatch()

    return (
        <LayoutAdmin>
        	<Toolbar />
            <main className={classes.main}>
                <ul>
                    {categories && categories.map((cat, idx) => (
                        <li key={idx}>{cat.name}</li>
                    ))}
                </ul>
                <br />
                <ul>
                    {users && users.map((user, idx) => (
                        <li key={idx}>{user.email}</li>
                    ))}
                </ul>
            </main>
        </LayoutAdmin>
    )
}

export default Dashboard

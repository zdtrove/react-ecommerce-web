import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, addCategory } from '../../redux/actions/category.action'
import { getUsers } from '../../redux/actions/user.action'
import Layout from '../../components/layouts/admin/Layout'
import { Toolbar, Button } from '@material-ui/core'

const Dashboard = () => {
	const { category, user } = useSelector(state => state)
	const { categories } = category
    const { users } = user
	const dispatch = useDispatch()

    return (
        <Layout>
        	<Toolbar />
            <Button onClick={() => dispatch(getCategories())}>Get Categories</Button>
            <Button onClick={() => dispatch(getUsers())}>Get Users</Button>
        	<Button onClick={() => dispatch(addCategory())}>Add Category</Button>
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
        </Layout>
    )
}

export default Dashboard

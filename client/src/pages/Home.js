import React from 'react'
import { useDispatch } from 'react-redux'
import { getUsers } from 'redux/actions/user.action'
import { getCategories } from 'redux/actions/category.action'
import { Toolbar, Button } from '@material-ui/core'
import Layout from 'components/layouts/Layout'

const Home = () => {
	const dispatch = useDispatch()

    return (
        <Layout>
            <Toolbar />
            <Button onClick={() => dispatch(getUsers())}>Get Users</Button>
            <Button onClick={() => dispatch(getCategories())}>Get Category</Button>
        </Layout>
    )
}

export default Home

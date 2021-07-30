import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LayoutAdmin from '../../components/layouts/admin/LayoutAdmin'
import { getCategories } from '../../redux/actions/category.action'
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles({
  	root: {
	    height: 110,
	    flexGrow: 1,
	    maxWidth: 400,
  	},
});

const Categories = () => {
	const classes = useStyles();
	const { category } = useSelector(state => state)
	const dispatch = useDispatch()
	const { categories } = category

	const renderTree = categories => {
		let categoryList = []
		categories.forEach(category => (
			categoryList.push(
				<TreeItem key={category._id} nodeId={category._id} label={category.name}>
		      		{(Array.isArray(category.children) && category.children.length > 0) ? renderTree(category.children) : null}
		    	</TreeItem>
	    	)
		))

		return categoryList
	}
		

	useEffect(() => {
		if (categories.length === 0) dispatch(getCategories())
	}, [dispatch, categories.length])

    return (
        <LayoutAdmin>
            <TreeView
		      	className={classes.root}
		      	defaultCollapseIcon={<ExpandMoreIcon />}
		      	defaultExpandIcon={<ChevronRightIcon />}
		    >
		      	{categories.length > 0 && renderTree(categories)}
		    </TreeView>
        </LayoutAdmin>
    )
}

export default Categories

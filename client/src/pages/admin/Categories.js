import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LayoutAdmin from '../../components/admin/layouts/LayoutAdmin'
import { deleteCategory, getCategories } from '../../redux/actions/category.action'
import { 
	makeStyles, 
	Paper, 
	Card, 
	Typography, 
	Toolbar,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogActions
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';
import TreeItem from '@material-ui/lab/TreeItem';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import { Button } from '../../components/UI'
import CategoryEdit from '../../components/admin/category/CategoryEdit'
import CategoryAdd from '../../components/admin/category/CategoryAdd'
import { userRoles } from '../../constants'

const { ADMIN } = userRoles

const useStyles = makeStyles(theme => ({
  	treeview: {
	    height: 'max-content',
	    padding: theme.spacing(2),
		paddingTop: 0,
	    maxWidth: 600,
	    '& .MuiTreeItem-label': {
	    	margin: theme.spacing(.25)
	    },
	    '& .MuiTreeItem-label:hover': {
	    	borderRadius: 20
	    },
	    '& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      		borderRadius: 20
    	},
    	'& .MuiButton-containedSizeSmall': {
    		padding: 2,
    		fontSize: 11,
    		marginTop: 0,
    		marginBottom: 0
    	},
    	'& .MuiTreeItem-label:hover .MuiButtonBase-root': {
    		display: 'block'
    	},
		'& .MuiTreeItem-group': {
			marginLeft: theme.spacing(5)
		}
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
    labelRoot: {
    	display: 'flex',
    	alignItems: 'center',
    	padding: theme.spacing(.5),
    	margin: theme.spacing(.5)
    },
    labelIcon: {
    	marginRight: theme.spacing(3),
    	width: '90px',
    	height: '26px',
	    border: '1px solid #ddd',
	    borderRadius: '52px'
	},
	labelText: {
	    fontWeight: 'inherit',
	    flexGrow: 1,
	},
	btnHover: {
		opacity: 0.3,
		display: 'none'
	},
	searchInput: {
        width: '75%'
    },
    newButton: {
        right: '10px'
    },
}));

const Categories = () => {
	const classes = useStyles();
	const { category } = useSelector(state => state)
	const dispatch = useDispatch()
	const { categories } = category
	const [selected, setSelected] = useState([]);
	const [expanded, setExpanded] = useState([]);
    const [showCategoryEdit, setShowCategoryEdit] = useState(false)
	const [showCategoryAdd, setShowCategoryAdd] = useState(false)
	const [showCategoryDelete, setShowCategoryDelete] = useState(false)
    const [categoryRecord, setCategoryRecord] = useState(null)

	const handleToggle = (event, nodeIds) => {
    	setExpanded(nodeIds);
  	};

  	const handleSelect = (event, nodeIds) => {
    	setSelected(nodeIds);
  	};

  	const handleEdit = (e, category) => {
        setCategoryRecord(category)
        setShowCategoryEdit(true)
  		e.stopPropagation()
  	}

  	const handleDelete = async id => {
        await dispatch(deleteCategory(id))
        setShowCategoryDelete(false)
    }

	const renderTree = categories => {
		let categoryList = []
		categories.forEach(category => (
			categoryList.push(
				<TreeItem key={category._id} nodeId={category._id} label={
					<div className={classes.labelRoot}>
						{category.image && <img className={classes.labelIcon} src={category.image} alt={category.name} />}
						<Typography className={classes.labelText}>{category.name}</Typography>
						{selected === category._id
							? <>
								<Button onClick={e => handleEdit(e, category)} text="EDIT" />
								<Button onClick={() => {
									setCategoryRecord(category)
									setShowCategoryDelete(true)
								}} text="DELETE" color="secondary" />
							</>
							: <>
								<Button className={classes.btnHover} text="EDIT" />
								<Button className={classes.btnHover} text="DELETE" color="secondary" />
							</>
						}
					</div>
				}>
		      		{(Array.isArray(category.children) && category.children.length > 0) ? renderTree(category.children) : null}
		    	</TreeItem>
	    	)
		))

		return categoryList
	}

	useEffect(() => {
		dispatch(getCategories(ADMIN))
	}, [dispatch])

    return (
        <LayoutAdmin>
        	<Paper>
                <div className={classes.header}>
                    <Card className={classes.headerIcon}>
                        <CategoryRoundedIcon />
                    </Card>
                    <div className={classes.headerTitle}>
                        <Typography variant="h6" component="div">Categories</Typography>
                        <Typography variant="subtitle2" component="div">List Categories</Typography>
                    </div>
                </div>
            </Paper>
            <Paper>
				<Toolbar>
					<Button
						onClick={() => setShowCategoryAdd(true)}
						variant="outlined"
						startIcon={<AddIcon />}
						className={classes.newButton}
						text="ADD NEW"
					/>
				</Toolbar>
            	<TreeView
			      	className={classes.treeview}
			      	defaultCollapseIcon={<ExpandMoreIcon />}
			      	defaultExpandIcon={<ChevronRightIcon />}
			      	expanded={expanded}
				    selected={selected}
				    onNodeToggle={handleToggle}
				    onNodeSelect={handleSelect}
			    >
			      	{categories.length > 0 && renderTree(categories)}
			    </TreeView>
            </Paper>
            {showCategoryEdit && (
                <CategoryEdit
                    {...{
                        categories,
                        categoryRecord,
                        showCategoryEdit,
                        setShowCategoryEdit
                    }}
                />
            )}
			{showCategoryAdd && (
                <CategoryAdd
                    {...{
                        categories,
                        showCategoryAdd,
                        setShowCategoryAdd
                    }}
                />
            )}
			{showCategoryDelete && <Dialog open={showCategoryDelete}>
                <DialogContent>
                    <DialogContentText>Are you sure to delete <strong>{categoryRecord.name}</strong>?</DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <Button onClick={() => handleDelete(categoryRecord._id)} color="secondary" text="DELETE" />
                    <Button onClick={() => setShowCategoryDelete(false)} color="default" text="CANCEL" />
                </DialogActions>
            </Dialog>}
        </LayoutAdmin>
    )
}

export default Categories

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'redux/hook';
import {
  makeStyles,
  Paper,
  Card,
  Typography,
  Toolbar,
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
import Layout from 'components/admin/layouts';
import { Button, Dialog } from 'components/UI';
import Edit from 'components/admin/category/Edit';
import Add from 'components/admin/category/Add';
import { categoryActions, selectCategories } from 'redux/features/category/slice';
import { Category } from 'types/category';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root::-webkit-scrollbar': {
      display: 'none'
    }
  },
  rootTree: {
    minWidth: 240,
    overflow: 'scroll'
  },
  treeview: {
    height: 'max-content',
    padding: theme.spacing(2),
    paddingTop: 0,
    maxWidth: 600,
    '& .MuiTreeItem-label': {
      margin: theme.spacing(0.25)
    },
    '& .MuiTreeItem-label:hover': {
      borderRadius: 20,
      width: 'max-content',
      padding: `0 ${theme.spacing(0.5)}px`
    },
    '& .MuiTreeItem-content': {
      width: 'max-content'
    },
    '& .MuiTreeItem-root.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label': {
      borderRadius: 20,
      backgroundColor: 'rgba(63, 81, 181, 0.08) !important',
      width: 'max-content',
      padding: `0 ${theme.spacing(0.5)}px`
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
      marginLeft: theme.spacing(2.5),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5)
      }
    }
  },
  rootHeader: {
    minWidth: 240
  },
  header: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4)
    },
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
    padding: `${theme.spacing(0.25)}px ${theme.spacing(0.5)}px`,
    margin: theme.spacing(0.5)
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
    marginRight: theme.spacing(2),
    width: 'max-content'
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
  }
}));

const Categories = () => {
  const classes = useStyles();
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>('');
  const [expanded, setExpanded] = useState<string[]>([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [categoryRecord, setCategoryRecord] = useState<Category>({} as Category);

  const handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string) => {
    setSelected(nodeIds);
  };

  const handleEdit = (e: React.ChangeEvent, category: Category) => {
    setCategoryRecord(category);
    setShowEdit(true);
    e.stopPropagation();
  };

  const handleDelete = (id: string) => {
    dispatch(categoryActions.deleteCategory(id));
    setShowDelete(false);
  };

  const renderTree = (categories: Category[]) => {
    let categoryList: React.ReactElement[] = [];
    categories.forEach((category) =>
      categoryList.push(
        <TreeItem
          key={category._id}
          nodeId={category._id || ''}
          label={
            <div className={classes.labelRoot}>
              {category.image && (
                <img className={classes.labelIcon} src={category.image} alt={category.name} />
              )}
              <Typography className={classes.labelText}>{category.name}</Typography>
              {selected === (category._id || '') ? (
                <>
                  <Button onClick={(e: React.ChangeEvent) => handleEdit(e, category)} text="EDIT" />
                  <Button
                    onClick={(e) => {
                      setCategoryRecord(category);
                      setShowDelete(true);
                      e.stopPropagation();
                    }}
                    text="DELETE"
                    color="secondary"
                  />
                </>
              ) : (
                <>
                  <Button className={classes.btnHover} text="EDIT" />
                  <Button className={classes.btnHover} text="DELETE" color="secondary" />
                </>
              )}
            </div>
          }
        >
          {Array.isArray(category.children) && category.children.length > 0
            ? renderTree(category.children)
            : null}
        </TreeItem>
      )
    );

    return categoryList;
  };

  useEffect(() => {
    dispatch(categoryActions.getCategories());
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <Paper className={classes.rootHeader}>
          <div className={classes.header}>
            <Card className={classes.headerIcon}>
              <CategoryRoundedIcon />
            </Card>
            <div className={classes.headerTitle}>
              <Typography variant="h6" component="div">
                Categories
              </Typography>
              <Typography variant="subtitle2" component="div">
                List Categories
              </Typography>
            </div>
          </div>
        </Paper>
        <Paper className={classes.rootTree}>
          <Toolbar>
            <Button
              onClick={() => setShowAdd(true)}
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
        {showEdit && (
          <Edit
            {...{
              categories,
              categoryRecord,
              showEdit,
              setShowEdit
            }}
          />
        )}
        {showAdd && (
          <Add
            {...{
              categories,
              showAdd,
              setShowAdd
            }}
          />
        )}
        {showDelete && (
          <Dialog show={showDelete} setShow={setShowDelete} title="DELETE CATEGORY">
            <DialogContent>
              <DialogContentText>
                Are you sure to delete <strong>{categoryRecord && categoryRecord.name}</strong>?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => handleDelete(categoryRecord._id || '')}
                color="secondary"
                text="DELETE"
              />
              <Button onClick={() => setShowDelete(false)} color="default" text="CANCEL" />
            </DialogActions>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default Categories;

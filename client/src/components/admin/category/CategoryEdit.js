import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
	makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { Input, Select, Button } from '../../../components/UI'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 500,
        maxWidth: 500,
        maxHeight: 500,
        "& .MuiDialogContent-root::-webkit-scrollbar": {
            display: 'none'
        }
    },
    marginBtn: {
        margin: theme.spacing(.5)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    }
}))

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required"),
    parentId: Yup.string()
        .required("Parent Id is required")
})

const list = ['a', 'b', 'c']

const CategoryEdit = ({
    categories,
    showCategoryEdit,
    setShowCategoryEdit,
    categoryRecord
}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { name } = categoryRecord
    const [categoryList, setCategoryList] = useState([])
    console.log(categories)
    console.log(categoryRecord)
    const { _id } = categoryRecord

    const initialValues = {
        name,
        parentId: ''
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            console.log(values)
        }
    })

    const createCategoryList = (categories, option = []) => {
        categories && categories.forEach((cat, index) => {
            if (cat._id !== _id) {
                option.push({
                    label: cat.name,
                    id: cat._id
                })
            }
            
            if (cat.children && cat.children.length > 0) createCategoryList(cat.children, option)
        })
        return option
    }

    return <Dialog
        classes={{ paper: classes.root }}
        open={showCategoryEdit}
    >
        <DialogTitle>
            CATEGORY EDIT
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => setShowCategoryEdit(false)}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && formik.errors.name}
                />
                <Select
                    label="Parent Category"
                    name="parentId"
                    value={formik.values.parentId}
                    error={formik.touched.parentId && formik.errors.parentId}
                    {...formik.getFieldProps('parentId')}
                    items={list}
                />
            </form>
            <ul>
                {
                    createCategoryList(categories).map((item, idx) => (
                        <li key={idx}>{item.label}</li>
                    ))
                }
            </ul>
        </DialogContent>
        <DialogActions>
            <Button disabled={!(formik.isValid && formik.dirty)} onClick={() => formik.submitForm()} text="SAVE" />
            <Button onClick={() => formik.resetForm()} color="secondary" text="RESET" />
        </DialogActions>
    </Dialog>
}

export default CategoryEdit

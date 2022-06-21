import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
	makeStyles,
    useTheme,
    useMediaQuery,
    DialogContent,
    DialogActions,
    Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { Input, Select, Button, Dialog } from 'components/UI'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { updateCategory } from 'redux/actions/category.action';

const useStyles = makeStyles(theme => ({
    upload: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${theme.spacing(1)}px 0`,
        '& #upload': {
            display: 'none'
        },
        '& img': {
            border: '1px solid #ccc',
            maxWidth: 130,
            height: 'auto',
            [theme.breakpoints.up('sm')]: {
                maxWidth: 200
            }
        }
    }
}))

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
})

const CategoryEdit = ({
    categories,
    showCategoryEdit,
    setShowCategoryEdit,
    categoryRecord
}) => {
    const classes = useStyles()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const dispatch = useDispatch()
    const { _id, name, parentId, image } = categoryRecord
    const [categoryImg, setCategoryImg] = useState('')
    const [categoryImgReset, setCategoryImgReset] = useState('')

    const initialValues = {
        name,
        parentId: parentId ? parentId : '',
        image
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            await dispatch(updateCategory({id: _id, ...values}))
            setShowCategoryEdit(false)
        }
    })

    const changeImage = e => {
        const file = e.target.files[0]
        setCategoryImgReset('')
        setCategoryImg(file)
        formik.setFieldValue("image", file);
    }

    const createCategoryList = (categories, options = [], level = 1) => {
        categories && categories.forEach((cat, index, array) => {
            if (cat._id !== _id) {
                options.push({
                    name: cat.name,
                    id: cat._id,
                    level
                })
            }
            
            if (cat.children && cat.children.length > 0) {
                createCategoryList(cat.children, options, level + 1)
            }
        })

        return options
    }

    return <Dialog
        show={showCategoryEdit}
        setShow={setShowCategoryEdit}
        title="CATEGORY EDIT"
    >
        <DialogContent dividers>
            <form onSubmit={formik.handleSubmit}>
                <Input
                    name="name"
                    label="Name"
                    value={formik.values.name}
                    {...formik.getFieldProps('name')}
                    error={formik.touched.name && formik.errors.name}
                />
                <div className={classes.upload}>
                    <label htmlFor="upload">
                        <input
                            id="upload"
                            name="upload"
                            type="file"
                            accept="image/*"
                            onChange={changeImage}
                        />
                        <Fab
                            color="secondary"
                            variant="extended"
                            size={matches ? "medium" : "small"}
                            component="span"
                        >
                            <AddIcon /> {image ? 'Change image' : 'Add image'}
                        </Fab>
                    </label>
                    <img src={categoryImgReset ? categoryImgReset : (categoryImg ? URL.createObjectURL(categoryImg) : image)} alt="" />
                </div>
                <Select
                    label="Parent Category"
                    name="parentId"
                    value={formik.values.parentId}
                    error={formik.touched.parentId && formik.errors.parentId}
                    {...formik.getFieldProps('parentId')}
                    items={createCategoryList(categories)}
                    isObject
                />
            </form>
        </DialogContent>
        <DialogActions>
            <Button 
                disabled={!(formik.isValid && formik.dirty)} 
                onClick={() => formik.submitForm()} 
                text="SAVE" 
            />
            <Button
                disabled={!formik.dirty}
                onClick={() => {
                    formik.resetForm()
                    setCategoryImgReset(image)
                }} 
                color="secondary" 
                text="RESET" 
            />
        </DialogActions>
    </Dialog>
}

export default CategoryEdit

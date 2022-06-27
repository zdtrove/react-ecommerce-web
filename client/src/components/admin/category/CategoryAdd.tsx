import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from 'redux/hook';
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogActions,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Input, Select, Button, Dialog } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryActions } from 'redux/features/category/categorySlice';
import { Category } from 'types/category';

const useStyles = makeStyles((theme) => ({
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
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
});

type CategoryAddProps = {
  categories: Category[];
  showCategoryAdd: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowCategoryAdd: (params: boolean) => void;
};

const CategoryAdd = ({ categories, showCategoryAdd, setShowCategoryAdd }: CategoryAddProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [categoryImg, setCategoryImg] = useState<Blob | MediaSource | null>(null);
  const [categoryImgReset, setCategoryImgReset] = useState('');

  const initialValues = {
    name: '',
    parentId: '',
    image: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await dispatch(categoryActions.addCategory(values));
      setShowCategoryAdd(false);
    }
  });

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    setCategoryImgReset('');
    setCategoryImg(file);
    formik.setFieldValue('image', file);
  };

  const createCategoryList = (categories: Category[], options: any[] = [], level = 1) => {
    categories &&
      categories.forEach((cat) => {
        options.push({
          name: cat.name,
          id: cat._id,
          level
        });

        if (cat.children && cat.children.length > 0) {
          createCategoryList(cat.children, options, level + 1);
        }
      });

    return options;
  };

  return (
    <Dialog show={showCategoryAdd} setShow={setShowCategoryAdd} title="CATEGORY ADD">
      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <Input
            label="Name"
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
                size={matches ? 'medium' : 'small'}
                component="span"
              >
                <AddIcon /> Add image
              </Fab>
            </label>
            <img
              src={
                categoryImgReset
                  ? categoryImgReset
                  : categoryImg
                  ? URL.createObjectURL(categoryImg)
                  : ''
              }
              alt=""
            />
          </div>
          <Select
            label="Parent Category"
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
          text="ADD"
        />
        <Button
          disabled={!formik.dirty}
          onClick={() => {
            formik.resetForm();
            setCategoryImg(null);
            setCategoryImgReset('');
          }}
          color="secondary"
          text="RESET"
        />
      </DialogActions>
    </Dialog>
  );
};

CategoryAdd.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number,
      name: PropTypes.string,
      parentId: PropTypes.number,
      image: PropTypes.string
    })
  ),
  showCategoryAdd: PropTypes.bool,
  setShowCategoryAdd: PropTypes.bool
};

export default CategoryAdd;

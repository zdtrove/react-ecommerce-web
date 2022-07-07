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
import { createCategoryList } from 'utils/functions';

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

type Props = {
  categories: Category[];
  showCategoryEdit: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowCategoryEdit: (params: boolean) => void;
  categoryRecord: Category;
};

const CategoryEdit = ({
  categories,
  showCategoryEdit,
  setShowCategoryEdit,
  categoryRecord
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const dispatch = useAppDispatch();
  const { _id, name, parentId, image } = categoryRecord;
  const [categoryImg, setCategoryImg] = useState<Blob | MediaSource | null>(null);
  const [categoryImgReset, setCategoryImgReset] = useState('');

  const initialValues: Category = {
    name,
    parentId: parentId ? parentId : '',
    image
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(categoryActions.updateCategory({ _id, ...values }));
      setShowCategoryEdit(false);
    }
  });

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    setCategoryImgReset('');
    setCategoryImg(file);
    formIk.setFieldValue('image', file);
  };

  return (
    <Dialog show={showCategoryEdit} setShow={setShowCategoryEdit} title="CATEGORY EDIT">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
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
                <AddIcon /> {image ? 'Change image' : 'Add image'}
              </Fab>
            </label>
            <img
              src={
                categoryImgReset
                  ? categoryImgReset
                  : categoryImg
                  ? URL.createObjectURL(categoryImg)
                  : image || ''
              }
              alt=""
            />
          </div>
          <Select
            label="Parent Category"
            error={formIk.touched.parentId && formIk.errors.parentId}
            {...formIk.getFieldProps('parentId')}
            items={createCategoryList(categories, [], 1, _id)}
            isObject
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!(formIk.isValid && formIk.dirty)}
          onClick={() => formIk.submitForm()}
          text="SAVE"
        />
        <Button
          disabled={!formIk.dirty}
          onClick={() => {
            formIk.resetForm();
            setCategoryImgReset(image || '');
          }}
          color="secondary"
          text="RESET"
        />
      </DialogActions>
    </Dialog>
  );
};

CategoryEdit.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.any),
  showCategoryEdit: PropTypes.bool,
  setShowCategoryEdit: PropTypes.func,
  categoryRecord: PropTypes.any
};

export default CategoryEdit;

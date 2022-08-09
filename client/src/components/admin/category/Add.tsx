import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  DialogContent,
  DialogActions,
  Fab,
  CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Input, Select, Button, Dialog, RadioGroup } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryActions, selectLoadingCategory } from 'redux/features/category/slice';
import { Category } from 'types/category';
import { createCategoryList } from 'utils/functions';
import { selectModal } from 'redux/features/ui/slice';

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
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (params: boolean) => void;
};

const CategoryAdd = ({ categories, show, setShow }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const loading = useAppSelector(selectLoadingCategory);
  const modal = useAppSelector(selectModal);
  const [categoryImg, setCategoryImg] = useState<Blob | MediaSource | null>(null);
  const [categoryImgReset, setCategoryImgReset] = useState('');

  const initialValues: Category = {
    name: '',
    enName: '',
    icon: '',
    isMenu: 'Yes',
    parentId: '',
    image: '',
    children: []
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(categoryActions.addCategory(values));
    }
  });

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = (e.target.files as FileList)[0];
    setCategoryImgReset('');
    setCategoryImg(file);
    formIk.setFieldValue('image', file);
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="CATEGORY ADD">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
          />
          <Input
            label="English Name"
            {...formIk.getFieldProps('enName')}
            error={formIk.touched.enName && formIk.errors.enName}
          />
          <Input
            label="Icon Name"
            {...formIk.getFieldProps('icon')}
            error={formIk.touched.icon && formIk.errors.icon}
          />
          <RadioGroup
            row
            label="Is Menu"
            {...formIk.getFieldProps('isMenu')}
            items={['No', 'Yes']}
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
            error={formIk.touched.parentId && formIk.errors.parentId}
            {...formIk.getFieldProps('parentId')}
            items={createCategoryList(categories, [], 1)}
            isObject
          />
        </form>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          disabled={!(formIk.isValid && formIk.dirty) || loading}
          onClick={() => formIk.submitForm()}
          text="ADD"
        />
        <Button
          disabled={!formIk.dirty}
          onClick={() => {
            formIk.resetForm();
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
      _id: PropTypes.string,
      name: PropTypes.string,
      parentId: PropTypes.string,
      image: PropTypes.string
    })
  ),
  show: PropTypes.bool,
  setShow: PropTypes.func
};

export default CategoryAdd;

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  DialogContent,
  DialogActions,
  Fab,
  useMediaQuery,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { Input, Button, Dialog, Select } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { productActions } from 'redux/features/product/slice';
import { createCategoryList, imageShow } from 'utils/functions';
import { selectCategories } from 'redux/features/category/slice';
import { Product } from 'types/product';

const useStyles = makeStyles(() => ({
  upload: {
    '& #upload': {
      display: 'none'
    }
  },
  imageList: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 15,
    rowGap: 15,
    flexWrap: 'wrap',
    padding: 10,
    marginTop: 10
  },
  imageItem: {
    position: 'relative',
    maxWidth: 100,
    '& img': {
      border: '1px solid #ddd',
      padding: 10,
      width: '100%'
    },
    '& span': {
      position: 'absolute',
      top: -10,
      right: -10,
      width: 24,
      height: 24,
      borderRadius: '50%',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    '& span:hover': {
      backgroundColor: 'black',
      color: 'white'
    }
  }
}));

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(64, 'Name max length is 64'),
  description: Yup.string().max(1000, 'Description max length is 1000'),
  price: Yup.number().required('Price is required').max(100000000, 'Max price is 100000000'),
  categoryId: Yup.string().required('Category is required')
});

const initialValues: Product = {
  name: '',
  description: '',
  price: 0,
  images: [],
  categoryId: ''
};

type Props = {
  showAdd: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowAdd: (param: boolean) => void;
};

const Add = ({ showAdd, setShowAdd }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const categories = useAppSelector(selectCategories);
  const [images, setImages] = useState<any[]>([]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let err = '';
    let newImages: any[] = [];
    files.forEach((file) => {
      if (!file) return (err = 'File does not exist');
      if (file.size > 1024 * 1024 * 2) {
        return (err = 'The image largest is 2mb');
      }
      return newImages.push(file);
    });
    if (err) console.log(err);
    setImages([...images, ...newImages]);
  };

  const deleteImages = (index: number) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(productActions.addProduct({ ...values, images }));
      setShowAdd(false);
    }
  });

  return (
    <Dialog show={showAdd} setShow={setShowAdd} title="PRODUCT ADD">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name *"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
            startIcon={<ShoppingCartIcon />}
          />
          <Input
            label="Description"
            {...formIk.getFieldProps('description')}
            error={formIk.touched.description && formIk.errors.description}
            multiline
            minRows={4}
          />
          <Input
            label="Price *"
            {...formIk.getFieldProps('price')}
            error={formIk.touched.price && formIk.errors.price}
            startIcon={<LocalAtmIcon />}
            type="number"
          />
          <Select
            label="Category *"
            error={formIk.touched.categoryId && formIk.errors.categoryId}
            {...formIk.getFieldProps('categoryId')}
            items={createCategoryList(categories, [], 1, '')}
            isObject
          />
          <div className={classes.upload}>
            <label htmlFor="upload">
              <input
                id="upload"
                name="images"
                type="file"
                accept="image/*"
                multiple
                value={formIk.values.images}
                onChange={handleChangeImage}
              />
              <Fab
                color="secondary"
                variant="extended"
                size={matches ? 'medium' : 'small'}
                component="span"
              >
                <AddIcon /> Add images
              </Fab>
            </label>
          </div>
          <div className={classes.imageList}>
            {images.map((img, index) => (
              <div className={classes.imageItem} key={index}>
                {imageShow(URL.createObjectURL(img))}
                <span onClick={() => deleteImages(index)}>
                  <HighlightOffIcon />
                </span>
              </div>
            ))}
          </div>
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
          onClick={() => formIk.resetForm()}
          color="secondary"
          text="RESET"
        />
      </DialogActions>
    </Dialog>
  );
};

Add.propTypes = {
  showAdd: PropTypes.bool,
  setShowAdd: PropTypes.func
};

export default Add;

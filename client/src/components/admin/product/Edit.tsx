import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import {
  DialogContent,
  DialogActions,
  Fab,
  useMediaQuery,
  makeStyles,
  useTheme,
  CircularProgress
} from '@material-ui/core';
import { Input, Select, Button, Dialog } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Product } from 'types/product';
import { productActions, selectLoadingProduct } from 'redux/features/product/slice';
import { createCategoryList, imageShow } from 'utils/functions';
import { selectCategories } from 'redux/features/category/slice';
import { selectModal } from 'redux/features/ui/slice';

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

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  product: Product;
};

const Edit = ({ show, setShow, product }: Props) => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const {
    _id,
    name,
    enName,
    description,
    enDescription,
    shortDescription,
    enShortDescription,
    categoryId,
    price,
    images
  } = product;
  const categories = useAppSelector(selectCategories);
  const loading = useAppSelector(selectLoadingProduct);
  const modal = useAppSelector(selectModal);
  const [imagesNew, setImagesChange] = useState<any[]>([]);
  const [imagesOld, setImagesOld] = useState<any[]>(images || []);

  let initialValues: Product = {
    name,
    enName,
    description,
    enDescription,
    shortDescription,
    enShortDescription,
    price,
    imagesOld: product.images,
    imagesNew: [],
    categoryId,
    sold: 0
  };

  const formIk = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(productActions.updateProduct({ _id, ...values }));
    }
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let err = '';
    let imagesNewChoose: any[] = [];
    files.forEach((file) => {
      if (!file) return (err = 'File does not exist');
      if (file.size > 1024 * 1024 * 2) {
        return (err = 'The image largest is 2mb');
      }
      return imagesNewChoose.push(file);
    });
    if (err) console.log(err);
    setImagesChange([...imagesNew, ...imagesNewChoose]);
    formIk.setFieldValue('imagesNew', [...imagesNew, ...imagesNewChoose]);
    formIk.setFieldValue('imagesOld', imagesOld);
  };

  const deleteNewImages = (index: number) => {
    const imagesNewChoose = [...imagesNew];
    imagesNewChoose.splice(index, 1);
    setImagesChange(imagesNewChoose);
    formIk.setFieldValue('imagesNew', imagesNewChoose);
  };

  const deleteOldImages = (index: number) => {
    const imagesNewChoose = [...imagesOld];
    imagesNewChoose.splice(index, 1);
    setImagesOld(imagesNewChoose);
    formIk.setFieldValue('imagesOld', imagesNewChoose);
  };

  useEffect(() => {
    !modal && setShow(false);
  }, [modal]);

  return (
    <Dialog show={show} setShow={setShow} title="PRODUCT EDIT">
      <DialogContent dividers>
        <form onSubmit={formIk.handleSubmit}>
          <Input
            label="Name *"
            {...formIk.getFieldProps('name')}
            error={formIk.touched.name && formIk.errors.name}
            startIcon={<ShoppingCartIcon />}
          />
          <Input
            label="English Name *"
            {...formIk.getFieldProps('enName')}
            error={formIk.touched.enName && formIk.errors.enName}
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
            label="English Description"
            {...formIk.getFieldProps('enDescription')}
            error={formIk.touched.enDescription && formIk.errors.enDescription}
            multiline
            minRows={4}
          />
          <Input
            label="Short Description"
            {...formIk.getFieldProps('shortDescription')}
            error={formIk.touched.shortDescription && formIk.errors.shortDescription}
            multiline
            minRows={4}
          />
          <Input
            label="English Short Description"
            {...formIk.getFieldProps('enShortDescription')}
            error={formIk.touched.enShortDescription && formIk.errors.enShortDescription}
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
            {imagesOld &&
              imagesOld.map((img, index) => (
                <div className={classes.imageItem} key={index}>
                  {imageShow(img.url)}
                  <span onClick={() => deleteOldImages(index)}>
                    <HighlightOffIcon />
                  </span>
                </div>
              ))}
            {imagesNew &&
              imagesNew.map((img, index) => (
                <div className={classes.imageItem} key={index}>
                  {imageShow(URL.createObjectURL(img))}
                  <span onClick={() => deleteNewImages(index)}>
                    <HighlightOffIcon />
                  </span>
                </div>
              ))}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        {loading && <CircularProgress size={25} />}
        <Button
          disabled={!(formIk.isValid && formIk.dirty) || loading}
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

Edit.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    enName: PropTypes.string,
    description: PropTypes.string,
    enDescription: PropTypes.string,
    shortDescription: PropTypes.string,
    enShortDescription: PropTypes.string,
    categoryId: PropTypes.string,
    price: PropTypes.number,
    sold: PropTypes.number,
    star: PropTypes.any,
    images: PropTypes.arrayOf(PropTypes.any)
  })
};

export default Edit;

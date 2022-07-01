import PropTypes from 'prop-types';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { DialogContent, DialogActions } from '@material-ui/core';
import { Input, Button, Dialog, Select } from 'components/UI';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MessageIcon from '@material-ui/icons/Message';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { productActions } from 'redux/features/product/productSlice';
import { createCategoryList, imageShow } from 'utils/functions';
import { selectCategories } from 'redux/features/category/categorySlice';
import { Product } from 'types/product';
import React, { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').max(64, 'Name max length is 64'),
  description: Yup.string().max(1000, 'Description max length is 1000'),
  price: Yup.number().required('Price is required').max(100000000, 'Max price is 100000000'),
  categoryId: Yup.string().required('Category is required')
});

const initialValues: Product = {
  name: '',
  description: '',
  price: '',
  images: [],
  categoryId: ''
};

type ProductAddProps = {
  showProductAdd: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowProductAdd: (param: boolean) => void;
};

const ProductAdd = ({ showProductAdd, setShowProductAdd }: ProductAddProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const [images, setImages] = useState<any[]>([]);
  console.log(images);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    let err = '';
    let newImages: any[] = [];
    files.forEach((file) => {
      if (!file) return (err = 'File does not exist');
      if (file.size > 1024 * 1024 * 5) {
        return (err = 'The image/video largest is 5mb');
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
      dispatch(productActions.addProduct(values));
      setShowProductAdd(false);
    }
  });

  return (
    <Dialog show={showProductAdd} setShow={setShowProductAdd} title="PRODUCT ADD">
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
            startIcon={<MessageIcon />}
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
          <input
            name="images"
            value={formIk.values.images}
            onChange={handleChangeImage}
            type="file"
            multiple
            accept="image/*"
          />
          <div className="show-images">
            {images.map((img, index) => (
              <div key={index} id="file-img">
                {imageShow(URL.createObjectURL(img))}
                <span onClick={() => deleteImages(index)}>&times;</span>
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

ProductAdd.propTypes = {
  showProductAdd: PropTypes.bool,
  setShowProductAdd: PropTypes.func
};

export default ProductAdd;

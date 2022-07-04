import PropTypes from 'prop-types';
import { makeStyles, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Product } from 'types/product';
import { imageShow } from 'utils/functions';
import { Category } from 'types/category';

const useStyles = makeStyles(() => ({
  imageList: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 10,
    rowGap: 10,
    flexWrap: 'wrap',
    padding: 10
  },
  imageItem: {
    maxWidth: 100,
    '& img': {
      border: '1px solid #ddd',
      padding: 10,
      maxWidth: '100%'
    }
  }
}));

type ProductDetailProps = {
  category: Category;
  showProductDetail: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowProductDetail: (param: boolean) => void;
  productRecord: Product;
};

const ProductDetail = ({
  category,
  showProductDetail,
  setShowProductDetail,
  productRecord
}: ProductDetailProps) => {
  const classes = useStyles();
  const { name, description, price, sold, star, images } = productRecord;

  return (
    <>
      <Dialog show={showProductDetail} setShow={setShowProductDetail} title="PRODUCT DETAIL">
        <DialogContent dividers>
          <Typography variant="h6">Name</Typography>
          <DialogContentText>{name}</DialogContentText>
          <Typography variant="h6">Email</Typography>
          <DialogContentText>{description}</DialogContentText>
          <Typography variant="h6">Category</Typography>
          <DialogContentText>{category.name}</DialogContentText>
          <img style={{ border: '1px solid #ddd' }} src={category.image || ''} alt="" />
          <Typography variant="h6">Price</Typography>
          <DialogContentText>{price}</DialogContentText>
          <Typography variant="h6">Sold</Typography>
          <DialogContentText>{sold}</DialogContentText>
          <Typography variant="h6">Star</Typography>
          <DialogContentText>{star?.average}</DialogContentText>
          <Typography variant="h6">Images</Typography>
          <div className={classes.imageList}>
            {images &&
              images.map((img, index) => (
                <div className={classes.imageItem} key={index}>
                  {imageShow(img.url)}
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

ProductDetail.propTypes = {
  showProductDetail: PropTypes.bool,
  setShowProductDetail: PropTypes.func,
  productRecord: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
    price: PropTypes.number,
    sold: PropTypes.number,
    star: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.any)
  })
};

export default ProductDetail;

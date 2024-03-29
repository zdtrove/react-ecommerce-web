import PropTypes from 'prop-types';
import { makeStyles, DialogContent, DialogContentText, Typography, Box } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Product } from 'types/product';
import { Category } from 'types/category';
import { uiActions } from 'redux/features/ui/slice';
import { useAppDispatch } from 'redux/hook';

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
    cursor: 'pointer',
    '& img': {
      border: '1px solid #ddd',
      padding: 10,
      maxWidth: '100%'
    }
  }
}));

type Props = {
  category: Category;
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  product: Product;
};

const Detail = ({ category, show, setShow, product }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { setLightBoxImage, showLightBox, setLightBoxImageList } = uiActions;
  const { name, description, price, sold, star, images } = product;

  return (
    <>
      <Dialog show={show} setShow={setShow} title="PRODUCT DETAIL">
        <DialogContent dividers>
          <Typography variant="h6">Name</Typography>
          <DialogContentText>{name}</DialogContentText>
          <Typography variant="h6">Description</Typography>
          <DialogContentText>{description}</DialogContentText>
          <Typography variant="h6">Category</Typography>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ border: '1px solid #ddd', width: 150, padding: 5, borderRadius: 52 }}
          >
            <img style={{ width: '80%' }} src={category.image!} alt="" />
          </Box>
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
                  <img
                    onClick={() => {
                      const listImages = images.map((item) => item.url);
                      dispatch(setLightBoxImageList(listImages));
                      dispatch(setLightBoxImage(img.url));
                      dispatch(showLightBox());
                    }}
                    src={img.url}
                  />
                </div>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

Detail.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  product: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.string,
    price: PropTypes.number,
    sold: PropTypes.number,
    star: PropTypes.shape({
      average: PropTypes.number,
      list: PropTypes.arrayOf(PropTypes.any)
    }),
    images: PropTypes.arrayOf(PropTypes.any)
  })
};

export default Detail;

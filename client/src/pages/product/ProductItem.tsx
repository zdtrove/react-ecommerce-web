import { Box, Typography, makeStyles } from '@material-ui/core';
import { Product } from 'types/product';
import { formatNumber } from 'utils/functions';
import StarIcon from '@material-ui/icons/Star';
import { Button } from 'components/UI';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { cartActions } from 'redux/features/cart/slice';
import { selectProducts } from 'redux/features/product/slice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'white',
    maxWidth: 215,
    padding: 10,
    borderRadius: 5,
    minHeight: 338,
    border: '1px solid #ddd',
    position: 'relative',
    '& figure': {
      width: '90%',
      textAlign: 'center',
      margin: '0 auto',
      '& img': {
        width: '100%'
      }
    },
    '& .MuiButtonBase-root': {
      padding: '2px 16px',
      borderRadius: 20,
      position: 'absolute',
      bottom: 10
    }
  },
  name: {
    fontWeight: 700,
    padding: '3px 0'
  },
  price: {
    fontWeight: 700
  },
  star: {
    '& .MuiSvgIcon-root': {
      width: 20,
      padding: '3px 0',
      marginRight: 5,
      color: 'orange'
    },
    '& small': {
      fontWeight: 700
    }
  },
  addToCart: {
    backgroundColor: theme.palette.green.dark
  }
}));

type Props = {
  product: Product;
};

const ProductItem = ({ product }: Props) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { addToCart } = cartActions;
  const products = useAppSelector(selectProducts);

  return (
    <div className={classes.root} key={product._id}>
      <figure>
        <img src={product.images && product.images[0].url} alt="" />
      </figure>
      <Typography className={classes.name} variant="subtitle2">
        {product.name}
      </Typography>
      <Typography className={classes.price} color="secondary" variant="h5">
        {formatNumber(product.price)}
      </Typography>
      <Box className={classes.star} display="flex" justifyContent="left" alignItems="center">
        <StarIcon />
        <Typography variant="subtitle2">
          4.9 <small>(33)</small>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="left" alignItems="center">
        {product.inCart ? (
          <Button variant="contained" disabled text="In Cart" />
        ) : (
          <Button
            className={classes.addToCart}
            onClick={() => dispatch(addToCart({ product, products, inCart: true }))}
            text="Add To Cart"
          />
        )}
      </Box>
    </div>
  );
};

export default ProductItem;

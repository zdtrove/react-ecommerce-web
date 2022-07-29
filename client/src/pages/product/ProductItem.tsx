import { Box, Typography } from '@material-ui/core';
import { Product } from 'types/product';
import { formatNumber } from 'utils/functions';
import StarIcon from '@material-ui/icons/Star';
import { Button } from 'components/UI';
import { makeStyles } from '@material-ui/styles';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { cartActions } from 'redux/features/cart/slice';
import { selectProducts } from 'redux/features/product/slice';

const useStyles = makeStyles(() => ({
  productItem: {
    backgroundColor: 'white',
    width: 220,
    padding: 10,
    borderRadius: 8,
    minHeight: 325,
    '& figure': {
      width: '90%',
      textAlign: 'center',
      margin: '0 auto',
      '& img': {
        width: '100%'
      }
    }
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
    <div className={classes.productItem} key={product._id}>
      <figure>
        <img src={product.images && product.images[0].url} alt="" />
      </figure>
      <Typography variant="h6">{product.name}</Typography>
      <Typography align="center" color="secondary" variant="h6">
        {formatNumber(product.price)}
      </Typography>
      <Box display="flex" justifyContent="left" alignItems="center">
        <StarIcon />
        <Typography>4.9 (33)</Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        {product.inCart ? (
          <Button variant="contained" disabled text="In Cart" />
        ) : (
          <Button
            onClick={() => dispatch(addToCart({ product, products, inCart: true }))}
            text="Add To Cart"
          />
        )}
      </Box>
    </div>
  );
};

export default ProductItem;

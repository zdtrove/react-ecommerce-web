import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Store } from 'types/store';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  store: Store;
};

const Detail = ({ show, setShow, store }: Props) => {
  const { name, address, region } = store;

  return (
    <>
      <Dialog show={show} setShow={setShow} title="STORE DETAIL">
        <DialogContent dividers>
          <Typography variant="h6">Name</Typography>
          <DialogContentText>{name}</DialogContentText>
          <Typography variant="h6">Address</Typography>
          <DialogContentText>{address}</DialogContentText>
          <Typography variant="h6">Region</Typography>
          <DialogContentText>{region}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

Detail.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  store: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    region: PropTypes.string
  })
};

export default Detail;

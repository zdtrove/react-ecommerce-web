import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Store } from 'types/store';

type Props = {
  showDetail: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowDetail: (param: boolean) => void;
  storeRecord: Store;
};

const StoreDetail = ({ showDetail, setShowDetail, storeRecord }: Props) => {
  const { name, address, region } = storeRecord;

  return (
    <>
      <Dialog show={showDetail} setShow={setShowDetail} title="STORE DETAIL">
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

StoreDetail.propTypes = {
  showDetail: PropTypes.bool,
  setShowDetail: PropTypes.func,
  storeRecord: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    region: PropTypes.string
  })
};

export default StoreDetail;

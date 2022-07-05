import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Store } from 'types/store';

type StoreDetailProps = {
  showStoreDetail: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowStoreDetail: (param: boolean) => void;
  storeRecord: Store;
};

const StoreDetail = ({ showStoreDetail, setShowStoreDetail, storeRecord }: StoreDetailProps) => {
  const { name, address, region } = storeRecord;

  return (
    <>
      <Dialog show={showStoreDetail} setShow={setShowStoreDetail} title="STORE DETAIL">
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
  showStoreDetail: PropTypes.bool,
  setShowStoreDetail: PropTypes.func,
  storeRecord: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    region: PropTypes.string
  })
};

export default StoreDetail;

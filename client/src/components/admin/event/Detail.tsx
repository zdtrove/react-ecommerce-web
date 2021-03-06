import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Event } from 'types/event';

type Props = {
  showDetail: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowDetail: (param: boolean) => void;
  eventRecord: Event;
};

const Detail = ({ showDetail, setShowDetail, eventRecord }: Props) => {
  const { name, description, startDate, endDate } = eventRecord;

  return (
    <>
      <Dialog show={showDetail} setShow={setShowDetail} title="EVENT DETAIL">
        <DialogContent dividers>
          <Typography variant="h6">Name</Typography>
          <DialogContentText>{name}</DialogContentText>
          <Typography variant="h6">Description</Typography>
          <DialogContentText>{description}</DialogContentText>
          <Typography variant="h6">Start date</Typography>
          <DialogContentText>{startDate}</DialogContentText>
          <Typography variant="h6">End date</Typography>
          <DialogContentText>{endDate}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

Detail.propTypes = {
  showDetail: PropTypes.bool,
  setShowDetail: PropTypes.func,
  eventRecord: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })
};

export default Detail;

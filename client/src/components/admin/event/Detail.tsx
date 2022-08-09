import PropTypes from 'prop-types';
import { DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Dialog } from 'components/UI';
import { Event } from 'types/event';

type Props = {
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  event: Event;
};

const Detail = ({ show, setShow, event }: Props) => {
  const { name, description, startDate, endDate } = event;

  return (
    <>
      <Dialog show={show} setShow={setShow} title="EVENT DETAIL">
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
  show: PropTypes.bool,
  setShow: PropTypes.func,
  event: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string
  })
};

export default Detail;

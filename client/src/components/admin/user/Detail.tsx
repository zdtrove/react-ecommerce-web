import PropTypes from 'prop-types';
import { makeStyles, DialogContent, DialogContentText, Typography } from '@material-ui/core';
import { Button, Dialog } from 'components/UI';
import { User } from 'types/user';

const useStyles = makeStyles((theme) => ({
  marginBtn: {
    margin: theme.spacing(0.5)
  }
}));

type Props = {
  showDetail: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowDetail: (param: boolean) => void;
  userRecord: User;
};

const Detail = ({ showDetail, setShowDetail, userRecord }: Props) => {
  const classes = useStyles();
  const { fullName, email, phone, city, gender, payments, role } = userRecord;

  return (
    <>
      <Dialog show={showDetail} setShow={setShowDetail} title="USER DETAIL">
        <DialogContent dividers>
          <Typography variant="h6">Full Name</Typography>
          <DialogContentText>{fullName}</DialogContentText>
          <Typography variant="h6">Email</Typography>
          <DialogContentText>{email}</DialogContentText>
          <Typography variant="h6">Phone</Typography>
          <DialogContentText>{phone}</DialogContentText>
          <Typography variant="h6">City</Typography>
          <DialogContentText>{city}</DialogContentText>
          <Typography variant="h6">Role</Typography>
          <DialogContentText>{role}</DialogContentText>
          <Typography variant="h6">Payment Methods</Typography>
          <DialogContentText>
            {payments.map((pay, idx) => (
              <Button className={classes.marginBtn} key={idx} text={pay} />
            ))}
          </DialogContentText>
          <Typography variant="h6">Gender</Typography>
          <DialogContentText>{gender}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

Detail.propTypes = {
  showDetail: PropTypes.bool,
  setShowDetail: PropTypes.func,
  userRecord: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    city: PropTypes.string,
    gender: PropTypes.string,
    payments: PropTypes.arrayOf(PropTypes.string),
    role: PropTypes.string
  })
};

export default Detail;

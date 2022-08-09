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
  show: boolean;
  // eslint-disable-next-line no-unused-vars
  setShow: (param: boolean) => void;
  user: User;
};

const Detail = ({ show, setShow, user }: Props) => {
  const classes = useStyles();
  const { fullName, email, phone, city, gender, payments, role } = user;

  return (
    <>
      <Dialog show={show} setShow={setShow} title="USER DETAIL">
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
  show: PropTypes.bool,
  setShow: PropTypes.func,
  user: PropTypes.shape({
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

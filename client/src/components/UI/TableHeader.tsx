import { useHistory } from 'react-router-dom';
import { makeStyles, Paper, Card, Typography } from '@material-ui/core';
import { Button } from 'components/UI';

const useStyles = makeStyles((theme) => ({
  rootHeader: {
    padding: theme.spacing(2),
    minWidth: 240,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  header: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2)
    },
    display: 'flex'
  },
  headerIcon: {
    display: 'inline-block',
    padding: theme.spacing(2),
    color: '#3c44b1'
  },
  headerTitle: {
    paddingLeft: theme.spacing(4),
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  }
}));

type Props = {
  title: string;
  subtitle: string;
  route?: string;
  icon: React.ReactElement;
};

const TableHeader = ({ title, subtitle, route, icon }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper className={classes.rootHeader}>
      <div className={classes.header}>
        <Card className={classes.headerIcon}>{icon}</Card>
        <div className={classes.headerTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subtitle}
          </Typography>
        </div>
      </div>
      {route && <Button text="View all" onClick={() => history.push(route)} />}
    </Paper>
  );
};

export default TableHeader;

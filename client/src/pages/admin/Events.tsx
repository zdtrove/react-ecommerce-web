import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import Layout from 'components/admin/layouts';
import { Input, Button, Table, TableHeader, TablePaginationActions } from 'components/UI';
import {
  makeStyles,
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
  Toolbar
} from '@material-ui/core';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Detail from 'components/admin/event/Detail';
import Edit from 'components/admin/event/Edit';
import Add from 'components/admin/event/Add';
import { Event } from 'types/event';
import { eventActions, selectEvents } from 'redux/features/event/slice';
import Delete from 'components/admin/event/Delete';
import { uiActions } from 'redux/features/ui/slice';

const useStyles = makeStyles((theme) => ({
  marginBtn: {
    margin: theme.spacing(0.5)
  },
  rootTable: {
    minWidth: 240
  },
  tableAction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    flexDirection: 'column',
    alignItems: 'baseline',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    '& .MuiButtonBase-root': {
      minWidth: 110,
      padding: 5,
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(1)
      }
    },
    '& .MuiFormControl-root': {
      maxWidth: 300
    },
    '& .MuiInputBase-input': {
      padding: 11,
      paddingLeft: 0
    }
  }
}));

const Events = () => {
  const dispatch = useAppDispatch();
  const classes = useStyles();
  const events = useAppSelector(selectEvents);
  const { showModal } = uiActions;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [eventRecord, setEventRecord] = useState<Event>({} as Event);
  const [eventList, setEventList] = useState<Event[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const onPageChange = (e: unknown, nextPage: number) => {
    setPage(nextPage);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  useEffect(() => {
    setEventList(events);
  }, [events]);

  useEffect(() => {
    if (!events.length) {
      dispatch(eventActions.getEvents());
    }
  }, []);

  useEffect(() => {
    setPage(0);
    setEventList(
      events.filter((event) => event.name.toLowerCase().includes(searchValue.toLowerCase()))
    );
  }, [searchValue]);

  return (
    <Layout>
      <TableHeader title="Events" subtitle="List Events" icon={<EventNoteIcon />} />
      <TableContainer className={classes.rootTable} component={Paper}>
        <Toolbar className={classes.tableAction}>
          <Input
            label="Search Events"
            startIcon={<SearchIcon />}
            onChange={(e) => setSearchValue(e.target.value)}
            margin="none"
            value={searchValue}
          />
          <Button
            onClick={() => {
              dispatch(showModal());
              setShowAdd(true);
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            text="ADD NEW"
          />
        </Toolbar>
        <Table headers={['Name', 'Description', 'Start Date', 'End Date', 'Actions']}>
          {eventList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((event, idx) => (
              <TableRow key={idx}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.startDate}</TableCell>
                <TableCell>{event.endDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setEventRecord(event);
                      setShowDetail(true);
                    }}
                    className={classes.marginBtn}
                    text="DETAIL"
                    color="default"
                  />
                  <Button
                    onClick={() => {
                      setEventRecord(event);
                      dispatch(showModal());
                      setShowEdit(true);
                    }}
                    className={classes.marginBtn}
                    text="EDIT"
                  />
                  <Button
                    className={classes.marginBtn}
                    color="secondary"
                    text="DELETE"
                    onClick={() => {
                      setEventRecord(event);
                      dispatch(showModal());
                      setShowDelete(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 6, 10, 25, 50]}
          component="div"
          count={eventList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          ActionsComponent={TablePaginationActions}
        />
      </TableContainer>
      {showAdd && <Add show={showAdd} setShow={setShowAdd} />}
      {showDetail && <Detail show={showDetail} setShow={setShowDetail} event={eventRecord} />}
      {showEdit && <Edit show={showEdit} setShow={setShowEdit} event={eventRecord} />}
      {showDelete && <Delete show={showDelete} setShow={setShowDelete} event={eventRecord} />}
    </Layout>
  );
};

export default Events;

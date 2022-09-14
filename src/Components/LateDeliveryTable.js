import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Button,
  Toolbar,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { makeStyles } from '@mui/styles';
import FormDialog from './Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { DeleteEvent } from '../Redux/Actions/EventsAction';

const useStyles = makeStyles(() => ({
  root: {},
  ActionItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainalert: {
    width: '100%',
  },
  TableButton: {
    '& .MuiButtonBase-root': {
      borderRadius: '20px',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    margin: '2%',
    borderRadius: '20px',
  },
  TableCell: {
    display: 'flex',
    alignItems: 'center',
  },
  blueIcon: {
    color: '#050558',
  },
}));

const EnhancedTableToolbar = () => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
      style={{ background: 'blue' }}
    >
      <Typography
        sx={{ flex: '1 1 100%', color: 'white' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Late Delivery
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <ArrowDropDownCircleIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

function LateDeliveryTable() {
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [UserId, setUserId] = useState(0);
  const [searchedData, setSearchedData] = useState('');
  const [SortAmountFlag, setSortAmountFlag] = useState(0);
  const [SortGraceFlag, setSortGraceFlag] = useState(0);
  const [DisableAmountFlag, setDisableAmountFlag] = useState(0);
  const [DisableGraceFlag, setDisableGraceFlag] = useState(0);

  const Event = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(Event);

  const OpenDialog = () => {
    setOpenDialog(true);
    setUserId(0);
  };

  const handleResetDialog = () => {
    setOpenDialog(false);
  };

  const DeleteEvents = (id) => {
    console.log({ id });
    dispatch(DeleteEvent(id));
  };

  const UpdateItem = (id) => {
    setOpenDialog(true);
    setUserId(id);
  };
  const [SearchInput, setSearchInput] = useState('');
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  useEffect(() => {
    setSearchedData(Event);
  }, [Event]);

  console.log(searchedData);

  useEffect(() => {
    if (SearchInput) {
      setSearchedData({
        Events: searchedData.Events.filter(
          (item) =>
            item?.data?.Amount.includes(SearchInput) ||
            item?.data?.wheelerType.includes(SearchInput) ||
            item?.data?.Grace.includes(SearchInput)
        ),
      });
    } else {
      setSearchedData(Event);
    }
    //eslint-disable-next-line
  }, [SearchInput]);

  const SortAmount = () => {
    setDisableAmountFlag(1);
    if (SortAmountFlag) {
      setSearchedData({
        Events: searchedData.Events.sort(
          (item1, item2) => item1.data.Amount - item2.data.Amount
        ),
      });
    } else {
      setSearchedData({
        Events: searchedData.Events.sort(
          (item1, item2) => item2.data.Amount - item1.data.Amount
        ),
      });
    }
    setSortAmountFlag(!SortAmountFlag);
    setDisableGraceFlag(0);
  };
  const SortGrace = () => {
    setDisableGraceFlag(1);
    if (SortGraceFlag) {
      setSearchedData({
        Events: searchedData.Events.sort(
          (item1, item2) => item1.data.Grace - item2.data.Grace
        ),
      });
    } else {
      setSearchedData({
        Events: searchedData.Events.sort(
          (item1, item2) => item2.data.Grace - item1.data.Grace
        ),
      });
    }
    setSortGraceFlag(!SortGraceFlag);
    setDisableAmountFlag(0);
  };

  console.log({ SortAmountFlag });

  return (
    <>
      <TableContainer component={Paper}>
        <Grid container>
          <Grid item xs={4}>
            <TextField
              name="search"
              value={SearchInput}
              label="Search"
              onChange={handleSearchChange}
              fullWidth
              style={{ margin: '10%' }}
            />
          </Grid>
        </Grid>
        <EnhancedTableToolbar />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Sr.No</TableCell> */}
              <TableCell align="left">Vehicle Type</TableCell>
              <TableCell align="left" onClick={SortAmount}>
                {' '}
                <span className={classes.TableCell}>
                  {' '}
                  Amount{' '}
                  {DisableAmountFlag ? (
                    SortAmountFlag ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : null}{' '}
                </span>
              </TableCell>
              <TableCell align="left" onClick={SortGrace}>
                {' '}
                <span className={classes.TableCell}>
                  {' '}
                  Grace
                  {DisableGraceFlag ? (
                    SortGraceFlag ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )
                  ) : null}{' '}
                </span>
              </TableCell>
              <TableCell align="center">Action Items</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedData?.Events?.map((item, key) => (
              <TableRow key={key}>
                <TableCell align="left">{item?.data?.wheelerType}</TableCell>
                <TableCell align="left">{item?.data?.Amount}</TableCell>
                <TableCell align="left">{item?.data?.Grace}</TableCell>
                <TableCell align="center">
                  <IconButton
                    style={{ color: 'lightblue' }}
                    onClick={() => UpdateItem(item.data.id)}
                  >
                    <ModeEditOutlineTwoToneIcon />
                  </IconButton>
                  <IconButton
                    style={{ color: 'red' }}
                    onClick={() => DeleteEvents(item.data.id)}
                  >
                    <DeleteTwoToneIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className={classes.TableButton}>
          <Button
            onClick={OpenDialog}
            variant="outlined"
            size="large"
            className={classes.blueIcon}
          >
            Add
          </Button>
        </div>
      </TableContainer>
      <FormDialog
        open1={openDialog}
        handleResetDialog={handleResetDialog}
        UserId={UserId}
      />
    </>
  );
}

export default LateDeliveryTable;

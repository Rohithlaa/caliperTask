import * as React from 'react';

import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { AddEvent, EditEvent } from '../Redux/Actions/EventsAction';

const useStyles = makeStyles({
  TableButton: {
    '& .MuiButtonBase-root': {
      borderRadius: '20px',
    },
  },
});

export default function FormDialog({
  open1,
  handleResetDialog,
  UserId,
  SearchedData,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(open1);
  const [EditUserData, setEditUserData] = useState('');
  const Events = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setOpen(open1);
  }, [open1]);

  React.useEffect(() => {
    let Userdata = '';

    if (UserId > 0) {
      Userdata = Events.Events.filter((item) => item?.data?.id === UserId);
      setEditUserData(Userdata[0]);
    } else {
      setEditUserData('');
    }
    //eslint-disable-next-line
  }, [UserId, EditUserData]);

  const handleClose = () => {
    setEditUserData('');
    handleResetDialog();
    setOpen(false);
  };

  const initialValues = {
    wheelerType: EditUserData ? EditUserData?.data?.wheelerType : '',
    Grace: EditUserData ? EditUserData?.data?.Grace : '',
    Amount: EditUserData ? EditUserData?.data?.Amount : '',
    UDM: EditUserData ? EditUserData?.data?.UDM : '',
    UCM: EditUserData ? EditUserData?.data?.UCM : '',
  };

  const validationSchema = yup.object({
    wheelerType: yup.string().required('Please Enter Wheeler Type'),
    Grace: yup
      .number()
      .required('Please Enter Grace')
      .test('number', 'Grace must be number', (value) => {
        if (typeof value !== 'number') {
          return false;
        }
        return true;
      }),
    Amount: yup.number().required('Please Enter Amount'),
    UDM: yup.string().required('Please Enter UDM'),
    UCM: yup.string().required('Please Enter UCM'),
  });

  const onSubmit = (values, props) => {
    if (EditUserData) {
      handleResetDialog();
      setOpen(false);
      values.id = UserId;
      dispatch(EditEvent(values));
      setEditUserData('');
    } else {
      const d = new Date();
      let time = d.getTime();
      values.id = time;
      handleResetDialog();
      setOpen(false);
      dispatch(AddEvent(values));
    }
  };

  return (
    <div>
      <Dialog open={open} fullWidth maxWidth>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <DialogTitle>Add Event</DialogTitle>
              <DialogContent style={{ padding: '1%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label="Wheeler Type"
                      name="wheelerType"
                      value={props.values.wheelerType}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.errors.wheelerType && props.touched.wheelerType
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.wheelerType && props.touched.wheelerType
                          ? props.errors.wheelerType
                          : ''
                      }
                      fullWidth
                    >
                      <MenuItem value="2 wheeler 150 kg">
                        2 wheeler 150 kg
                      </MenuItem>
                      <MenuItem value="3 wheeler 200 kg">
                        3 wheeler 200 kg
                      </MenuItem>
                      <MenuItem value="4 wheeler 300 kg">
                        4 wheeler 300 kg
                      </MenuItem>
                      <MenuItem value="5 wheeler 400 kg">
                        5 wheeler 400 kg
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Grace"
                      name="Grace"
                      value={props.values.Grace}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.errors.Grace && props.touched.Grace ? true : false
                      }
                      helperText={
                        props.errors.Grace && props.touched.Grace
                          ? props.errors.Grace
                          : ''
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label="UCM"
                      name="UCM"
                      value={props.values.UCM}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.errors.UCM && props.touched.UCM ? true : false
                      }
                      helperText={
                        props.errors.UCM && props.touched.UCM
                          ? props.errors.UCM
                          : ''
                      }
                      fullWidth
                    >
                      <MenuItem value="Hours">Hours</MenuItem>
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Seconds">Seconds</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Amount"
                      name="Amount"
                      value={props.values.Amount}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.errors.Amount && props.touched.Amount
                          ? true
                          : false
                      }
                      helperText={
                        props.errors.Amount && props.touched.Amount
                          ? props.errors.Amount
                          : ''
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label="UDM"
                      name="UDM"
                      value={props.values.UDM}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      error={
                        props.errors.UDM && props.touched.UDM ? true : false
                      }
                      helperText={
                        props.errors.UDM && props.touched.UDM
                          ? props.errors.UDM
                          : ''
                      }
                      fullWidth
                    >
                      <MenuItem value="Hours">Hours</MenuItem>
                      <MenuItem value="Minutes">Minutes</MenuItem>
                      <MenuItem value="Seconds">Seconds</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Grid container spacing={6}>
                  <Grid item xs={6}></Grid>
                  <Grid
                    item
                    xs={6}
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"
                    className={classes.TableButton}
                  >
                    <Button onClick={handleClose} variant="outlined">
                      Close
                    </Button>
                    {EditUserData ? (
                      <Button onClick={props.handleSubmit} variant="outlined">
                        Update
                      </Button>
                    ) : (
                      <Button onClick={props.handleSubmit} variant="outlined">
                        Save
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </div>
  );
}

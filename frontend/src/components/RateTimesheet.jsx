import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Modal from '../common/Modal';
import { useRateTimesheetMutation } from '../state/features/apiSlice';

const RateTimesheet = ({ timesheetId, employee }) => {
  const [openState, setOpenState] = useState(false);
  const [rating, setRating] = useState(0);

  const [rateTimesheet, { isLoading, data, error }] =
    useRateTimesheetMutation();

  const closeModal = () => setOpenState(false);

  const giveRating = () => {
    rateTimesheet({
      timesheetId,
      employee: employee._id,
      rating: !rating ? 0 : rating,
    });
  };

  useEffect(() => {
    if (data && data.success) {
      toast.success('You Rated This Timesheet!');
      setOpenState(() => false);
    }
    if (error) {
      toast.error(error?.data?.message || error.message);
    }
  }, [data, error]);

  return (
    <>
      <Button
        sx={{ mb: 6 }}
        color='secondary'
        variant='contained'
        onClick={() => setOpenState(true)}
      >
        Rate Timesheet
      </Button>

      <Modal
        title='Rate Timesheet'
        openState={openState}
        closeHandler={closeModal}
        modalButton={
          <Button
            color='secondary'
            variant='contained'
            disabled={isLoading}
            onClick={giveRating}
          >
            {isLoading ? 'Please Wait...' : 'Submit'}
          </Button>
        }
      >
        <Box>
          <Stack justifyContent='center' alignItems='center'>
            <Typography variant='h6' component='p' textAlign='center'>
              Give Rating To This Timesheet.
            </Typography>
            <Box mt={2}>
              <Rating
                name='rating'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default RateTimesheet;

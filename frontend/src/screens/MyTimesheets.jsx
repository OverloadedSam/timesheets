import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import TimesheetCard from '../components/TimesheetCard';
import { useGetMyTimesheetsQuery } from '../state/features/apiSlice';

const MyTimesheets = () => {
  const { isLoading, data, error } = useGetMyTimesheetsQuery();

  return (
    <Container>
      <Typography my={4} variant='h2' component='h1' textAlign='center'>
        My Timesheets
      </Typography>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert message={error?.data?.message || error.message} />
      ) : !data?.timesheets?.length ? (
        <Alert message='You do not have any timesheet yet.' />
      ) : (
        <Grid container justifyContent='center' spacing={3} mb={5}>
          {data.timesheets.map((timesheet) => (
            <Grid item key={timesheet._id}>
              <TimesheetCard {...timesheet} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyTimesheets;

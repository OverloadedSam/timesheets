import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import FindTimesheetIcon from '@mui/icons-material/FindInPage';
import Input from '../common/Input';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import TimesheetCard from '../components/TimesheetCard';
import { findMyTimeSheetSchema as schema } from '../validations/timesheet';
import { useFindMyTimesheetsMutation } from '../state/features/apiSlice';

const AddToTimesheet = () => {
  const [findMyTimesheets, { isLoading, data, error }] =
    useFindMyTimesheetsMutation();

  const defaultFormValues = {
    startDate: '',
    endDate: '',
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => findMyTimesheets(data);

  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Stack mt={8} alignItems='center'>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FindTimesheetIcon />
          </Avatar>
          <Typography component='h1' variant='h4' textAlign='center'>
            Add to Timesheet
          </Typography>
          {error && (
            <Typography
              color='red'
              variant='body1'
              textAlign='center'
              fontWeight={500}
              my={2}
            >
              {error.data?.message || error.error}
            </Typography>
          )}
          <Stack
            component='form'
            gap={2}
            flexGrow={1}
            direction={{ xs: 'column', sm: 'row' }}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Box>
              <Input
                sx={{ minWidth: '170px' }}
                control={control}
                error={errors?.startDate?.message}
                disabled={isLoading}
                label='Start Date'
                InputLabelProps={{
                  shrink: true,
                }}
                name='startDate'
                type='date'
              />
            </Box>
            <Box>
              <Input
                sx={{ minWidth: '170px' }}
                control={control}
                error={errors?.endDate?.message}
                disabled={isLoading}
                InputLabelProps={{
                  shrink: true,
                }}
                label='End Date'
                name='endDate'
                type='date'
              />
            </Box>
            <Button
              type='submit'
              fullWidth
              disabled={isLoading}
              variant='contained'
              sx={{ mt: 3, mb: 2, alignSelf: 'flex-start' }}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Container>
        {isLoading ? (
          <Loader mt={2} />
        ) : !error && data?.timesheets.length === 0 ? (
          <Alert
            mt={4}
            severity='warning'
            title='Ah Snap!'
            message='No result found for given date range!'
          />
        ) : data ? (
          <Grid mt={2} container justifyContent='center' spacing={3} mb={5}>
            {data.timesheets.map((timesheet) => (
              <Grid item key={timesheet._id}>
                <TimesheetCard {...timesheet} />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </Container>
    </>
  );
};

export default AddToTimesheet;

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import FlexBetween from '../common/FlexBetween';
import Input from '../common/Input';
import Select from '../common/Select';
import { timesheetTaskSchema as schema } from '../validations/timesheet';
import {
  useAddTaskToTimesheetMutation,
  useGetTimesheetDetailsQuery,
} from '../state/features/apiSlice';

const hours = Array.from(Array(24).keys()).map((x) => ({
  label: x.toString().padStart(2, '0'),
  value: x,
}));
const minutes = Array.from(Array(60).keys()).map((x) => ({
  label: x.toString().padStart(2, '0'),
  value: x,
}));

const AddTaskToTimesheet = () => {
  const { id } = useParams();
  const { isLoading, data, error } = useGetTimesheetDetailsQuery(id);
  const [
    addTaskToTimesheet,
    { isLoading: addingTask, data: taskData, error: addTaskFailed },
  ] = useAddTaskToTimesheetMutation();

  const defaultValues = {
    hour: 0,
    minute: 0,
    description: '',
    remarks: '',
  };

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (taskData) {
      toast.success('Task added to Timesheet!');
      reset({ defaultValues });
    }
    if (addTaskFailed) {
      toast.error(addTaskFailed?.data?.message || addTaskFailed.message);
      reset({ defaultValues });
    }
  }, [taskData, addTaskFailed]);

  const onSubmit = (data) => {
    data.timesheet = id;
    addTaskToTimesheet(data);
  };

  return (
    <Container>
      <Typography my={4} variant='h2' component='h1' textAlign='center'>
        Add Task to Timesheet
      </Typography>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Alert message={error?.data?.message || error.message} />
      ) : data ? (
        <>
          <FlexBetween
            flexWrap='wrap'
            gap={2}
            p={2}
            mb={4}
            border='2px solid'
            borderColor='primary.main'
            borderRadius='40px'
          >
            <Typography variant='h6' color='primary'>
              Project Name: {data.timesheet.projectName}
            </Typography>
            <Typography variant='h6' color='primary'>
              {data.timesheet.employee.name}
            </Typography>
            <Typography variant='h6' color='primary'>
              ID: {data.timesheet._id}
            </Typography>
            <Typography variant='h6' color='primary'>
              Date: {new Date(data.timesheet.date).toLocaleDateString('en-IN')}
            </Typography>
          </FlexBetween>
          <Container>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
              <Stack direction='row' gap={2}>
                <Select
                  style={{ width: '80px' }}
                  fullWidth={false}
                  control={control}
                  name='hour'
                  label='HH'
                  error={errors?.hour?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue=''
                  disabled={isLoading}
                  options={hours}
                />
                <Select
                  style={{ width: '80px' }}
                  fullWidth={false}
                  control={control}
                  name='minute'
                  label='MM'
                  error={errors?.minute?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue=''
                  disabled={isLoading}
                  options={minutes}
                />
              </Stack>

              <Stack direction={{ xs: 'colum', sm: 'row' }} gap={4}>
                <Box flex={1}>
                  <Input
                    control={control}
                    error={errors?.description?.message}
                    disabled={isLoading}
                    label='Description'
                    name='description'
                    autoFocus
                    multiline
                    rows={5}
                  />
                </Box>
                <Box flex={1}>
                  <Input
                    control={control}
                    error={errors?.remarks?.message}
                    disabled={isLoading}
                    label='Remarks'
                    name='remarks'
                    multiline
                    rows={5}
                  />
                </Box>
              </Stack>
              <Button
                type='submit'
                disabled={addingTask}
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {addingTask ? 'Adding Task...' : 'Add Task'}
              </Button>
            </Box>
          </Container>
        </>
      ) : null}
    </Container>
  );
};

export default AddTaskToTimesheet;

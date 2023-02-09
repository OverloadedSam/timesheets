import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CreateTimesheetIcon from '@mui/icons-material/PostAdd';
import Input from '../common/Input';
import schema from '../validations/timesheet';
import { useCreateTimesheetMutation } from '../state/features/apiSlice';
import { selectUser } from '../state/features/authSlice';

const CreateTimesheet = () => {
  const navigate = useNavigate();
  const [createTimesheet, { isLoading, data, error }] =
    useCreateTimesheetMutation();
  const user = useSelector(selectUser);

  const defaultFormValues = {
    projectName: '',
    date: '',
    employee: '',
  };

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'onTouched',
    defaultValues: defaultFormValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data && data.success) {
      toast.success('Timesheet has been created!');
      reset({ defaultValues: defaultFormValues });
    }
  }, [data]);

  useEffect(() => {
    const isAdmin = user?.role.roleId === 0;
    if (!isAdmin) navigate('/');
  }, []);

  const onSubmit = (data) => {
    createTimesheet(data);
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ my: 'auto' }}>
      <Stack mt={3} alignItems='center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <CreateTimesheetIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Create a Timesheet
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
        <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <Input
            control={control}
            error={errors?.projectName?.message}
            disabled={isLoading}
            label='Project Name'
            name='projectName'
            autoFocus
          />
          <Input
            control={control}
            error={errors?.date?.message}
            disabled={isLoading}
            InputLabelProps={{
              shrink: true,
            }}
            label='Date'
            name='date'
            type='date'
          />
          <Input
            control={control}
            error={errors?.employee?.message}
            disabled={isLoading}
            label='Employee ID'
            name='employee'
          />
          <Button
            type='submit'
            fullWidth
            disabled={isLoading}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Please wait...' : 'Create Timesheet'}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateTimesheet;

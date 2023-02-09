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
import AddUserIcon from '@mui/icons-material/PersonAdd';
import Input from '../common/Input';
import Select from '../common/Select';
import schema from '../validations/user';
import { useCreateUserMutation } from '../state/features/apiSlice';
import { selectUser } from '../state/features/authSlice';

const roles = [
  {
    label: 'Admin',
    value: 0,
  },
  {
    label: 'Manager',
    value: 1,
  },
  {
    label: 'Employee',
    value: 2,
  },
];

const CreateUser = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, data, error }] = useCreateUserMutation();
  const user = useSelector(selectUser);

  const defaultFormValues = {
    name: '',
    email: '',
    role: 2,
    reportsTo: '',
    password: '',
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
      toast.success('User has been created!');
      reset({ defaultValues: defaultFormValues });
    }
  }, [data]);

  useEffect(() => {
    const isAdmin = user?.role.roleId === 0;
    if (!isAdmin) navigate('/');
  }, []);

  const onSubmit = (data) => {
    if (!data.reportsTo) delete data.reportsTo;
    createUser(data);
  };

  return (
    <Container component='main' maxWidth='xs' sx={{ my: 'auto' }}>
      <Stack mt={3} alignItems='center'>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <AddUserIcon />
        </Avatar>
        <Typography component='h1' variant='h4'>
          Add User
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
            error={errors?.name?.message}
            disabled={isLoading}
            label='Full Name'
            name='name'
            autoFocus
          />
          <Input
            control={control}
            error={errors?.email?.message}
            disabled={isLoading}
            label='E-mail'
            name='email'
            autoComplete='username'
          />
          <Select
            control={control}
            name='role'
            label='User Role'
            error={errors?.role?.message}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue=''
            disabled={isLoading}
            options={roles}
          />
          <Input
            control={control}
            error={errors?.reportsTo?.message}
            disabled={isLoading}
            label='Reporting Manager (ID)'
            name='reportsTo'
          />
          <Input
            control={control}
            error={errors?.password?.message}
            disabled={isLoading}
            name='password'
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            disabled={isLoading}
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? 'Please wait...' : 'Create User'}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreateUser;

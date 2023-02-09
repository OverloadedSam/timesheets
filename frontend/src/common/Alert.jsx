import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AlertMui from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Alert = (props) => {
  const { title, variant, severity, message, ...rest } = props;
  return (
    <Box width='100%' {...rest}>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <AlertMui severity={severity} variant={variant}>
          <AlertTitle>{title}</AlertTitle>
          {typeof message === 'function' ? message(props) : message}
        </AlertMui>
      </Stack>
    </Box>
  );
};

export default Alert;

Alert.defaultProps = {
  severity: 'error',
  variant: 'filled',
  title: 'Error',
  message: 'Unexpected error occurred!',
};

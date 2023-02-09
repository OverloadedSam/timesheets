import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ ...rest }) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' {...rest}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;

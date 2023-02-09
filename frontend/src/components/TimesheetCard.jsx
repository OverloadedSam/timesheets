import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';
import { selectUser } from '../state/features/authSlice';

const TimesheetCard = ({ _id, projectName, date, employee, rating }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h5' component='div'>
            {projectName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {employee.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {new Date(date).toLocaleDateString('en-IN')}
          </Typography>
          <Stack alignItems='center' direction='row' gap={0.5}>
            Rating:{' '}
            {rating || rating === 0 ? (
              <>
                {rating} <StarIcon color='warning' />
              </>
            ) : (
              'N/A'
            )}
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            sx={{ flex: 1 }}
            size='small'
            onClick={() => navigate(`/timesheet/${_id}`)}
          >
            View
          </Button>
          {!rating && rating !== 0 && user?._id === employee._id && (
            <Button
              sx={{ flex: 1 }}
              size='small'
              onClick={() => navigate(`/add-to-timesheet/${_id}`)}
            >
              Add Task
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default TimesheetCard;

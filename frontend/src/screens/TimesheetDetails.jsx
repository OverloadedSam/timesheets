import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import FlexBetween from '../common/FlexBetween';
import RateTimesheet from '../components/RateTimesheet';
import { useGetTimesheetDetailsQuery } from '../state/features/apiSlice';
import { selectUser } from '../state/features/authSlice';

const TimesheetDetails = () => {
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { isLoading, data, error, refetch } = useGetTimesheetDetailsQuery(id);

  useEffect(() => {
    refetch(id);
  }, [id]);

  return (
    <Container>
      <Typography my={4} variant='h2' component='h1' textAlign='center'>
        Timesheet Details
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
              {!data.timesheet.rating?.toString() ? (
                'Rating: N/A'
              ) : (
                <Stack direction='row' gap={0.5} alignItems='center'>
                  Rating: {data.timesheet.rating}
                  <StarIcon color='warning' />
                </Stack>
              )}
            </Typography>
            <Typography variant='h6' color='primary'>
              Date: {new Date(data.timesheet.date).toLocaleDateString('en-IN')}
            </Typography>
          </FlexBetween>
          <table
            style={{
              width: '100%',
              marginBottom: '40px',
              borderCollapse: 'collapse',
              border: '1px solid black',
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: '10px' }}>Time</th>
                <th style={{ padding: '10px' }}>Description</th>
                <th style={{ padding: '10px' }}>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {data.timesheet.tasks.map((task) => (
                <tr key={task._id}>
                  <td
                    style={{
                      padding: '10px',
                      textAlign: 'center',
                      borderCollapse: 'collapse',
                      border: '1px solid black',
                    }}
                  >
                    {task.hour.toString().padStart(2, '0')}:
                    {task.minute.toString().padStart(2, '0')}
                  </td>
                  <td
                    style={{
                      padding: '10px',
                      borderCollapse: 'collapse',
                      border: '1px solid black',
                    }}
                  >
                    {task.description}
                  </td>
                  <td
                    style={{
                      padding: '10px',
                      borderCollapse: 'collapse',
                      border: '1px solid black',
                    }}
                  >
                    {task.remarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {user?._id === data.timesheet.employee.reportsTo &&
          !data.timesheet.rating?.toString() ? (
            <RateTimesheet
              timesheetId={id}
              employee={data.timesheet.employee}
            />
          ) : null}
        </>
      ) : null}
    </Container>
  );
};

export default TimesheetDetails;

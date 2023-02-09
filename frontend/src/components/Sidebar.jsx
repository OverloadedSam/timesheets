import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserIcon from '@mui/icons-material/AccountCircleOutlined';
import AddUserIcon from '@mui/icons-material/PersonAdd';
import CreateTimesheetIcon from '@mui/icons-material/PostAdd';
import EmployeeTimesheetIcon from '@mui/icons-material/BadgeOutlined';
import AddTimesheetIcon from '@mui/icons-material/NoteAddOutlined';
import MyTimesheetsIcon from '@mui/icons-material/DescriptionOutlined';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { getUserRole, selectUser } from '../state/features/authSlice';

const Sidebar = ({ toggleSidebar, toggleDrawer }) => {
  return (
    <nav>
      <Drawer
        anchor={'left'}
        open={toggleSidebar}
        onClose={toggleDrawer()}
        onOpen={toggleDrawer()}
      >
        <SidebarList toggleDrawer={toggleDrawer} />
      </Drawer>
    </nav>
  );
};

const SidebarList = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userRole = useSelector(getUserRole);

  const listItems = useMemo(() => {
    if (userRole.match(/admin/gi)) {
      return [
        { label: 'Create User', Icon: AddUserIcon, link: '/create-user' },
        {
          label: 'Create Timesheet',
          Icon: CreateTimesheetIcon,
          link: '/create-timesheet',
        },
        {
          label: 'My Timesheets',
          Icon: MyTimesheetsIcon,
          link: '/my-timesheets',
        },
      ];
    }
    if (userRole.match(/manager/gi)) {
      return [
        {
          label: 'Employee Timesheets',
          Icon: EmployeeTimesheetIcon,
          link: '/employees-timesheets',
        },
        {
          label: 'My Timesheets',
          Icon: MyTimesheetsIcon,
          link: '/my-timesheets',
        },
      ];
    } else {
      return [
        {
          label: 'Add to Timesheet',
          Icon: AddTimesheetIcon,
          link: '/add-to-timesheet',
        },
        {
          label: 'My Timesheets',
          Icon: MyTimesheetsIcon,
          link: '/my-timesheets',
        },
      ];
    }
  }, [user]);

  return (
    <Box
      sx={{ width: 280 }}
      role='presentation'
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <Typography
        p={2}
        variant='h5'
        textAlign='center'
        fontWeight={700}
        color='primary'
      >
        TIMESHEETS
      </Typography>
      <Divider />
      <Stack direction='row' alignItems='center' gap={2} p={1.5}>
        <Box>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <UserIcon />
          </Avatar>
        </Box>
        <Box>
          <Typography variant='body1' fontWeight={500}>
            {user?.name}
          </Typography>
          <Typography variant='subtitle1'>({userRole})</Typography>
        </Box>
      </Stack>
      <Divider />
      <List>
        {listItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton onClick={() => navigate(item.link)}>
              <ListItemIcon>
                <item.Icon color='primary' />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/logout')}>
            <ListItemIcon>
              <LogoutIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
};

export default Sidebar;

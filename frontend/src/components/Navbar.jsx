import { useState } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import { isUserLoggedIn } from '../state/features/authSlice';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector(isUserLoggedIn);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    if (isLoggedIn) setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              Timesheets
            </Typography>
            {isLoggedIn ? (
              <Button color='inherit' onClick={() => navigate('/logout')}>
                Log Out
              </Button>
            ) : (
              <Button color='inherit' onClick={() => navigate('/login')}>
                Log In
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Sidebar
        toggleSidebar={isSidebarOpen}
        setToggleSidebar={setIsSidebarOpen}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
};

export default Navbar;

import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box
      as='footer'
      textAlign='center'
      py={1.5}
      color='#fefefe'
      bgcolor='#1e1e1e'
      mt='auto'
    >
      &copy; Timesheets {new Date().getFullYear()}
    </Box>
  );
};

export default Footer;

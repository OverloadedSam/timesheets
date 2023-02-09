import PropTypes from 'prop-types';
import styled from '@mui/material/styles/styled';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ openState, closeHandler, title, modalButton, children }) => {
  return (
    <section>
      <CustomDialog
        onClose={closeHandler}
        aria-labelledby='Change Avatar'
        open={openState}
      >
        <DialogueTitle color='secondary' onClose={closeHandler}>
          {title}
        </DialogueTitle>

        <DialogContent sx={{ mx: 3 }} dividers>
          {children}
        </DialogContent>

        <DialogActions>
          {modalButton || (
            <Button
              variant='contained'
              color='secondary'
              onClick={closeHandler}
            >
              Close
            </Button>
          )}
        </DialogActions>
      </CustomDialog>
    </section>
  );
};

export default Modal;

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DialogueTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

DialogueTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

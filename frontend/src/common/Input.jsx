import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

const Input = (props) => {
  const { control, name, label, error, ...rest } = props;

  return (
    <>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              margin='normal'
              fullWidth
              id={name}
              label={label}
              name={name}
              error={!!error}
              {...field}
              {...rest}
            />
          )}
        />
      ) : (
        <TextField
          margin='normal'
          fullWidth
          id={name}
          label={label}
          name={name}
          error={!!error}
          {...rest}
        />
      )}
      {error && (
        <FormHelperText sx={{ color: 'red', fontWeight: 500 }}>
          {error}
        </FormHelperText>
      )}
    </>
  );
};

export default Input;

Input.defaultProps = { type: 'text', error: null };

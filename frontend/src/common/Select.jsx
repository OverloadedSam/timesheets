import { Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';

const Select = (props) => {
  const {
    control,
    options,
    name,
    error,
    label,
    defaultValue,
    helperText,
    leftContent,
    rightContent,
    variant,
    fullWidth,
    themeColor,
    ...rest
  } = props;

  return (
    <FormControl fullWidth={fullWidth} error={!!error}>
      {control ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id={name}
              select
              label={label}
              defaultValue={defaultValue}
              helperText={helperText}
              variant={'outlined'}
              color={themeColor}
              margin='normal'
              error={!!error}
              InputProps={{
                startAdornment: leftContent && (
                  <InputAdornment position='start'>
                    {leftContent()}
                  </InputAdornment>
                ),
                endAdornment: rightContent && (
                  <InputAdornment position='end'>
                    {rightContent()}
                  </InputAdornment>
                ),
              }}
              {...rest}
            >
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  {...options.props}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      ) : (
        <TextField
          id={name}
          name={name}
          select
          label={label}
          defaultValue={defaultValue}
          helperText={helperText}
          variant={'outlined'}
          color={themeColor}
          margin='normal'
          error={!!error}
          InputProps={{
            startAdornment: leftContent && (
              <InputAdornment position='start'>{leftContent()}</InputAdornment>
            ),
            endAdornment: rightContent && (
              <InputAdornment position='end'>{rightContent()}</InputAdornment>
            ),
          }}
          {...rest}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              {...options.props}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}

      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default Select;

Select.defaultProps = {
  fullWidth: true,
};

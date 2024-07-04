import { TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

const StringFormField = <T extends FieldValues>({ name, label, control }: FormFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          label={label}
          variant="outlined"
          fullWidth
          margin="normal"
          autoComplete="off"
          inputProps={{ maxLength: 25 }}
          {...field}
        />
      )}
    />
  );
};

export default StringFormField;

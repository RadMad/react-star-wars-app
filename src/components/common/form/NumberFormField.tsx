import { TextField } from '@mui/material';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';

interface NumberFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
}

const NumberFormField = <T extends FieldValues>({ name, label, control }: NumberFormFieldProps<T>) => {
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
          type="number"
          autoComplete="off"
          inputProps={{ min: 0, max: 700, step: 1 }}
          {...field}
        />
      )}
    />
  );
};

export default NumberFormField;

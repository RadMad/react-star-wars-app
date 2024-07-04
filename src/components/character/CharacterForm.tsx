import React from 'react';
import { Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Character } from '../../types/types';
import { db } from '../../db';
import FormField from '../common/form/FormField';

interface CharacterFormProps {
  character: Character;
  characterId: number;
}

const CharacterForm: React.FC<CharacterFormProps> = ({ character, characterId }) => {
  const { handleSubmit, control, reset } = useForm<Character>({
    defaultValues: character,
  });

  const onSubmit: SubmitHandler<Character> = async (data) => {
    await db.characters.put({ ...data, id: characterId });
  };

  React.useEffect(() => {
    reset(character);
  }, [character, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField<Character> name="name" label="Name" control={control} />
      <FormField<Character> name="height" label="Height" control={control} />
      <FormField<Character> name="mass" label="Mass" control={control} />
      <FormField<Character> name="hair_color" label="Hair Color" control={control} />
      <FormField<Character> name="skin_color" label="Skin Color" control={control} />
      <FormField<Character> name="eye_color" label="Eye Color" control={control} />
      <FormField<Character> name="birth_year" label="Birth Year" control={control} />
      <FormField<Character> name="gender" label="Gender" control={control} />
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
};

export default CharacterForm;

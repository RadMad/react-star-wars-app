import React from "react";
import { Button, Stack, Box } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Character } from "../../types/types";
import { db } from "../../db";
import StringFormField from "../common/form/StringFormField";
import NumberFormField from "../common/form/NumberFormField";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface CharacterFormProps {
  character: Character;
  characterId: number;
}

const CharacterForm: React.FC<CharacterFormProps> = ({
  character,
  characterId,
}) => {
  const { handleSubmit, control, reset, formState } = useForm<Character>({
    defaultValues: character,
  });

  const { isDirty } = formState;

  const onSubmit: SubmitHandler<Character> = async (data) => {
    await db.characters.put({ ...data, id: characterId });
    reset(data);
  };

  React.useEffect(() => {
    reset(character);
  }, [character, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StringFormField<Character> name="name" label="Name" control={control} />
      <NumberFormField<Character> name="height" label="Height" control={control} />
      <NumberFormField<Character> name="mass" label="Mass" control={control} />
      <StringFormField<Character> name="hair_color" label="Hair Color" control={control} />
      <StringFormField<Character> name="skin_color" label="Skin Color" control={control} />
      <StringFormField<Character> name="eye_color" label="Eye Color" control={control} />
      <StringFormField<Character> name="birth_year" label="Birth Year" control={control} />
      <StringFormField<Character> name="gender" label="Gender" control={control} />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" href="/" startIcon={<ArrowBackIcon />}>
            Back to List
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </form>
  );
};

export default CharacterForm;

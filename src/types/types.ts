export interface Character {
  id: number;
  url: string;
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
}

export interface CharacterResponse {
  results: Character[];
  count: number;
}


  
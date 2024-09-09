export type Character = {
  id: string;
  name: string;
  height: string;
  hair_color: string;
  eye_color: string;
  url: string;
  species: string[];
  homeworld: string;
};

export type CharacterDetails = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string[];
};

export type CharacterData =  {
  person: CharacterDetails;
};

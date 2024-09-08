export type Character = {
  id: string;
  name: string;
  height: string;
  hair_color: string;
  eye_color: string;
  url: string;
};

export type CharacterCardProps = {
  character: Character;
};

export type PeopleData = {
  people: {
    results: Character[];
    count: number | undefined;
  };
};

export type PeopleVariables = {
  page: number;
  search: string;
};

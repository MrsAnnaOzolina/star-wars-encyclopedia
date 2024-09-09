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

export type CharacterCardProps = {
  character: Character;
  className: string;
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


export type Data = {
  name: string;
  people: string[];
}

export type SpeciesData = {
  species: Data;
}


export type PlanetData = {
  planet: Data;
}

export type Film  ={
  title: string;
  characters: string[];
}

export type FilmsResponse = {
  allFilms: {
    results: Film[];
  };
}


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
}
export type CharacterData =  {
  person: CharacterDetails;
}

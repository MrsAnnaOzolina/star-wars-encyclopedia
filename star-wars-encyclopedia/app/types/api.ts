import { Character } from "./character";

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
};

export type SpeciesData = {
  species: Data;
};

export type Planet = {
    name: string;
    people: string[];
    diameter: string;
    climate: string;
  };

export type PlanetData = {
  planet: Planet;
};

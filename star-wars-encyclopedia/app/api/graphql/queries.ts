import { gql } from "@apollo/client";

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    person(id: $id) @rest(type: "Person", path: "people/{args.id}/") {
      name
      height
      mass
      hair_color
      skin_color
      eye_color
      birth_year
      gender
      homeworld
      films
      species
      vehicles
      starships
      created
      edited
      url
    }
  }
`;

export const GET_PEOPLE = gql`
  query GetPeople($page: Int!, $search: String) {
    people(page: $page, search: $search)
      @rest(
        type: "PeopleResponse"
        path: "people/?page={args.page}&search={args.search}"
      ) {
      count
      next
      previous
      results @type(name: "Person") {
        name
        id
        height
        mass
        hair_color
        skin_color
        eye_color
        birth_year
        gender
        homeworld
        films
        species
        vehicles
        starships
        created
        edited
        url
      }
    }
  }
`;

export const GET_ALL_FILMS = gql`
  query GetFilmsTitleCharacters($characterId: Int!) {
    allFilms @rest(type: "FilmsResponse", path: "films/") {
      results @type(name: "Film") {
        title
        characters
      }
    }
  }
`;

export const GET_SPECIES_BY_ID = gql`
  query GetSpeciesById($id: ID!) {
    species(id: $id) @rest(type: "Species", path: "species/{args.id}/") {
      name
    }
  }
`;

export const GET_PLANET_BY_ID = gql`
  query GetPlanetById($id: ID!) {
    planet(id: $id) @rest(type: "Planet", path: "planets/{args.id}/") {
      name
      diameter
      climate
    }
  }
`;
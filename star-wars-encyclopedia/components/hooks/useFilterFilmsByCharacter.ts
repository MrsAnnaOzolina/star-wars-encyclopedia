import { FilmsResponse } from "@/app/types/types";

export const filterFilmsByCharacter = (filmsData: FilmsResponse | undefined, characterId: string): string[] => {
  if (!filmsData?.allFilms?.results) {
    return [];
  }

  const characterPath = `people/${characterId}/`;
  
  return filmsData.allFilms.results
    .filter(film => film.characters.some(character => character.includes(characterPath)))
    .map(film => film.title);
};

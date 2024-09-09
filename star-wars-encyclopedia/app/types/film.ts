export type Film = {
  title: string;
  characters: string[];
};

export type FilmsResponse = {
  allFilms: {
    results: Film[];
  };
};

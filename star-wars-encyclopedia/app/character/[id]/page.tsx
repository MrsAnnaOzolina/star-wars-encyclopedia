"use client";

import { useQuery } from "@apollo/client";
import { GET_ALL_FILMS, GET_CHARACTER, GET_PLANET_BY_ID, GET_SPECIES_BY_ID } from "../../graphql/queries";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { filterFilmsByCharacter } from "@/components/hooks/useFilterFilmsByCharacter";
import { FilmsResponse, SpeciesData, CharacterData, PlanetData } from "@/app/types/types";
import { useEffect } from "react";

export default function CharacterPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const searchParams = useSearchParams();
  const species = searchParams.get('species');
  const homeworld = searchParams.get('homeworld');

  const { loading, error, data } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id },
  });

  const { loading: isFilmsLoading, error: isFilmsError, data: filmsData } = useQuery<FilmsResponse>(GET_ALL_FILMS);

  const { loading: isSpeciesLoading, error: isError, data: onSpecie } = useQuery<SpeciesData>(GET_SPECIES_BY_ID, {
    variables: {
      id: species,
    },
  });

  const { loading: isPlanetLoading, error: isError1, data: planetData } = useQuery<PlanetData>(GET_PLANET_BY_ID, {
    variables: {
      id: homeworld,
    },
  });

  useEffect(() => {
    if (!loading && !data?.person) {
      router.push('/');
    }
  }, [loading, data, router]);

  if (loading || isFilmsLoading || isSpeciesLoading || isPlanetLoading) {
    return <p>Loading...</p>;
  }

  if (error) return <p>Error: {error.message}</p>;

  const character = data?.person;

  if (!character) return null;

  const planet = planetData?.planet.name;
  const speciesName = onSpecie?.species?.name ?? undefined;
  const filteredFilms = filterFilmsByCharacter(filmsData, id as string);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="border border-white rounded-2xl p-8 max-w-md w-full flex flex-col gap-2">
        <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
        <p>
          <b className="underline underline-2 text-yellow">Height:</b> {character.height} cm
        </p>
        <p>
          <b className="underline underline-2 text-yellow">Hair color:</b> {character.hair_color}
        </p>
        <p>
          <b className="underline underline-2 text-yellow">Mass:</b> {character.mass} kg
        </p>
        <p>
          <b className="underline underline-2 text-yellow">Birth year:</b> {character.birth_year}
        </p>
        {filteredFilms.length > 0 && <p>
        <b className="underline underline-2 text-yellow">Films:</b> {filteredFilms.join(', ')}
        </p>}
        {speciesName !== undefined && <p>
        <b className="underline underline-2 text-yellow">Species:</b> {speciesName}
        </p>}
        {planet !== undefined && <p>
        <b className="underline underline-2 text-yellow">Planet:</b> {planet}
        </p>}
      </div>
    </div>
  );
}
"use client";

import { useQuery } from "@apollo/client";
import {
  GET_ALL_FILMS,
  GET_CHARACTER,
  GET_PLANET_BY_ID,
  GET_SPECIES_BY_ID,
} from "../../graphql/queries";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { filterFilmsByCharacter } from "@/components/hooks/useFilterFilmsByCharacter";
import {
  FilmsResponse,
  SpeciesData,
  CharacterData,
  PlanetData,
} from "@/app/types/types";
import { useEffect } from "react";
import Image from "next/legacy/image";
import { DetailedCharacterProfile } from "@/components/molecules/DetailedCharacterProfile";
import { ErrorFallback } from "@/components/molecules/ErrorFallback";

export default function CharacterPage() {
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const species = searchParams.get("species");
  const homeworld = searchParams.get("homeworld");

  const { loading, error, data } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id },
  });
  const {
    loading: isFilmsLoading,
    error: isFilmsError,
    data: filmsData,
  } = useQuery<FilmsResponse>(GET_ALL_FILMS);
  const {
    loading: isSpeciesLoading,
    error: isError,
    data: onSpecie,
  } = useQuery<SpeciesData>(GET_SPECIES_BY_ID, {
    variables: {
      id: species,
    },
  });
  const {
    loading: isPlanetLoading,
    error: isError1,
    data: planetData,
  } = useQuery<PlanetData>(GET_PLANET_BY_ID, {
    variables: {
      id: homeworld,
    },
  });

  useEffect(() => {
    if (!loading && !data?.person) {
      router.push("/");
    }
  }, [loading, data, router]);

  const handleBack = () => {
    router.back();
  };

  if (loading || isFilmsLoading || isSpeciesLoading || isPlanetLoading) {
    return <p>Loading...</p>;
  }

  if (error) return <ErrorFallback />;

  const character = data?.person;

  if (!character) return null;

  const planet = planetData?.planet.name;
  const speciesName = onSpecie?.species?.name ?? undefined;
  const filteredFilms = filterFilmsByCharacter(filmsData, id as string);

  return (
    <div className="max-w-[448px]">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full shadow-md mb-5"
        onClick={handleBack}
      >
        <Image src={"/svg/arrow.svg"} alt={"arrow"} width={100} height={50} />
      </button>
      <DetailedCharacterProfile
        character={character}
        filteredFilms={filteredFilms}
        speciesName={speciesName}
        planet={planet}
      />
    </div>
  );
}

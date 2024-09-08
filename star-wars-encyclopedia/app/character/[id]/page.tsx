"use client";

import { useQuery } from "@apollo/client";
import { GET_CHARACTER } from "../../graphql/queries";
import { useParams } from "next/navigation";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
}
interface CharacterData {
  person: Character;
}

export default function CharacterPage() {
  const params = useParams();
  const { id } = params;

  const { loading, error, data } = useQuery<CharacterData>(GET_CHARACTER, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const character = data?.person;

  if (!character) return <p>Character not found</p>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="border border-white rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
        <p>
          <b>Height:</b> {character.height} cm
        </p>
        <p>
          <b>Hair color:</b> {character.hair_color}
        </p>
        <p>
          <b>Mass:</b> {character.mass} kg
        </p>
        <p>
          <b>Birth year:</b> {character.birth_year}
        </p>
      </div>
    </div>
  );
}

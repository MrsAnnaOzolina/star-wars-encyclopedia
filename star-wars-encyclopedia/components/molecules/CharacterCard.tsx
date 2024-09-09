import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../atoms/Button";
import { CharacterCardProps } from "@/app/types/types";

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  className,
}) => {
  const router = useRouter();

  const characterId = character.url.split("/").filter(Boolean).pop();
  const characterSpecies =
    character.species.length === 1
      ? character.species[0].split("/").filter(Boolean).pop()
      : null;

  const characterHomeworld = character.homeworld
    .split("/")
    .filter(Boolean)
    .pop();

  const renderDescription = () => {
    if (character.hair_color && character.hair_color.toLowerCase() !== "n/a") {
      return ` with ${character.hair_color} hair`;
    }
    return "";
  };

  const handleClick = () => {
    let url = `/character/${characterId}`;
    const params = new URLSearchParams();

    if (characterSpecies !== null && characterSpecies !== undefined) {
      params.append("species", characterSpecies);
    }

    if (characterHomeworld !== null && characterHomeworld !== undefined) {
      params.append("homeworld", characterHomeworld);
    }

    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }

    router.push(url);
  };

  return (
    <div className="relative bg-black p-4 rounded-lg w-full max-w-[305px] h-auto min-h-[300px] sm:min-h-[330px] mx-auto">
      <div
        className={`absolute inset-0 border-8 rounded-lg z-0 ${className}`}
        style={{ filter: "blur(4px)" }}
      ></div>
      <div className="relative z-10 p-2 sm:p-6 flex flex-col justify-between h-full">
        <div className="text-center mb-4">
          <div className="text-sm text-gray-300 mb-2">
            Character {characterId}
          </div>
          <div className="text-2xl font-bold text-white">{character.name}</div>
          <div className="text-base text-gray-300 mb-2">
            <span className="capitalize">{character.eye_color}</span> eyes
            {renderDescription()}
          </div>
          <div className="mb-4 mt-4 sm:mt-6">
            <div className="text-sm text-gray-300 text-center">
              Height: {character.height}
            </div>
            <div className="border-b border-gray-400 mx-auto w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            title="Explore more"
            onClick={handleClick}
            className="text-white/90 text-sm sm:text-base  max-[340px]:w-full"
          />
        </div>
      </div>
    </div>
  );
};

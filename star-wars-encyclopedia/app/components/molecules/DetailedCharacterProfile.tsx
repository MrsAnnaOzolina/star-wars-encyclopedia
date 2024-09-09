import React from "react";
import { CharacterDetails } from "@/types/types";

interface Props {
  character: CharacterDetails;
  filteredFilms: string[];
  speciesName: string | undefined;
  planet: string | undefined;
}

export const DetailedCharacterProfile: React.FC<Props> = ({
  character,
  filteredFilms,
  speciesName,
  planet,
}) => {
  return (
      <div className="relative bg-black p-4 rounded-lg w-full max-w-md] h-auto min-h-[300px] sm:min-h-[330px] mx-auto">
        <div
          className="absolute inset-0 border-8 border-yellow-400 rounded-lg z-0"
          style={{ filter: "blur(4px)" }}
        ></div>
        <div className="relative z-10 p-2 sm:p-6 flex flex-col justify-between h-full">
          <div className="text-2xl font-bold text-white mb-4">
            {character.name}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-s text-gray-300">
              <span className="text-yellow-400">Height:</span>{" "}
              {character.height} cm
            </p>
            <p className="text-s text-gray-300">
              <span className="text-yellow">Eyes:</span> {character.eye_color}
            </p>
            <p className="text-s text-gray-300">
              <span className="text-yellow">Mass:</span> {character.mass} kg
            </p>
            <p className="text-s text-gray-300">
              <span className="text-yellow">Birth year:</span>{" "}
              {character.birth_year}
            </p>
            {filteredFilms && (
              <p className="text-s text-gray-300">
                <span className="text-yellow">Films:</span>{" "}
                {filteredFilms.join(", ")}
              </p>
            )}
            {speciesName && (
              <p className="text-s text-gray-300">
                <span className="text-yellow">Species:</span> {speciesName}
              </p>
            )}
            {planet && (
              <p className="text-s text-gray-300">
                <span className="text-yellow">Planet:</span> {planet}
              </p>
            )}
          </div>
        </div>
      </div>
  );
};

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../atoms/Button";
import { CharacterCardProps } from "@/app/types/types";

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const router = useRouter();

  const characterId = character.url.split("/").filter(Boolean).pop();

  const renderDescription = () => {
    if (character.hair_color && character.hair_color.toLowerCase() !== "n/a") {
      return ` with ${character.hair_color} hair`;
    }
    return "";
  };

  return (
    <div className="relative bg-black p-4 rounded-lg h-[330px] w-[305px]">
      <div
        className="absolute inset-0 border-8 border-red-600 rounded-lg z-0"
        style={{ filter: "blur(4px)" }}
      ></div>
      <div className="relative z-10 p-6 flex flex-col justify-between h-full">
        <div className="text-center mb-4">
          <div className="text-sm text-gray-300">Character {characterId}</div>
          <div className="text-2xl font-bold text-white">{character.name}</div>
          <div className="text-lg text-gray-300 mb-2">
            <span className="capitalize">{character.eye_color}</span> eyes
            {renderDescription()}
          </div>
          <div className="mb-4 mt-6">
            <div className="text-sm text-gray-300 text-center">
              Height: {character.height}
            </div>
            <div className="border-b border-gray-400 mx-auto w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            title={"Explore more"}
            onClick={() => router.push(`/character/${characterId}`)}
          />
        </div>
      </div>
    </div>
  );
};

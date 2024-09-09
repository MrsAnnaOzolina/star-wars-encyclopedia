import React from "react";
import { Button } from "../atoms/Button";

export const ErrorFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 mb-4">
        We&apos;re having trouble loading the character information.
      </p>
      <Button
        title="Try Again"
        onClick={() => window.location.reload()}
        className="w-[165px] text-white/90 text-sm sm:text-base  max-[340px]:w-full"
      />
    </div>
  );
};

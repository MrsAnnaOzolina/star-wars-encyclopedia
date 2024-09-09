import React from "react";
import Image from "next/legacy/image";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center space-x-4 mt-8">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full shadow-md"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src={"/svg/arrow.svg"} alt={"arrow"} width={100} height={50} />
      </button>
      <div className="relative w-20 h-20 text-yellow">
        <div className="absolute top-0 left-0 text-4xl ">{currentPage}</div>
        <div className="absolute bottom-0 right-0 text-4xl">{totalPages}</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full border-t border-yellow transform -rotate-45"></div>
        </div>
      </div>
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full shadow-md"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image
          src={"/svg/arrow.svg"}
          alt={"arrow"}
          width={100}
          height={50}
          className="transform rotate-180"
        />
      </button>
    </div>
  );
};

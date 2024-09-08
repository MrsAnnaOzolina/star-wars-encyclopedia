"use client";

import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "./graphql/queries";
import { useEffect, useMemo, useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { SortButton } from "@/components/SortButton";
import { PaginationControl } from "@/components/PaginationControl";
import { PeopleData, PeopleVariables } from "./types/types";
import { CharacterCard } from "@/components/CharacterCard";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearchTerm, setInputSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const { loading, error, data, refetch } = useQuery<
    PeopleData,
    PeopleVariables
  >(GET_PEOPLE, {
    variables: {
      page: currentPage,
      search: activeSearchTerm,
    },
  });

  const sortedCharacters = useMemo(() => {
    const originalCharacters = data?.people.results ?? [];
    if (sortOrder === null) {
      return originalCharacters;
    }
    return [...originalCharacters].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
  }, [data?.people.results, sortOrder]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCurrentPage(1);
    setActiveSearchTerm(inputSearchTerm);
    refetch({ page: 1, search: inputSearchTerm });
  };
  const handleClearSearch = () => {
    setInputSearchTerm("");
    setActiveSearchTerm("");
    setCurrentPage(1);
    setSortOrder(null);
    refetch({ page: 1, search: "" });
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => {
      if (prevOrder === null) return "asc";
      if (prevOrder === "asc") return "desc";
      return null;
    });
  };

  if (error) return <p>Error: {error.message}</p>;
  useEffect(() => {
    if (data?.people?.count) {
      setTotalPages(Math.ceil(data.people.count / 10));
    }
  }, [data?.people?.count]);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSortOrder(null);
      refetch({ page: newPage, search: activeSearchTerm });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-[20px] ">
      <div className="max-w-[630px]">
        <div className="flex justify-between mb-8">
          <SearchForm
            inputSearchTerm={inputSearchTerm}
            setInputSearchTerm={setInputSearchTerm}
            handleSearch={handleSearch}
            handleClearSearch={handleClearSearch}
          />
          <SortButton
            sortOrder={sortOrder}
            handleSort={handleSort}
            disabled={sortedCharacters.length <= 1}
          />
        </div>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : data?.people.results.length === 0 ? (
          <p className="text-white">
            No characters found matching "{activeSearchTerm}".
          </p>
        ) : (
          <div className="flex gap-[20px] flex-wrap justify-center">
            {sortedCharacters.map((character) => (
              <CharacterCard key={character.url} character={character} />
            ))}
          </div>
        )}
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}

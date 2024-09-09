"use client";

import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "./api/graphql/queries";
import { useEffect, useMemo, useState } from "react";
import { SearchForm } from "@/app/components/molecules/SearchForm";
import { PaginationControl } from "@/app/components/molecules/PaginationControl";
import { CharacterCard } from "@/app/components/molecules/CharacterCard";
import { Button } from "@/app/components/atoms/Button";
import { ErrorFallback } from "@/app/components/molecules/ErrorFallback";
import { PeopleData, PeopleVariables } from "@/types";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState({ input: "", active: "" });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const { loading, error, data, refetch } = useQuery<
    PeopleData,
    PeopleVariables
  >(GET_PEOPLE, {
    variables: {
      page: currentPage,
      search: searchTerm.active,
    },
  });

  useEffect(() => {
    if (data?.people?.count) {
      setTotalPages(Math.ceil(data.people.count / 10));
    }
  }, [data?.people?.count]);

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
    setSearchTerm((prev) => ({ ...prev, active: prev.input }));

    refetch({ page: 1, search: searchTerm.input });
  };

  const handleClearSearch = () => {
    setSearchTerm({ input: "", active: "" });
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setSortOrder(null);
      refetch({ page: newPage, search: searchTerm.active });
    }
  };

  if (error) return <ErrorFallback />;

  return (
    <div className="max-[709px]:flex max-[709px]:flex-col max-[709px]:items-center">
      <div className="w-[630px] flex justify-between mb-5 max-[709px]:flex-col max-[709px]:max-w-[305px] max-[709px]:gap-3">
        <SearchForm
          inputSearchTerm={searchTerm.input}
          setInputSearchTerm={(value) =>
            setSearchTerm((prev) => ({ ...prev, input: value }))
          }
          handleSearch={handleSearch}
          handleClearSearch={handleClearSearch}
        />
        <Button
          onClick={handleSort}
          disabled={sortedCharacters.length <= 1}
          sortOrder={sortOrder}
          isSortButton={true}
          className="w-[200px] text-yellow/70 max-[709px]:w-full"
        />
      </div>
      {loading ? (
        <p className="text-white min-h-screen">Loading...</p>
      ) : data?.people.results.length === 0 ? (
        <p className="text-white min-h-[calc(100vh-342px)]">
          No characters found matching &quot;{searchTerm.active}&quot;.
        </p>
      ) : (
        <div className="sm:min-h-screen">
          <div className="flex gap-5 flex-wrap justify-center">
            {sortedCharacters.map((character, index) => (
              <CharacterCard
                key={character.url}
                character={character}
                className={
                  index % 2 === 1 ? "border-red-600" : "border-blue-400"
                }
              />
            ))}
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <PaginationControl
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

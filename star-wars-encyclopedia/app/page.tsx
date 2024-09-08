"use client";

import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "./graphql/queries";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { SortButton } from "@/components/SortButton";
import { PaginationControl } from "@/components/PaginationControl";
import { PeopleData, PeopleVariables } from "./types/types";

export default function Home() {
  const router = useRouter();
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-[20px]">
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
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : data?.people.results.length === 0 ? (
        <p className="text-white">
          No characters found matching "{activeSearchTerm}".
        </p>
      ) : (
        sortedCharacters.map((character) => {
          const b = character.url.split("/").filter(Boolean).pop();
          return (
            <div key={b} className="border border-white rounded-2xl p-8">
              <h1>
                Name: {character.name} {b}
              </h1>
              <p>
                <b>Height: </b>
                {character.height}
              </p>
              <p>
                <b>Hair color: </b>
                {character.hair_color}
              </p>
              <p>
                <b>Eye color: </b>
                {character.eye_color}
              </p>
              <button
                onClick={() => {
                  router.push(`/character/${b}`);
                }}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
              >
                Find out more{" "}
              </button>
            </div>
          );
        })
      )}
      <PaginationControl
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

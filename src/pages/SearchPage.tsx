import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";
import type { RootState, AppDispatch } from "../redux/store";
import { fetchAnimeList } from "../redux/animeSlice";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error, pagination } = useSelector(
    (s: RootState) => s.anime
  );
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const timerRef = useRef<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const itemsPerPage = 8;

  // fetch default list
  useEffect(() => {
    dispatch(fetchAnimeList({ query: "", page: 1 }));
  }, [dispatch]);

  // fetch saat query/page berubah dengan debounce & cancel
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      if (controllerRef.current) controllerRef.current.abort();
      controllerRef.current = new AbortController();

      dispatch(
        fetchAnimeList({
          query,
          page,
          signal: controllerRef.current.signal,
        })
      );
    }, 400);

    return () => {
      if (controllerRef.current) controllerRef.current.abort();
    };
  }, [query, page, dispatch]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedList = list?.slice(startIndex, endIndex) || [];

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Anime Search</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Ketik judul anime..."
        className="mb-6"
      />

      {/* Flexbox Grid */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Skeleton loader */}
        {loading &&
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse h-48 w-48 rounded-lg"
            />
          ))}

        {/* Anime list */}
        {!loading &&
          paginatedList.map((anime: any) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}

        {/* Empty state */}
        {!loading && paginatedList.length === 0 && (
          <p className="w-full text-center mt-4 text-gray-500">
            {query
              ? `Tidak ada hasil untuk "${query}"`
              : "Belum ada anime untuk ditampilkan."}
          </p>
        )}
      </div>

      {/* Pagination */}
      {!loading && list?.length > 0 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span>Page {page}</span>
          <button
            disabled={endIndex >= list.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <p className="mt-4 text-center text-red-500">{error}</p>
      )}
    </div>
  );
};

export default SearchPage;
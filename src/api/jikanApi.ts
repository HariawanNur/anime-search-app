export const searchAnime = async (query: string, page: number = 1) => {
  const url = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  return await res.json();
};

export const getAnimeDetail = async (id: string) => {
  const url = `https://api.jikan.moe/v4/anime/${id}`;
  const res = await fetch(url);
  return await res.json();
};

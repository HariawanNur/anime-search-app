import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimeDetail, resetDetail } from "../redux/animeSlice";
import type { RootState, AppDispatch } from "../redux/store";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { detail, loading, error } = useSelector((s: RootState) => s.anime);

  useEffect(() => {
    if (id) {
      dispatch(resetDetail()); // reset detail lama
      dispatch(fetchAnimeDetail(id));
    }
  }, [id, dispatch]);

  if (loading) return <p className="text-center mt-4 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!detail) return <p className="text-center mt-4">Anime tidak ditemukan</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{detail.title}</h2>
      <img
        src={detail.images.jpg.image_url}
        alt={detail.title}
        className="rounded shadow mb-4 w-full object-cover"
      />
      <p>{detail.synopsis}</p>
    </div>
  );
};

export default DetailPage;

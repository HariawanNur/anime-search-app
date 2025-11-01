import React from "react";
import { Link } from "react-router-dom";

interface AnimeCardProps {
  anime: any;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => (
  <div className="bg-[#2c2c3e] border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-200">
    {/* Hanya gambar & judul yang clickable */}
    <Link
      to={`/anime/${anime.mal_id}`}
      className="block w-full h-56 overflow-hidden"
    >
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-full object-cover"
      />
    </Link>

    <div className="p-2 h-16 flex items-center justify-center text-center">
      <Link to={`/anime/${anime.mal_id}`} className="block w-full">
        <h3 className="text-sm font-semibold truncate">{anime.title}</h3>
      </Link>
    </div>
  </div>
);

export default AnimeCard;

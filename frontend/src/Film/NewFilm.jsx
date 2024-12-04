import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard';
import { Box } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import Skeleton from '@mui/material/Skeleton';

export default function NewFilm() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true); 
  const fetchFilm = async () => {
    try {
      const response = await fetch('https://animetangobackend.onrender.com/api/anime/lastestepisode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const dataa = await response.json();
        setData(dataa);
        setVisibleMovies(dataa.slice(0, itemsPerPage));
        setLoading(false); 
      } else {
        console.error('Lỗi khi lấy dữ liệu:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  const handleNext = () => {
    setVisibleMovies((prev) => {
      const nextIndex = (data.indexOf(prev[prev.length - 1]) + 1) % data.length;
      return [...prev.slice(1), data[nextIndex]];
    });
  };

  const handlePrev = () => {
    setVisibleMovies((prev) => {
      const prevIndex = (data.indexOf(prev[0]) - 1 + data.length) % data.length;
      return [data[prevIndex], ...prev.slice(0, itemsPerPage - 1)];
    });
  };

  return (
    <Box>
      <div style={{ fontSize: '25px', fontFamily: 'monospace', marginLeft: '5%', marginTop: '15px', marginBottom: '15px' }}>
        UPDATE LATEST MOVIE
      </div>
      <Box sx={{ display: 'flex',marginLeft: '2.5%', width: '95%', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        <ExpandCircleDownIcon sx={{ cursor: 'pointer', fontSize: '50px', rotate: '90deg',display: { xs: 'none', lg: 'block'}}} onClick={handlePrev} />
        {
  loading
    ? Array.from(new Array(itemsPerPage)).map((_, index) => (
      <Box sx={{ display: 'block' }} key={`skeleton-${index}`}>
        <Skeleton 
          variant="rectangular" 
          width={180} 
          height={255} 
          sx={{ borderRadius: '8px', margin: '10px' }} 
        />
        <Skeleton 
          variant="rectangular" 
          width={180} 
          height={30} 
          sx={{ borderRadius: '8px', margin: '10px' }} 
        />
      </Box>
    ))
    : visibleMovies.map((item) => (
      <FilmCard
        key={item.Anime_id}
        image={item["Image URL"]}
        name={item.Name}
        level={item.JapaneseLevel}
        view={item.Members}
        score={item.Score}
        index={item.Anime_id}
        className="film-card"
      />
    ))
}

        <ExpandCircleDownIcon sx={{ cursor: 'pointer', fontSize: '50px', rotate: '270deg', display: { xs: 'none', lg: 'block'}}} onClick={handleNext} />
      </Box>
    </Box>
  );
}

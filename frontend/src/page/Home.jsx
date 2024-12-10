import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../component/Header/Header'
import HomePicture from '../component/HomePicture/HomePicture'
import Footer from '../component/Footer/Footer'
import FilmCard from '../Film/FilmCard'
import NewFilm from '../Film/NewFilm'
import Favourite from '../Film/Favourite'
import { Box } from '@mui/material'
import TvFilm from '../Film/TvFilm'
import FilmRecommendDe from '../Film/FilmRecommendDe'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FilmRecommendNa from '../Film/FilmRecommendNa'
export default function Home() {
  const [formData, setFormData] = useState({
    JapaneseLevel: 'N5',
  });
  const [decision, setDecision] = useState(false)
  const [isLogin, setIsLogin ] = useState(false)
  const fetchFilm = async () => {
    try {
      const response = await fetch('https://animetangobackend.onrender.com/api/anime/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

      } else {
        console.error('Lỗi khi đăng nhập:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
    }
  };
  const ClickChange = () => {
    setDecision(!decision)
  }
  useEffect(() => {
    fetch('https://animetangobackend.onrender.com/api/userInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({jwt : localStorage.getItem('jwt')})
    })
      .then(response => response.json())
      .then(responseData => {
        if(responseData.success){
          setIsLogin(true)
        }
        else{
          setIsLogin(false)
        }
        
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFilm();
    };
    fetchData();
  }, []);
 
  return (
    <>
    <Header/>
    <HomePicture/>
     {isLogin && decision && <FilmRecommendDe change={ClickChange}/>} 
     {isLogin && !decision && <FilmRecommendNa change={ClickChange}/>} 
    <NewFilm/>
    <Box sx ={{marginTop: '5%'}}> <TvFilm/></Box>
    <Box sx ={{marginTop: '5%'}}> <Favourite/></Box>

  {/* <Footer></Footer> */}
 

    </>
  )
}

import React from 'react'
import FoodCard from '../food/FoodCard';
import PlaceCard from '../place/PlaceCard';
import MovieCard from '../movie/MovieCard';
import Title from '../layouts/title/Title';
import MusicCard from '../music/MusicCard';
import { postData } from "../../types/types"

async function getAllPostData() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  const allPostData: postData[] = await response.json();

  return allPostData;
}

export const HomeCardList = async () => {
  const allPostData = await getAllPostData();
  
  return (
    <div>
      <Title />
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-4 py-4 gap-4 font-[family-name:var(--font-geist-sans)]">
        {allPostData.map((postData: postData) => {
          if (postData.category === 'food') {
              return <FoodCard postData={postData} />;
          } else if (postData.category === 'music') {
              return <MusicCard key={postData.id} postData={postData} />;
          } else {
              return null; // 他のカテゴリがあればここに処理を追加
          }
        })}
        {/* <HomeCard/>
        <FoodCard />
        <PlaceCard />
        <MovieCard />
        <MusicCard />
        <FoodCard />
        <PlaceCard />
        <MovieCard />
        <MusicCard /> */}
      </div>
    </div>
  )
}
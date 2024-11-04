import React from 'react'
import MovieCard from '../components/music/MusicCard'
import { postData } from "../types/types"

async function getAllPostData() {
    const response = await fetch("http://localhost:3000/api/post", {
      cache: "no-store",
    });
  
    const allPostData: postData[] = await response.json();
  
    return allPostData;
  }

const Movie = async () => {

    const allPostData = await getAllPostData();

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 px-4 py-4 gap-4 font-[family-name:var(--font-geist-sans)]">
        {allPostData.map((postData: postData) => {
          if (postData.category === 'movie') {
              return <MovieCard postData={postData} />;
          } else {
              return null; // 他のカテゴリがあればここに処理を追加
          }
        })}
      </div>
    )
}

export default Movie
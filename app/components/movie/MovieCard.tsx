import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as motion from "framer-motion/client";
import Image from 'next/image';
import { Film, Calendar } from 'lucide-react'

async function getMovieData(title: string) {
    const response = await fetch (`http://localhost:3000/api/movie/${title}`,{
        cache: "no-store",
    })

    const movieData = await response.json();

    return movieData;
}

const MovieCard = async () => {
    const movieData = await getMovieData("Fight Club")
    // console.log(movieData)
    return (
        <div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    >
                    <Link href={"/"}>
                        <Card className="w-full lg:h-80 md:h-60 sm:h-40 xs:h-20 relative overflow-hidden shadow-lg hover:shadow-indigo-500/50">
                            <div className="absolute inset-0">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w200${movieData.poster_path}`} // パブリックディレクトリ内の画像を指定
                                    alt="Description of image" 
                                    fill // カードのサイズにフィットさせる
                                    objectFit="cover" // カード全体をカバーする
                                    className="opacity-50" // 透過度を設定
                                    sizes="100vw"
                                    />
                            </div>
                            <CardHeader>
                                <CardTitle className="flex font-bold">
                                    <Film className="h-4 w-4 mr-2" />
                                    Fight Club
                                </CardTitle>
                                <CardDescription className="flex">
                                    <Calendar className="h-4 w-4" />
                                    {movieData.release_date}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between">
                            </CardFooter>
                        </Card>
                    </Link>
                </motion.div>
            </div>
    )
}

export default MovieCard
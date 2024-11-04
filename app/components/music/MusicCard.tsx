import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as motion from "framer-motion/client";
import Image from 'next/image';
import { Music, MicVocal } from 'lucide-react'

type MusicCardProps = {
    postData: postData;
};

async function getMusicData(title: string) {
    const response = await fetch (`http://localhost:3000/api/music/${title}`,{
        cache: "no-store",
    })

    const musicData = await response.json();

    return musicData;
}

const MovieCard = async ({ musicPostData }: MusicCardProps) => {
    const musicData = await getMusicData("shape of you")
    console.log(musicData)
    return (
        <div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    >
                    <Link href={"/"}>
                        <Card className="w-full lg:h-80 md:h-60 sm:h-40 xs:h-20 relative overflow-hidden shadow-lg hover:shadow-emerald-500/50">
                            <div className="absolute inset-0">
                                <Image
                                    src={musicData.album.images[0].url} // パブリックディレクトリ内の画像を指定
                                    alt="Description of image" 
                                    fill // カードのサイズにフィットさせる
                                    objectFit="cover" // カード全体をカバーする
                                    className="opacity-50" // 透過度を設定
                                    sizes="100vw"
                                    />
                            </div>
                            <CardHeader>
                                <CardTitle className="flex font-bold">
                                    <Music className="h-4 w-4 mr-2" />
                                    Shape of you
                                </CardTitle>
                                <CardDescription className="flex">
                                    <MicVocal className="h-4 w-4" />
                                    {musicData.artists[0].name}
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
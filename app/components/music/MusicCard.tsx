import React from 'react'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as motion from "framer-motion/client";
import Image from 'next/image';
import { Music, MicVocal } from 'lucide-react'
import { postData } from '@/app/types/types';

type MusicCardProps = {
    postData: postData;
};

const MusicCard = async ({ postData }: MusicCardProps) => {
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
                                src={postData.photoUrl}
                                alt="Description of image" 
                                fill // カードのサイズにフィットさせる
                                objectFit="cover" // カード全体をカバーする
                                className="opacity-100" // 透過度を設定
                                sizes="100vw"
                                />
                        </div>
                        <CardHeader className='p-4 relative z-10 bg-white/80'>
                            <CardTitle className="flex font-bold">
                                <Music className="h-4 w-4 mr-2" />
                                {postData.title}
                            </CardTitle>
                            <CardDescription className="flex">
                                <MicVocal className="h-4 w-4" />
                                {postData.information}
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

export default MusicCard
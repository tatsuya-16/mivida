import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as motion from "framer-motion/client";
import Image from 'next/image';
import { MapPin, Utensils } from 'lucide-react'
import { postData } from "@/app/types/types";

// type FoodPost = {
//     id: number
//     restaurantName: string
//     menuName: string
//     location: string
//     content: string
//     image: string
//     author: string
//   }

interface FoodCardProps {
    postData: postData;
};

const FoodCard = ({ postData }: FoodCardProps) => {
    console.log(postData)
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                >
                <Link href={"/"}>
                    <Card className="w-full lg:h-80 md:h-60 sm:h-40 xs:h-20 relative overflow-hidden shadow-lg hover:shadow-orange-400/50">
                        <Image 
                            src={postData.photoUrl} // パブリックディレクトリ内の画像を指定
                            alt="Description of image" 
                            fill // カードのサイズにフィットさせる
                            objectFit="cover" // カード全体をカバーする
                            className="opacity-100" // 透過度を設定
                            sizes="100vw"
                            />
                        <CardHeader className="p-4 relative z-10 bg-white/70">
                            <CardTitle className="flex font-bold">
                                <Utensils className="h-4 w-4 mr-2" />
                                {postData.title}
                            </CardTitle>
                            <CardDescription className="flex text-xs">
                                <MapPin className="h-4 w-4" />
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

export default FoodCard
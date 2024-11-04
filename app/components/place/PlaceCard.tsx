import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as motion from "framer-motion/client";
import Image from 'next/image';
import localImage from "../../../public/images/IMG_0066.jpg"
import { MapPin, MapPinned } from 'lucide-react'

const PlaceCard = () => {
    
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                >
                <Link href={"/"}>
                    <Card className="w-full lg:h-80 md:h-60 sm:h-40 xs:h-20 relative overflow-hidden shadow-lg hover:shadow-cyan-500/50">
                        <div className="absolute inset-0">
                            <Image 
                                src={localImage} // パブリックディレクトリ内の画像を指定
                                alt="Description of image" 
                                fill // カードのサイズにフィットさせる
                                objectFit="cover" // カード全体をカバーする
                                className="opacity-20" // 透過度を設定
                                sizes="100vw"
                                />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex font-bold">
                                <MapPinned className="h-4 w-4 mr-2" />
                                門司港
                                </CardTitle>
                            <CardDescription className="flex">
                                <MapPin className="h-4 w-4" />
                                愛知県名古屋市天白区塩釜口2-801
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

export default PlaceCard
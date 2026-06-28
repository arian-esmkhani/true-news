'use client'

import { useEffect, useMemo, useState } from "react"
import { DataDto } from "../types/data-type"
import { useSlider } from "../hooks/use-slider"
import { InfiniteSlider } from "../ui/carousel"
import { useRouter } from "next/navigation"

export function NewestCarousel() {
    const [newest, setNewest] = useState<DataDto[]>([])
    const { newestSlider } = useSlider()
    const router = useRouter();

    useEffect(() => {
        const fetchNewest = async () => {
            const data = await newestSlider();
            if (data && data.length > 0) {
                setNewest(data);
            }
        };

        fetchNewest();
    }, [newestSlider])

    const items = useMemo(() => {
        return newest.map((item) => ({
            imgSrc: item.imgUrl ||'/Survival.jpg' ,
            imgAlt: item.title,
            title: item.title,
            variant: "elevated" as const,
            tone: "secondary" as const,
            size: "lg" as const,
            onClick: () => router.push(`/components/${item.id.toString()}/article`)
        }));
    }, [newest, router])

    return(
        <div className="mt-5 sm:mt-15 mx-1 
        sm:bg-linear-to-r sm:from-indigo-700/30 sm:to-pink-800/10 
        bg-linear-to-r from-indigo-700/6 to-pink-800/2 
        h-68 sm:h-89 rounded-2xl pt-4">
            <span className="ml-36 sm:ml-9 text-lg sm:text-xl opacity-65">Newest Articles</span>
            <InfiniteSlider items={items} autoplay={true} align={"center"} className="mt-3 sm:mt-7"/>
        </div>
    )
}
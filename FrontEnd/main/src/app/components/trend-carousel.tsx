'use client'

import { useEffect, useMemo, useState } from "react"
import { DataDto } from "../types/data-type"
import { useSlider } from "../hooks/use-slider"
import { InfiniteSlider } from "../ui/carousel"
import { useRouter } from "next/navigation"

export function TrendCarousel() {
    const [data, setData] = useState<DataDto[]>([])
    const { trendSlider } = useSlider()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await trendSlider();
            if (data && data.length > 0) {
                setData(data);
            }
        };

        fetchData();
    }, [trendSlider])

    const items = useMemo(() => {
        return data.map((item) => ({
            imgSrc: item.imgUrl ||'/Survival.jpg' ,
            imgAlt: item.title,
            imageChildren: item.title,
            variant: "elevated" as const,
            tone: "primary" as const,
            size: "xl" as const,
            onClick: () => router.push(`/components/${item.id.toString()}/article`)
        }));
    }, [data, router])

    return(
        <div className="mt-5 sm:mt-15 mx-2
        sm:bg-linear-to-r sm:from-indigo-700/30 sm:to-pink-800/10 
        bg-linear-to-r from-indigo-700/6 to-pink-800/2 
        h-68 sm:h-109 rounded-2xl pt-4">
            <InfiniteSlider
            items={items} 
            align={"center"} 
            showNavigation={false} 
            autoplay={true}
            loop={true}/>
        </div>
    )
}
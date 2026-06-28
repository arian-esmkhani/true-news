'use client'

import { useEffect, useMemo, useState } from "react"
import { DataDto } from "../types/data-type"
import { useSlider } from "../hooks/use-slider"
import { InfiniteSlider } from "../ui/carousel"
import { useRouter } from "next/navigation"

export function NoteCarousel() {
    const [data, setData] = useState<DataDto[]>([])
    const { noteSlider } = useSlider()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await noteSlider();
            if (data && data.length > 0) {
                setData(data);
            }
        };

        fetchData();
    }, [noteSlider])

    const items = useMemo(() => {
        return data.map((item) => ({
            imgSrc: item.imgUrl ||'/Survival.jpg' ,
            imgAlt: item.title,
            title: item.title,
            variant: "elevated" as const,
            tone: "secondary" as const,
            size: "sm" as const,
            onClick: () => router.push(`/components/${item.id.toString()}/article`)
        }));
    }, [data, router])

    return(
        <div className="mt-5 sm:mt-11
        sm:bg-linear-to-r sm:from-indigo-700/30 sm:to-pink-800/10 
        bg-linear-to-r from-indigo-700/6 to-pink-800/2 
        h-48 sm:h-81 rounded-2xl pt-4">
            <span className="ml-36 sm:ml-9 text-lg sm:text-xl opacity-65">Nots</span>
            <InfiniteSlider items={items} align={"center"} className="mt-3 sm:mt-7"/>
        </div>
    )
}
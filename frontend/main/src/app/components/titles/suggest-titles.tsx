'use client'

import { useTitle } from "@/app/hooks/use-title";
import { TitleDto } from "@/app/types/data-type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SuggestTitles() {
    const [data, setData] = useState<TitleDto[]>([])
    const { suggestTitles } = useTitle()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await suggestTitles();
            if (data && data.length > 0) {
                setData(data);
            }
        };

        fetchData();
    }, [suggestTitles])

    return(
        <div className="mt-3 sm:mt-11 grid grid-cols-2 pl-5
        sm:bg-linear-to-r sm:from-indigo-700/30 sm:to-pink-800/10 
        bg-linear-to-r from-indigo-700/6 to-pink-800/2 
        h-68 sm:h-119 rounded-2xl pt-6">
            {data.map((topic, index) => (
                <div key={index}>
                    <h2 className="py-2" onClick={() => router.push(`/components/${topic.id}/article`)}>
                        {topic.title}</h2>
                </div>
            ))}

        </div>
    )
}
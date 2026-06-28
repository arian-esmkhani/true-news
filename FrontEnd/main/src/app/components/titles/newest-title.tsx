'use client'

import { useTitle } from "@/app/hooks/use-title";
import { TitleDto } from "@/app/types/data-type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NewestTitles() {
    const [data, setData] = useState<TitleDto[]>([])
    const { newestTitles } = useTitle()
    const router = useRouter();

    useEffect(() => {
        const fetchNewest = async () => {
            const data = await newestTitles();
            if (data && data.length > 0) {
                setData(data);
            }
        };

        fetchNewest();
    }, [newestTitles])

    return(
        <div>
            {data.map((topic, index) => (
                <div key={index}>
                    <h2 className="py-3 md:py-4 text-sm sm:text-md" onClick={() => router.push(`/components/${topic.id}/article`)}>
                        . {topic.title}</h2>
                </div>
            ))}
        </div>
    )
}
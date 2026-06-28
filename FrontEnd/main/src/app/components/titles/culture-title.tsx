'use client'

import { useTitle } from "@/app/hooks/use-title";
import { TitleDto } from "@/app/types/data-type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function CultureTitles() {
    const [data, setData] = useState<TitleDto[]>([])
    const { cultureTitles } = useTitle()
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await cultureTitles();
            if (data && data.length > 0) {
                setData(data);
            }
        };

        fetchData();
    }, [cultureTitles])

    return(
        <div>
            {data.map((topic, index) => (
                <div key={index}>
                    <h2 className="py-4" onClick={() => router.push(`/components/${topic.id}/article`)}>
                        . {topic.title}</h2>
                </div>
            ))}
        </div>
    )
}
'use client'

import { useArticle } from "@/app/hooks/use-article";
import { ArticleDto } from "@/app/types/article-type";
import { TopicDto } from "@/app/types/topic-type";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from 'next/image'

export default function Page() {
    const { getArticle } = useArticle();
    const [article, setArticle] = useState<ArticleDto[]>([]);
    const [topic, setTopic] = useState<TopicDto>();
    const params = useParams<{ id: string }>();
    const topicId = useMemo(() => params.id as unknown as number, [params.id]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getArticle(topicId);
            if(data) {
                setArticle(data.articleDto);
                setTopic(data.topicDto)
            }
        };

        fetchData();
    }, [getArticle, topicId])

    return (
        <div className="mt-1 sm:mt-7 px-[1vw]">
            <div className="bg-neutral-300/20 dark:bg-gray-900/80 mx-[3vw] p-2 rounded-2xl shadow-2xl">
                <div className="flex justify-center">
                    <Image
                        src={topic?.imgUrl || "/Copilot_20251202_111631.WebP"}
                        alt={topic?.title || ""}
                        width={530}
                        height={500}
                    />
                </div>
                <p className="opacity-80">
                    <span className="text-sm">{topic?.firstCategory}</span>
                    {topic?.secondCategory && (
                        <span>
                            <span> | </span>
                            <span className="text-sm">{topic?.secondCategory}</span>    
                        </span>                    
                    )}
                </p>
                <h1 className="mt-3 text-xl sm:text-2xl text-shadow-md/40">{topic?.title}</h1>
                <pre className="mt-2 whitespace-pre-wrap">{topic?.description}</pre>
            </div>
            <div className="mt-12 bg-neutral-200/10 dark:bg-gray-900/40 p-2 rounded-xl">
                {article.map((article, index) => (
                    <div key={index}>
                        {article.imgUrl && (
                            <div className="flex justify-center
                                bg-linear-to-b from-5% to-indigo-700/40 
                                dark:to-indigo-950/70 p-1">
                                <Image
                                    src={article?.imgUrl}
                                    alt={article?.head}
                                    width={380}
                                    height={500}
                                />
                            </div>
                        )}
                        <div>
                            <h2 className="text-md sm:text-lg mt-8 ">{article.head}</h2>
                            <pre className="mt-4 whitespace-pre-wrap mb-12">{article.body}</pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
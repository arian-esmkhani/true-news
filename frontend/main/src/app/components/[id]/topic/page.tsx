'use client'

import { useTopic } from "@/app/hooks/use-topic";
import { DataDto } from "@/app/types/data-type";
import { Cart } from "@/app/ui/cart";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef, useMemo } from "react";

export default function Page() {
    const { getByTopic, loading: hookLoading } = useTopic();
    const params = useParams<{ id: string }>();
    const topicPar = useMemo(() => params.id as string, [params.id]);
    const [topic, setTopic] = useState<DataDto[]>([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const isLoadingRef = useRef(false);
    const currentNameRef = useRef<string | null>(null);
    const router = useRouter();

    const fetchTopics = useCallback(async (name: string, pageNum: number) => {
        if (!name || isLoadingRef.current) return null;
        
        isLoadingRef.current = true;
        setIsLoading(true);
        
        try {
            const data = await getByTopic(name, pageNum);
            return data;
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [getByTopic]);

    useEffect(() => {
        if (!topicPar || topicPar === currentNameRef.current) return;
        
        const loadInitialData = async () => {
            currentNameRef.current = topicPar;
            setTopic([]);
            setPage(0);
            setHasNext(true);
            setInitialLoaded(false);
            
            const data = await fetchTopics(topicPar, 0);
            if (data) {
                setTopic(data.dataDto);
                setHasNext(data.hasNext);
            }
            setInitialLoaded(true);
        };
        
        loadInitialData();
    }, [topicPar, fetchTopics]);

    const loadMore = useCallback(async () => {
        if (!topicPar || isLoadingRef.current || !hasNext) return;
        
        const nextPage = page + 1;
        
        const data = await fetchTopics(topicPar, nextPage);
        if (data && data.dataDto.length > 0) {
            const newTopics = data.dataDto.filter(newEx => 
                !topic.some(oldEx => oldEx.id === newEx.id)
            );
            
            if (newTopics.length > 0) {
                setTopic(prev => [...prev, ...newTopics]);
                setHasNext(data.hasNext);
                setPage(nextPage);
            }
        }
    }, [topicPar, page, hasNext, topic, fetchTopics]);

    // Infinite scroll با debounce
    useEffect(() => {
        if (!hasNext || isLoadingRef.current) return;
        
        let timeoutId: NodeJS.Timeout;
        let isHandling = false;
        
        const handleScroll = () => {
            if (isHandling) return;
            
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                isHandling = true;
                
                const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
                const scrollBottom = scrollTop + clientHeight;
                const isNearBottom = scrollBottom >= scrollHeight - 300;
                
                if (isNearBottom) {
                    loadMore();
                }
                
                isHandling = false;
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [loadMore, hasNext]);

    // Loading states
    const isFirstLoad = !initialLoaded && (isLoading || hookLoading);
    const showNoData = initialLoaded && topic.length === 0 && !isLoading;
    const showTopics = topic.length > 0 && initialLoaded;

    if (!topicPar && !initialLoaded) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-indigo-300/80 to-indigo-950
        dark:bg-linear-to-b dark:from-indigo-950 dark:to-black p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                        {topicPar?.replace(/-/g, ' ') || 'Exercises'}
                    </h1>
                </div>

                {isFirstLoad && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                )}

                {showNoData && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No topic found for {topicPar}
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm">
                            Try a different topic group
                        </p>
                    </div>
                )}

                {showTopics && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {topic.map((topic, index) => (
                                <Cart
                                    key={`${topic.id}-${index}-${page}`}
                                    imgSrc={topic.imgUrl || "/leonkennedy.jpg"}
                                    imgAlt={topic.title}
                                    imgHeight={200}
                                    imgWidth={300}
                                    size="md"
                                    variant="outlined"
                                    tone="secondary"
                                    title={topic.title}
                                    onClick= {() => router.push(`/components/${topic.id.toString()}/article`)}
                                />
                            ))}
                        </div>

                        {isLoading && hasNext && (
                            <div className="flex justify-center mt-8 py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                            </div>
                        )}

                        {!hasNext && topic.length > 0 && (
                            <p className="text-center text-gray-500 dark:text-gray-400 mt-8 py-4">
                                All {topic.length} topic loaded
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
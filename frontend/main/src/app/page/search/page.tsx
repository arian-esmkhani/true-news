'use client'

import { useTopic } from "@/app/hooks/use-topic";
import { DataDto } from "@/app/types/data-type";
import { Cart } from "@/app/ui/cart";
import SearchLabel from "@/app/ui/search-lable";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ExercisePage() {
  const [topic, setTopic] = useState<DataDto[]>([]);
  const { searchByTopic, loading: hookLoading } = useTopic(); // تغییر: search به جای findExercises
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // اضافه کردن state برای جستجو
  const isLoadingRef = useRef(false);
  const currentSearchRef = useRef<string | null>(null); // تغییر: به جای muscleName
  const router = useRouter();

  // تابع fetch با searchQuery
  const fetchTopics = useCallback(async (query: string, pageNum: number) => {
    if (isLoadingRef.current) return null;
    
    isLoadingRef.current = true;
    setIsLoading(true);
    
    try {
      // اگر query خالی بود، همه exercises رو بگیر
      const searchTerm = query.trim() || ""; // یا منطق پیش‌فرض خودت
      const data = await searchByTopic(searchTerm, pageNum); // استفاده از متد search
      return data;
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, [searchByTopic]);

  // هندلر جستجو - وقتی کاربر کلیک کرد یا Enter زد
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    // ریست برای جستجوی جدید
    if (query !== currentSearchRef.current) {
      currentSearchRef.current = query;
      setTopic([]);
      setPage(0);
      setHasNext(true);
      setInitialLoaded(false);
      
      // fetch داده‌های اولیه
      const loadInitialData = async () => {
        const data = await fetchTopics(query, 0);
        if (data) {
          setTopic(data.dataDto);
          setHasNext(data.hasNext);
        }
        setInitialLoaded(true);
      };
      
      loadInitialData();
    }
  }, [fetchTopics]);

  // load more برای infinite scroll
  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasNext) return;
    
    const nextPage = page + 1;
    const data = await fetchTopics(searchQuery, nextPage);
    
    if (data && data.dataDto.length > 0) {
      const newExercises = data.dataDto.filter(newEx => 
        !topic.some(oldEx => oldEx.id === newEx.id)
      );
      
      if (newExercises.length > 0) {
        setTopic(prev => [...prev, ...newExercises]);
        setHasNext(data.hasNext);
        setPage(nextPage);
      }
    }
  }, [searchQuery, page, hasNext, topic, fetchTopics]);

  // Infinite scroll effect
  useEffect(() => {
    if (!hasNext || isLoadingRef.current || !initialLoaded) return;
    
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
  }, [loadMore, hasNext, initialLoaded]);

  // بارگذاری اولیه (مثلاً وقتی کامپوننت mount شد)
  useEffect(() => {
    // اگر می‌خوای اول همه exercises رو نشون بدی
    const loadInitial = async () => {
      const data = await fetchTopics("", 0);
      if (data) {
        setTopic(data.dataDto);
        setHasNext(data.hasNext);
        setInitialLoaded(true);
      }
    };
    
    if (!initialLoaded) {
      loadInitial();
    }
  }, [fetchTopics, initialLoaded]);

  // Loading states
  const isFirstLoad = !initialLoaded && (isLoading || hookLoading);
  const showNoData = initialLoaded && topic.length === 0 && !isLoading;
  const showTopics = topic.length > 0 && initialLoaded;

  return (
    <section className="min-h-screen
      bg-linear-to-b from-indigo-300/80 to-indigo-950 py-12
      dark:bg-linear-to-b dark:from-indigo-950 dark:to-black">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-linear-to-r from-purple-950 via-pink-800 to-indigo-500
                           bg-clip-text text-transparent">
              Biggest Library Of Pc Articles
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            We are with you every step of the way—
          </p>
          <p className="text-3xl font-bold text-indigo-900 animate-pulse">
            JUST LEARN IT.
          </p>
        </div>
        
        <div className="mx-[20.5%] md:mx-[38.5%] mb-12">
          <SearchLabel
            onSearchClick={() => handleSearch(searchQuery)} // وقتی آیکون کلیک شد
            onEnterPress={() => handleSearch(searchQuery)} // وقتی Enter زده شد
            onChange={(value) => {
              // اینجا فقط state رو آپدیت می‌کنیم
              // اگر می‌خوای real-time باشه delay رو کم کن یا بردار
              setSearchQuery(value);
            }}
            delay={500} // اگر می‌خوای real-time باشه delay رو بردار یا کم کن
          />
        </div>

        {/* نمایش exercises */}
        <div className="max-w-6xl mx-auto">
          {isFirstLoad && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
              <p className="text-gray-400 mt-4">Loading exercises...</p>
            </div>
          )}

          {showNoData && (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400">No exercises found</p>
              <p className="text-gray-500 mt-2">Try a different search term</p>
            </div>
          )}

          {showTopics && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-1 sm:gap-4">
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

              {/* Load more indicator */}
              {hasNext && !isLoading && (
                <div className="text-center mt-12">
                  <p className="text-gray-400">Scroll down to load more</p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                  <p className="text-gray-400 mt-2">Loading more...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
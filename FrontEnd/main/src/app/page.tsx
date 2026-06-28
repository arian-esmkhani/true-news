import { CategorySection } from "./components/category-section";
import { TrendCarousel } from "./components/trend-carousel";
import { InterviewCarousel } from "./components/interview_carousel";
import { NewestCarousel } from "./components/newest-carousel";
import { NoteCarousel } from "./components/note-carousel";
import { SuggestTitles } from "./components/titles/suggest-titles";
import { NewestTitles } from "./components/titles/newest-title";
import { GoldTitles } from "./components/titles/gold-title";
import { AiTitles } from "./components/titles/ai-title";
import { WarTitles } from "./components/titles/war-titles";
import { CultureTitles } from "./components/titles/culture-title";
import { EconomyTitles } from "./components/titles/economy-title";
import { PoliticalTitles } from "./components/titles/political-title";
import { TechnologyTitles } from "./components/titles/technology-title";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-indigo-300/80 to-indigo-950
      dark:bg-linear-to-b dark:from-indigo-950 dark:to-black">
        <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-3 p-5">
          <div className="mt-5 sm:mt-15 mr-11 lg:mr-13 xl:mr-45
              bg-linear-to-r from-indigo-700/30 to-pink-800/10 
              h-300 sm:h-398 md:h-369 rounded-2xl p-6">
            <NewestTitles/>                 
          </div>
          <div>
            <TrendCarousel/>
            <NoteCarousel/>
            <SuggestTitles/>
            <InterviewCarousel/>         
          </div>
          <div className="mt-5 sm:mt-15 ml-45
              sm:bg-linear-to-r sm:from-indigo-700/30 sm:to-pink-800/10 
              bg-linear-to-r from-indigo-700/6 to-pink-800/2 
              h-98 sm:h-398 md:h-369 rounded-2xl p-6">
            <GoldTitles/>
            <AiTitles/>
            <WarTitles/>
            <CultureTitles/>
          </div>
        </div>
  
        <CategorySection/>

        <div className="grid grid-cols-3 p-5 py-12">
          <EconomyTitles/>
          <PoliticalTitles/>
          <TechnologyTitles/>          
        </div>

        <NewestCarousel/>

        <div className="mt-22 h-7"></div>
    </div>
  )
}
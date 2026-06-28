export function HeroSection() {
    return (
        <div className="bg-linear-to-r from-indigo-600 to-pink-900 py-14 sm:h-[38vw] xl:h-[28vw]
        mx-[2vw] mt-5 sm:mt-11 rounded-4xl sm:rounded-[4em] shadow-xl/30 shadow-pink-900
        dark:bg-linear-to-t dark:from-pink-900/40 dark:to-indigo-950/60">
            <section className="flex justify-center py-[8%]">
                <span className="text-5xl sm:text-6xl  md:text-8xl opacity-85
                bg-linear-to-r from-purple-950 via-pink-800 to-indigo-500
                bg-clip-text text-transparent animate-pulse
                font-bold dark:opacity-75">PcPologist</span>
            </section>
        </div>
    )
}
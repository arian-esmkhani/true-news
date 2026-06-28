export default function Page() {
  return (
    <div className="mx-[2vw] mt-16 mb-20 rounded-4xl sm:rounded-[3em]
      bg-linear-to-r from-indigo-600/20 to-pink-900/20
      dark:bg-linear-to-r dark:from-indigo-950/40 dark:to-pink-900/30
      shadow-xl/20 shadow-indigo-900 py-16 px-10">

      <section className="flex flex-col items-center text-center space-y-6">

        <h2 className="text-4xl sm:text-5xl font-bold
          bg-linear-to-r from-purple-900 via-pink-700 to-indigo-500
          bg-clip-text text-transparent">
          About Us
        </h2>

        <p className="max-w-3xl text-lg sm:text-xl opacity-85
          dark:opacity-75 text-black dark:text-gray-300 leading-relaxed">
          PcPologist is a minimal and modern tech blog focused on computers,
          hardware, software, and the evolving world of digital technology.
          We share clear, concise articles made for anyone who wants to understand
          tech better—whether you are a beginner or an enthusiast.
        </p>

        <p className="max-w-3xl text-lg sm:text-xl opacity-85
          dark:opacity-75 text-black dark:text-gray-300 leading-relaxed">
          Our mission is simple: deliver helpful content every day, stay curious,
          and make complex topics feel effortless.
        </p>

      </section>
    </div>
  );
}

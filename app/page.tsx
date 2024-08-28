// "use client";

import EmailHome from "@/components/Home/EmailHome";
import Navbar from "@/components/Home/Navbar";
import WOMoviesList from "@/components/Home/WOMoviesList";
import { getTopTenMoviesWithoutUser } from "@/lib/actions/getActions";
import { VideoType } from "@prisma/client";

export default async function Home() {
  const movieData = await getTopTenMoviesWithoutUser(VideoType.MOVIE);
  const seriesData = await getTopTenMoviesWithoutUser(VideoType.TVSERIES);

  return (
    <main className="h-full">
      <div className="relative bg-bgAuth h-full w-full bg-cover bg-no-repeat bg-center ">
        <div className="absolute bg-black w-full h-full lg:bg-opacity-60" />
        <div className="absolute bg-black top-0 w-full h-24 lg:bg-opacity-50 z-0 shadow-black shadow-2xl" />
        <Navbar />
        <div className="max-w-7xl w-full m-auto flex justify-center items-center h-[calc(90vh-100px)] px-5">
          <div className="relative z-10 text-white">
            <p className="text-white md:text-7xl sm:text-5xl text-4xl font-bold text-center leading-normal">
              TV shows and more
              <br />
              Unlimited movies
            </p>
            <p className=" md:text-2xl text-xl mt-3 font-semibold text-center">
              Starts at ₹149. Cancel anytime.
            </p>
            <p className=" md:text-lg text-base mt-5 font-normal text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <div className="flex items-center sm:flex-row flex-col gap-4 mt-5">
              <EmailHome />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Trending Movies
          </p>
          <WOMoviesList movies={movieData.data || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Trending TV Shows
          </p>
          <WOMoviesList movies={seriesData.data || []} />
        </div>
      </div>
    </main>
  );
}

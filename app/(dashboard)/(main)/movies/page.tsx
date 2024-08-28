import MovieBoard from "@/components/dashboard/MovieBoard";
import MovieList from "@/components/dashboard/MovieList";
import {
  getActionAllMoviesByGenre,
  getNextWatchMovies,
  getRandomMovie,
  getTopTenMovies,
} from "@/lib/actions/getActions";
import { getUser } from "@/lib/getUser";
import { redirectToSignIn } from "@/lib/redirectToSignIn";
import { VideoType } from "@prisma/client";

const MoviesPage = async () => {
  const user = await getUser();
  if (!user) {
    return redirectToSignIn();
  }
  const { success, data } = await getRandomMovie(VideoType.MOVIE);
  if (!success) {
    return redirectToSignIn();
  }
  const movieData = await getTopTenMovies(VideoType.MOVIE);
  const nextWatchData = await getNextWatchMovies(VideoType.MOVIE);
  const { action, comedy, crime, horror, romance, scifi, thriller } =
    await getActionAllMoviesByGenre(VideoType.MOVIE);
  return (
    <div>
      {data && <MovieBoard data={data} />}
      <div className="px-4 md:px-12 mt-4 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Trending Now
          </p>
          <MovieList movies={movieData.data || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Your Next Watch
          </p>
          <MovieList movies={nextWatchData.data || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Action For You
          </p>
          <MovieList movies={action || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Comedy For You
          </p>
          <MovieList movies={comedy || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Crime For You
          </p>
          <MovieList movies={crime || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Horror For You
          </p>
          <MovieList movies={horror || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Romance For You
          </p>
          <MovieList movies={romance || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Sci-fi For You
          </p>
          <MovieList movies={scifi || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold">
            Top Thriller For You
          </p>
          <MovieList movies={thriller || []} />
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;

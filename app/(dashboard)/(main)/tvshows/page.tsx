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

const TVShowsPage = async () => {
  const user = await getUser();
  if (!user) {
    return redirectToSignIn();
  }
  const { success, data } = await getRandomMovie(VideoType.TVSERIES);
  if (!success) {
    return redirectToSignIn();
  }

  const movieData = await getTopTenMovies(VideoType.TVSERIES);
  const nextWatchData = await getNextWatchMovies(VideoType.TVSERIES);
  const { action, comedy, crime, horror, romance, scifi, thriller } =
    await getActionAllMoviesByGenre(VideoType.TVSERIES);
  return (
    <div>
      {data && <MovieBoard data={data} />}
      {movieData.data && movieData.data?.length > 0 && (
        <div className="px-4 md:px-12 mt-4 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Trending Now
            </p>
            <MovieList movies={movieData.data || []} />
          </div>
        </div>
      )}
      {nextWatchData.data && nextWatchData.data.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Your Next Watch
            </p>
            <MovieList movies={nextWatchData.data || []} />
          </div>
        </div>
      )}
      {action && action.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Action For You
            </p>
            <MovieList movies={action || []} />
          </div>
        </div>
      )}
      {comedy && comedy.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Comedy For You
            </p>
            <MovieList movies={comedy || []} />
          </div>
        </div>
      )}
      {crime && crime.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Crime For You
            </p>
            <MovieList movies={crime || []} />
          </div>
        </div>
      )}
      {horror && horror.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Horror For You
            </p>
            <MovieList movies={horror || []} />
          </div>
        </div>
      )}
      {romance && romance.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Romance For You
            </p>
            <MovieList movies={romance || []} />
          </div>
        </div>
      )}
      {scifi && scifi.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Sci-fi For You
            </p>
            <MovieList movies={scifi || []} />
          </div>
        </div>
      )}
      {thriller && thriller.length > 0 && (
        <div className="px-4 md:px-12 mt-10 space-y-8">
          <div className="relative">
            <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
              Top Thriller For You
            </p>
            <MovieList movies={thriller || []} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TVShowsPage;

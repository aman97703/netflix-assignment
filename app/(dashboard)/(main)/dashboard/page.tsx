import MovieBoard from "@/components/dashboard/MovieBoard";
import MovieList from "@/components/dashboard/MovieList";
import {
  getActionAllByGenre,
  getNextWatch,
  getRandomVideo,
  getTopTenVideos,
} from "@/lib/actions/getActions";
import { getUser } from "@/lib/getUser";
import { redirectToSignIn } from "@/lib/redirectToSignIn";

const DashbordPage = async () => {
  const user = await getUser();
  if (!user) {
    return redirectToSignIn();
  }
  const { success, data } = await getRandomVideo();
  if (!success) {
    return redirectToSignIn();
  }
  const movieData = await getTopTenVideos();
  const nextWatchData = await getNextWatch();
  const { action, comedy, crime, horror, romance, scifi, thriller } =
    await getActionAllByGenre();
  return (
    <div>
      {data && <MovieBoard data={data} />}
      <div className="px-4 md:px-12 mt-4 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Trending Now
          </p>
          <MovieList movies={movieData.data || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Your Next Watch
          </p>
          <MovieList movies={nextWatchData.data || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Action For You
          </p>
          <MovieList movies={action || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Comedy For You
          </p>
          <MovieList movies={comedy || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Crime For You
          </p>
          <MovieList movies={crime || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Horror For You
          </p>
          <MovieList movies={horror || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Romance For You
          </p>
          <MovieList movies={romance || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Sci-fi For You
          </p>
          <MovieList movies={scifi || []} />
        </div>
      </div>
      <div className="px-4 md:px-12 mt-10 space-y-8">
        <div className="relative">
          <p className="text-white text-base md:text-xl lg:text-2xl font-semibold md:absolute md:top-16">
            Top Thriller For You
          </p>
          <MovieList movies={thriller || []} />
        </div>
      </div>
    </div>
  );
};

export default DashbordPage;

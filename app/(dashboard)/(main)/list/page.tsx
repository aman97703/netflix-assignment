import MovieCard from "@/components/dashboard/MovieCard";
import { getMyFavIds, getMyList } from "@/lib/actions/getActions";
import { getUser } from "@/lib/getUser";
import { redirectToSignIn } from "@/lib/redirectToSignIn";

const ListPage = async () => {
  const user = await getUser();
  if (!user) {
    return redirectToSignIn();
  }
  const { data } = await getMyList();
  const { favoriteIds } = await getMyFavIds();
  return data && data.length > 0 ? (
    <div className="pt-56 px-10 grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-4">
      {data.map((val) => {
        const isInFavorites = (movieId: string) => favoriteIds?.has(movieId);
        return (
          <MovieCard
            isInList={isInFavorites(val.id) || true}
            video={val}
            key={val.id}
          />
        );
      })}
    </div>
  ) : (
    <div className="pt-32 px-10">
      <p className="text-white font-semibold text-base">No List available</p>
    </div>
  );
};

export default ListPage;

import MovieCard from "@/components/dashboard/MovieCard";
import { getMyList } from "@/lib/actions/getActions";

const ListPage = async () => {
  const { data } = await getMyList();

  return data && data.length > 0 ? (
    <div className="pt-56 px-10 grid md:grid-cols-6 sm:grid-cols-4 grid-cols-2 gap-4">
      {data.map((val) => (
        <MovieCard isInList={true} video={val} key={val.id} />
      ))}
    </div>
  ) : (
    <div className="pt-32 px-10">
      <p className="text-white font-semibold text-base">No List available</p>
    </div>
  );
};

export default ListPage;

import { Video } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "./MovieCard";
import { getMyFavIds } from "@/lib/actions/getActions";

interface MovieListParams {
  movies: Video[];
}

const MovieList = async ({ movies }: MovieListParams) => {
  const { favoriteIds } = await getMyFavIds();
  return (
    movies.length > 0 && (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="md:pt-[110px] pt-0">
          {movies.map((movie) => {
            const isInFavorites = (movieId: string) =>
              favoriteIds?.has(movieId);

            return (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/6 sm:basis-1/4 basis-1/2"
              >
                <MovieCard
                  video={movie}
                  isInList={isInFavorites(movie.id) || false}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  );
};

export default MovieList;

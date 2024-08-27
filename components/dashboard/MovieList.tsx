import { Video } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "./MovieCard";
import { getUser } from "@/lib/getUser";

interface MovieListParams {
  movies: Video[];
}

const MovieList = async ({ movies }: MovieListParams) => {
  const user = await getUser();
  return (
    movies.length > 0 && (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {movies.map((movie) => {
            const isInList = user
              ? user.favoriteVideoIds.findIndex((f) => f === movie.id)
              : -1;
            return (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/6 sm:basis-1/4 basis-1/3"
              >
                <MovieCard
                  video={movie}
                  isInList={isInList !== -1 ? true : false}
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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WOMovieCard from "./WOMovieCard";

export type AuthFreeVideoType = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  genres: string;
  duration: string;
  type: string;
};
interface MovieListParams {
  movies: AuthFreeVideoType[];
}

const WOMoviesList = ({ movies }: MovieListParams) => {
  return (
    movies.length > 0 && (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="md:pt-[110px] pt-0">
          {movies.map((movie:AuthFreeVideoType) => {
            return (
              <CarouselItem
                key={movie.id}
                className="md:basis-1/6 sm:basis-1/4 basis-1/2"
              >
                <WOMovieCard video={movie} />
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

export default WOMoviesList;

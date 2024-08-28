"use client";
import Image from "next/image";
import { AuthFreeVideoType } from "./WOMoviesList";

interface WOMovieCardParams {
  video: AuthFreeVideoType;
}

const WOMovieCard = ({ video }: WOMovieCardParams) => {
  return (
    <div className="group bg-zinc-900 col-span relative md:h-[12vw] h-[100px] p-2">
      <Image
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full cursor-pointer object-cover transition duration-0 rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 md:h-[12vw] h-[100px]"
        width={200}
        height={100}
      />
      <div className="opacity-0 absolute top-0 duration-200 transition z-10 invisible sm:visible delay-300 w-[150%] scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]  group-hover:opacity-100">
        <Image
          src={video.thumbnailUrl}
          alt={"Thumbnail"}
          className="cursor-pointer object-cover transition duration shadow-xl w-full md:h-[12vw] h-[100px]"
          width={200}
          height={100}
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">
              {video.duration}
            </p>
            <p className="h-2 w-2 bg-gray-400 rounded-full" />
            <p className="text-white text-[10px] lg:text-sm">{video.genres}</p>
            <p className="h-2 w-2 bg-gray-400 rounded-full" />
            <p className="text-white text-[10px] lg:text-sm">{video.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WOMovieCard;

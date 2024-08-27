"use client";
import { Video } from "@prisma/client";
import { InfoIcon, PlayCircle } from "lucide-react";
import InfoModel from "../infomodel";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MovieBoard = ({ data }: { data: Video }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  
  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
        autoPlay
        muted
        loop
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
      />
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%]">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <button
            className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-white/90 transition"
            onClick={() => router.push(`/video/${data.id}`)}
          >
            <PlayCircle className="mr-1" /> Play
          </button>
          <button
            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
            onClick={handleOpen}
          >
            <InfoIcon className="mr-1" /> More Info
          </button>
        </div>
      </div>
      <InfoModel handleClose={handleClose} open={open} video={data} />
    </div>
  );
};

export default MovieBoard;

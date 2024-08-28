"use client";
import { addToMyList, removeFromMyList } from "@/lib/actions/updateActions";
import { Video } from "@prisma/client";
import { Check, ChevronDown, Play, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InfoModel from "../infomodel";

interface MovieCardProps {
  video: Video;
  isInList: boolean;
}

const MovieCard = ({ video, isInList }: MovieCardProps) => {
  const [inList, setInList] = useState(isInList);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  useEffect(() => {
    setInList(isInList);
  }, [isInList]);
  const handleAddToList = async () => {
    const { success } = await addToMyList(video.id);
    if (success) {
      setInList(true);
    }
  };
  const handleRemoveFromList = async () => {
    const { success } = await removeFromMyList(video.id);
    if (success) {
      setInList(false);
    }
  };
  const handleMoveToMovie = async () => {
    router.push(`video/${video.id}`);
  };
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
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer border border-black w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={handleMoveToMovie}
            >
              <Play size={30} />
            </div>

            {inList ? (
              <div
                className="cursor-pointer border border-white w-6 h-6 lg:w-10 lg:h-10 bg-black/90 rounded-full flex justify-center items-center transition hover:bg-black/80"
                onClick={handleRemoveFromList}
              >
                <Check size={30} className="text-white" />
              </div>
            ) : (
              <div
                className="cursor-pointer border border-white w-6 h-6 lg:w-10 lg:h-10 bg-black/90 rounded-full flex justify-center items-center transition hover:bg-black/80"
                onClick={handleAddToList}
              >
                <Plus size={30} className="text-white" />
              </div>
            )}
            <div
              className="cursor-pointer ml-auto border border-black w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={handleOpen}
            >
              <ChevronDown size={20} />
            </div>
          </div>
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
      <InfoModel handleClose={handleClose} open={open} video={video} />
    </div>
  );
};

export default MovieCard;

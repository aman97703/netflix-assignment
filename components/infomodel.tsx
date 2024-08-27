"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Video } from "@prisma/client";
import { PlayCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface InfoModelProps {
  open: boolean;
  handleClose: () => void;
  video: Video;
}

const InfoModel = ({ open, handleClose, video }: InfoModelProps) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 max-w-2xl h-96 overflow-hidden rounded-lg">
        <video
          poster={video?.thumbnailUrl}
          src={video?.videoUrl}
          autoPlay
          muted
          loop
          className="w-full brightness-[60%]"
        />
        <X
          className="absolute top-1 right-1 text-white cursor-pointer z-10"
          onClick={handleClose}
        />
        <div className="absolute bottom-[10%] left-10">
          <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
            {video.title}
          </p>
          <div className="flex flex-row gap-4 items-center ">
            <button
              className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-white/90 transition"
              onClick={() => router.push(`/video/${video.id}`)}
            >
              <PlayCircle className="mr-1" /> Play
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModel;

import Backbutton from "@/components/baclbutton";
import { getVideo } from "@/lib/actions/getActions";
import { getUser } from "@/lib/getUser";
import { redirectToSignIn } from "@/lib/redirectToSignIn";
import { ArrowLeft } from "lucide-react";

interface VideoPageProps {
  params: {
    videoid: string;
  };
}

const VideoPage = async ({ params }: VideoPageProps) => {
  const user = await getUser();
  const { videoid } = params;
  if (!user || !videoid) {
    return redirectToSignIn();
  }

  const { data } = await getVideo(videoid);
  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <Backbutton/>
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching : </span>
          {data?.title}
        </p>
      </nav>
      <video src={data?.videoUrl} className="h-full w-full" autoPlay controls />
    </div>
  );
};

export default VideoPage;

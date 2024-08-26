import { getUser } from "@/lib/getUser";
import { redirectToSignIn } from "@/lib/redirectToSignIn";

const DashbordPage = async() => {
  const user = await getUser();
  if(!user){
    return redirectToSignIn()
  }
  return <div>Dashbord</div>;
};

export default DashbordPage;

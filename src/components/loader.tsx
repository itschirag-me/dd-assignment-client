import { useLottie } from "lottie-react";
import animationData from "@/assets/Loading.json";

const Loader = () => {
  const { View } = useLottie({
    animationData,
    loop: true,
  });

  return (
    <div className="fixed flex justify-center items-center h-screen w-screen top-0 left-0 bg-white/50">
      <div className="w-40 h-40">{View}</div>
    </div>
  );
};

export default Loader;

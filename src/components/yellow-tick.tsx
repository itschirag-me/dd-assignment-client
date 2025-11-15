import { useLottie } from "lottie-react";
import animationData from "@/assets/Yellow Tick.json";

const YellowTick = () => {
  const { View } = useLottie({
    animationData,
    loop: false,
  });

  return (
      <div className="w-30 h-30">{View}</div>
  );
};

export default YellowTick;

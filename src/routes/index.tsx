import { createFileRoute } from "@tanstack/react-router";
import { useLottie } from "lottie-react";
import animationData from "@/assets/Loading.json";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { View } = useLottie({
    animationData,
    loop: true,
  });

  return (
    <div className="p-2">
      <h3 className="font-sans">Welcome Home!</h3>
      <div className="w-10 h-10">{View}</div>
    </div>
  );
}

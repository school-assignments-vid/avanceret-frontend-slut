"use client";

import { cn } from "@/lib/utils";
import { useModal } from "./model";

export function AlienMessage() {
  const { activeId } = useModal();

  return (
    <div
      className={cn(
        "fixed top-1/2 left-[40%] -translate-y-1/2 -translate-x-1/2 z-0",
        "text-white text-3xl font-bold tracking-widest uppercase text-center pointer-events-none",
        "transition-opacity duration-300",
        activeId ? "opacity-0" : "opacity-100",
      )}
    >
      <p>Modal closed</p>
      <p>the alien stays on pc</p>
    </div>
  );
}

export function WelcomeVideo() {
  const { close } = useModal();
  return (
    <video
      src={"/intro.mp4"}
      autoPlay
      muted
      onEnded={close}
      className="w-full h-full object-cover"
    />
  );
}

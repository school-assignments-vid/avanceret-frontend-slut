import { IconLayoutSidebar } from "@tabler/icons-react";

export function MobileOverlay() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 text-center lg:hidden">
      <IconLayoutSidebar size={64} className="text-[#BF532C] mb-4" />
      <h1 className="text-2xl font-bold mb-2">Desktop Only</h1>
      <p className="text-zinc-500">
        The alien control panel is too powerful for mobile devices. <br />
        Please access the dashboard from a desktop computer.
      </p>
    </div>
  );
}

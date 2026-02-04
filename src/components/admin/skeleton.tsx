export function DashboardSkeleton() {
  return (
    <div className="flex w-full h-full animate-pulse">
      <div className="w-80 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="h-6 w-24 bg-zinc-800 rounded"></div>
          <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 bg-zinc-900 rounded-lg w-full"></div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-black">
        <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-8">
          <div className="h-4 w-32 bg-zinc-800 rounded"></div>
          <div className="h-10 w-32 bg-zinc-800 rounded"></div>
        </div>
        <div className="p-8 max-w-3xl mx-auto w-full space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-12 w-full bg-zinc-900 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-20 bg-zinc-800 rounded"></div>
              <div className="h-12 w-full bg-zinc-900 rounded"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-zinc-800 rounded"></div>
            <div className="h-12 w-full bg-zinc-900 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-zinc-800 rounded"></div>
            <div className="h-12 w-full bg-zinc-900 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-zinc-800 rounded"></div>
            <div className="h-64 w-full bg-zinc-900 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

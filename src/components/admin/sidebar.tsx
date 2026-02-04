import { IconPlus, IconTrash } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ModalItem } from "./types";

interface SidebarProps {
  items: ModalItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onAdd: () => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
}

export function AdminSidebar({
  items,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
}: SidebarProps) {
  return (
    <div className="w-80 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col">
      <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
        <h1 className="font-bold text-xl text-[#BF532C]">Modals</h1>
        <button
          onClick={onAdd}
          className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-green-500"
          title="Add New"
        >
          <IconPlus size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "p-4 border-b border-zinc-900 cursor-pointer flex justify-between items-center group transition-colors",
              selectedId === item.id
                ? "bg-zinc-900 border-l-4 border-l-[#BF532C]"
                : "hover:bg-zinc-900/50 border-l-4 border-l-transparent",
            )}
          >
            <div className="truncate pr-2 font-medium">
              {item.menu_name || "Untitled"}
            </div>
            <button
              onClick={(e) => onDelete(e, item.id)}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded transition-all"
              title="Delete"
            >
              <IconTrash size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ModalItem } from "./types";

interface EditorProps {
  item: ModalItem | undefined;
  saving: boolean;
  onSave: () => void;
  onChange: (field: keyof ModalItem, value: string) => void;
}

export function AdminEditor({ item, saving, onSave, onChange }: EditorProps) {
  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-600">
        <p>Select an item from the sidebar or create a new one.</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-950/50">
        <span className="text-zinc-500 text-sm font-mono">
          EDITING ID: {item.id}
        </span>
        <button
          onClick={onSave}
          disabled={saving}
          className={cn(
            "flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all",
            "bg-[#BF532C] hover:bg-white hover:text-black",
            saving && "opacity-50 cursor-not-allowed",
          )}
        >
          {saving ? (
            <IconLoader2 className="animate-spin" size={18} />
          ) : (
            <IconDeviceFloppy size={18} />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-6 pb-20">
          <div className="grid grid-cols-2 gap-6">
            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-zinc-400">Menu Name</span>
              <input
                className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:border-[#BF532C] focus:ring-1 focus:ring-[#BF532C] outline-none transition-all"
                value={item.menu_name || ""}
                onChange={(e) => onChange("menu_name", e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-bold text-zinc-400">
                Slug (URL ID)
              </span>
              <input
                className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:border-[#BF532C] focus:ring-1 focus:ring-[#BF532C] outline-none transition-all"
                value={item.slug || ""}
                onChange={(e) => onChange("slug", e.target.value)}
              />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-zinc-400">Main Title</span>
            <input
              className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:border-[#BF532C] focus:ring-1 focus:ring-[#BF532C] outline-none transition-all"
              value={item.title || ""}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-bold text-zinc-400">Image Path</span>
            <input
              className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg focus:border-[#BF532C] focus:ring-1 focus:ring-[#BF532C] outline-none transition-all font-mono text-sm"
              value={item.img || ""}
              onChange={(e) => onChange("img", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2 h-100">
            <span className="text-sm font-bold text-zinc-400">
              Markdown Content
            </span>
            <textarea
              className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-lg focus:border-[#BF532C] focus:ring-1 focus:ring-[#BF532C] outline-none transition-all font-mono text-sm leading-relaxed resize-none"
              value={item.content || ""}
              onChange={(e) => onChange("content", e.target.value)}
            />
          </label>
        </div>
      </div>
    </>
  );
}

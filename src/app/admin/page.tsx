/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { ModalItem } from "@/components/admin/types";
import { MobileOverlay } from "@/components/admin/mobile-overlay";
import { DashboardSkeleton } from "@/components/admin/skeleton";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminEditor } from "@/components/admin/editor";

export default function AdminDashboard() {
  const [items, setItems] = useState<ModalItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchModals = async () => {
      try {
        const res = await fetch("/api/modals");
        const data = await res.json();
        setItems(data);
        if (!selectedId && data.length > 0) {
          setSelectedId(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };
    fetchModals();
  }, [selectedId]);

  // Add new item
  const handleAdd = async () => {
    try {
      const res = await fetch("/api/modals", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create");
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem]);
      setSelectedId(newItem.id);
    } catch (error) {
      alert("Error adding item");
    }
  };

  // Delete item
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await fetch(`/api/modals?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
      if (selectedId === id) {
        setSelectedId(newItems.length > 0 ? newItems[0].id : null);
      }
    } catch (error) {
      alert("Error deleting item");
    }
  };

  // Save currently selected item
  const handleSave = async () => {
    const itemToSave = items.find((i) => i.id === selectedId);
    if (!itemToSave) return;

    setSaving(true);
    try {
      const res = await fetch("/api/modals", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSave),
      });
      if (!res.ok) throw new Error("Failed to save");
    } catch (error) {
      alert("Error saving item");
    } finally {
      setSaving(false);
    }
  };

  // Update field on selected item
  const handleChange = (field: keyof ModalItem, value: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedId ? { ...item, [field]: value } : item,
      ),
    );
  };

  const selectedItem = items.find((i) => i.id === selectedId);

  return (
    <>
      <MobileOverlay />

      <div className="hidden lg:flex h-screen bg-black text-white font-sans overflow-hidden">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <AdminSidebar
              items={items}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onAdd={handleAdd}
              onDelete={handleDelete}
            />

            <div className="flex-1 flex flex-col h-full bg-black">
              <AdminEditor
                item={selectedItem}
                saving={saving}
                onSave={handleSave}
                onChange={handleChange}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

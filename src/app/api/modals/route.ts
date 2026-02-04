// API: CRUD handlers for `modals` table
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET: list modals
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("modals")
    .select("*")
    .order("id", { ascending: true });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: create a new modal
export async function POST() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("modals")
    .insert([
      {
        slug: `new-item-${Date.now()}`,
        menu_name: "New Item",
        title: "New Title",
        img: "/one.jpg",
        content: "## New Content",
      },
    ])
    .select()
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT: update a modal
export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { id, ...updates } = body;

  const { data, error } = await supabase
    .from("modals")
    .update(updates)
    .eq("id", id)
    .select();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: remove a modal
export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });

  const { error } = await supabase.from("modals").delete().eq("id", id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { IconLoader2, IconSend, IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSuccess(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
          <IconCheck size={32} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400">We will get back to you shortly.</p>
        <button
          onClick={() => setSuccess(false)}
          className="mt-6 text-[#BF532C] hover:text-white underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-8 lg:p-12">
      <h2 className="text-3xl font-bold mb-8 text-[#BF532C]">Contact Us</h2>

      <form onSubmit={handleSubmit} className="flex-col flex gap-6">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-bold text-zinc-400 uppercase tracking-wider"
          >
            Navn
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full bg-zinc-900/50 border-2 border-zinc-800 p-4 rounded-lg focus:border-[#BF532C] focus:bg-zinc-900 outline-none transition-all text-white placeholder:text-zinc-600"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-bold text-zinc-400 uppercase tracking-wider"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full bg-zinc-900/50 border-2 border-zinc-800 p-4 rounded-lg focus:border-[#BF532C] focus:bg-zinc-900 outline-none transition-all text-white placeholder:text-zinc-600"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-bold text-zinc-400 uppercase tracking-wider"
          >
            Kommentar
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full bg-zinc-900/50 border-2 border-zinc-800 p-4 rounded-lg focus:border-[#BF532C] focus:bg-zinc-900 outline-none transition-all resize-none text-white placeholder:text-zinc-600"
            placeholder="Your message here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={cn(
            "mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-lg font-bold text-lg transition-all",
            "bg-[#BF532C] hover:bg-white hover:text-black text-white",
            loading && "opacity-50 cursor-not-allowed",
          )}
        >
          {loading ? (
            <IconLoader2 className="animate-spin" />
          ) : (
            <>
              Send Message <IconSend size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

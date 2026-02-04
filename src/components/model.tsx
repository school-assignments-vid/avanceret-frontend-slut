"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface ModalContextValue {
  activeId: string | null;
  isSwitching: boolean;
  isInitial: boolean;
  open: (id: string) => void;
  close: () => void;
}

// ModalContext: shared modal state
const ModalContext = React.createContext<ModalContextValue | null>(null);

export function ModalRoot({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen?: string;
}) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [isInitial, setIsInitial] = React.useState(true);
  const [isSwitching, setIsSwitching] = React.useState(false);
  const prevActiveId = React.useRef<string | null>(null);

  React.useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      setActiveId(hash || defaultOpen || null);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    const timer = setTimeout(() => setIsInitial(false), 100);

    return () => {
      window.removeEventListener("hashchange", handleHash);
      clearTimeout(timer);
    };
  }, [defaultOpen]);

  React.useEffect(() => {
    setIsSwitching(
      activeId !== null &&
        prevActiveId.current !== null &&
        activeId !== prevActiveId.current,
    );
    prevActiveId.current = activeId;
  }, [activeId]);

  const open = React.useCallback((id: string) => {
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
  }, []);

  const close = React.useCallback(() => {
    window.history.pushState(null, "", " ");
    setActiveId(null);
  }, []);

  return (
    <ModalContext.Provider
      value={{ activeId, isSwitching, isInitial, open, close }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({
  id,
  children,
  className,
  activeClassName,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}) {
  const ctx = React.useContext(ModalContext);
  const isActive = ctx?.activeId === id;

  return (
    <button
      type="button"
      className={cn(className, isActive && activeClassName)}
      onClick={() => ctx?.open(id)}
    >
      {children}
    </button>
  );
}

export function ModalContent({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(ModalContext);
  const isActive = ctx?.activeId === id;
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const shouldAnimate = ctx ? !ctx.isInitial && !ctx.isSwitching : true;

  React.useEffect(() => {
    if (isActive) {
      setIsMounted(true);
      if (shouldAnimate) {
        requestAnimationFrame(() => setIsVisible(true));
      } else {
        setIsVisible(true);
      }
    } else {
      if (!shouldAnimate) {
        setIsVisible(false);
        setIsMounted(false);
      } else {
        setIsVisible(false);
        const timer = setTimeout(() => setIsMounted(false), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isActive, shouldAnimate]);

  if (!isMounted || !ctx) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8 pointer-events-none">
      <div
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-lg border-4 border-white bg-black/80 text-white shadow-2xl pointer-events-auto",
          shouldAnimate && "transition-all duration-300 ease-in-out",
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4",
          "h-[80vh] lg:h-auto lg:aspect-video lg:max-w-6xl",
          className,
        )}
      >
        <button
          onClick={ctx.close}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <IconX size={24} />
        </button>
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

export const useModal = () => {
  const ctx = React.useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalRoot");
  return ctx;
};

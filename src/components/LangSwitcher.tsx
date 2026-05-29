"use client";

import { Languages } from "lucide-react";

import { useLocaleContext } from "@/context/LangContext";

export default function LangSwitcher() {
  const { locale, switchLanguage, isPending } = useLocaleContext();

  const nextLang = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => switchLanguage(nextLang)}
      disabled={isPending}
      aria-label="Cambiar idioma"
      className="
        fixed bottom-6 right-6 z-40
        group
        flex items-center gap-3
        rounded-2xl
        border border-white/10
        bg-zinc-950/95
        backdrop-blur-xl
        px-3 py-3
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
        transition-all duration-300
        hover:scale-[1.03]
        hover:border-emerald-500/30
        hover:shadow-[0_10px_40px_rgba(16,185,129,0.18)]
        disabled:opacity-60
        disabled:cursor-not-allowed
      "
    >
      {/* Icon */}
      <div
        className="flex h-8 w-8 items-center justify-center"
      >
        <Languages className="w-5 h-5 text-white" />
      </div>

      {/* Text */}
      <div className="text-left">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">
            {locale === "es" ? "Español" : "English"}
          </span>

        </div>
      </div>

      {/* Loading pulse */}
      {isPending && (
        <div className="absolute inset-0 rounded-2xl border border-emerald-400/40 animate-pulse" />
      )}
    </button>
  );
}
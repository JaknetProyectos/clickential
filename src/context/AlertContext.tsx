"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

import { createPortal } from "react-dom";

import {
  X,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";

import Image from "next/image";

export type AlertType =
  | "error"
  | "success"
  | "warning"
  | "info";

export interface AlertOptions {
  title: string;
  message: string;
  icon?: React.ReactNode;
  image?: string;
  confirmText?: string;
  onClose?: () => void;
  type?: AlertType;
  autoClose?: boolean;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext =
  createContext<AlertContextType | undefined>(
    undefined
  );

const typeStyles = {
  success: {
    border: "border-emerald-500",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    button:
      "bg-emerald-500 hover:bg-emerald-600",
    glow: "bg-emerald-500/10",
    defaultIcon: (
      <CheckCircle2 className="h-7 w-7" />
    ),
  },

  error: {
    border: "border-red-500",
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    button: "bg-red-600 hover:bg-red-700",
    glow: "bg-red-500/10",
    defaultIcon: (
      <AlertCircle className="h-7 w-7" />
    ),
  },

  warning: {
    border: "border-yellow-500",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-400",
    button:
      "bg-yellow-500 hover:bg-yellow-600 text-black",
    glow: "bg-yellow-500/10",
    defaultIcon: (
      <AlertTriangle className="h-7 w-7" />
    ),
  },

  info: {
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-700",
    glow: "bg-blue-500/10",
    defaultIcon: <Info className="h-7 w-7" />,
  },
} as const;

export function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [isVisible, setIsVisible] =
    useState(false);

  const [options, setOptions] =
    useState<AlertOptions | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  const hideAlert = useCallback(() => {
    setIsVisible(false);

    const onClose = options?.onClose;

    setTimeout(() => {
      setIsOpen(false);
      setOptions(null);
      onClose?.();
    }, 250);
  }, [options]);

  const showAlert = useCallback(
    (opts: AlertOptions) => {
      setOptions(opts);
      setIsOpen(true);
    },
    []
  );

  useEffect(() => {
    if (!options?.autoClose || !isOpen) return;

    const timeout = setTimeout(() => {
      hideAlert();
    }, 3500);

    return () => clearTimeout(timeout);
  }, [options, isOpen, hideAlert]);

  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "Escape") {
        hideAlert();
      }
    };

    if (isOpen) {
      window.addEventListener(
        "keydown",
        handleKeyDown
      );
    }

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, hideAlert]);

  const type = options?.type || "info";

  const styles = typeStyles[type];

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        hideAlert,
      }}
    >
      {children}

      {mounted &&
        isOpen &&
        options &&
        createPortal(
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">


            {/* MODAL */}
            <div
              role="dialog"
              aria-modal="true"
              className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] border bg-[#111111] shadow-2xl transition-all duration-300 ${styles.border} ${isVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-4 scale-95 opacity-0"
                }`}
            >
              {/* GLOW */}
              <div
                className={`absolute -top-20 right-0 h-56 w-56 rounded-full blur-3xl ${styles.glow}`}
              />

              {/* CLOSE */}
              <button
                type="button"
                onClick={hideAlert}
                className="z-20 flex h-11 w-11 items-center justify-center rounded-2xl  text-zinc-400 transition-all hover:border-red-500 hover:bg-red-600 hover:text-white"
              >
                {`                    `}<X className="h-5 w-5" />
              </button>

              {/* CONTENT */}
              <div className="relative z-10 p-8 sm:p-10">
                {/* ICON */}
                <div className="mb-8 flex justify-center">
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/5 ${styles.iconBg} ${styles.iconColor}`}
                  >
                    {options.icon ||
                      styles.defaultIcon}
                  </div>
                </div>

                {/* IMAGE */}
                {options.image && (
                  <div className="relative mb-8 aspect-video overflow-hidden rounded-[2rem] border border-zinc-800">
                    <Image
                      src={options.image}
                      alt={options.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* TEXT */}
                <div className="text-center">
                  <h3 className="text-3xl font-black text-white">
                    {options.title}
                  </h3>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-8 text-zinc-400">
                    {options.message}
                  </p>
                </div>

                {/* BUTTON */}
                <div className="mt-10">
                  <button
                    type="button"
                    onClick={hideAlert}
                    className={`flex h-14 w-full items-center justify-center rounded-2xl px-6 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] ${styles.button}`}
                  >
                    {options.confirmText ||
                      "Continuar"}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      "useAlert debe ser usado dentro de AlertProvider"
    );
  }

  return context;
};
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "@/lib/cart-store";

export default function CartDrawer() {
  const t = useTranslations("CartDrawer");

  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [setIsCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-red-600/20 bg-[#121212] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <h2 className="flex items-center gap-3 text-xl font-bold text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>

            {t("title")}
          </h2>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-[#1b1b1b] text-zinc-300 transition-all hover:border-red-500 hover:bg-red-600 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-zinc-800 bg-[#1a1a1a]">
                <ShoppingBag className="h-12 w-12 text-zinc-600" />
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                {t("empty.title")}
              </h3>

              <p className="mb-8 max-w-xs text-sm leading-7 text-zinc-400">
                {t("empty.description")}
              </p>

              <Link
                href="/planes"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-red-700"
              >
                {t("empty.viewPlans")}
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-zinc-800 bg-[#1a1a1a] p-4"
                >
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-zinc-700">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col">
                      <h3 className="text-sm font-bold leading-6 text-white">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-lg font-black text-red-500">
                        MXN$
                        {item.price.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                        })}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-[#121212] text-white transition-all hover:border-red-500 hover:bg-red-600"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <div className="flex h-9 min-w-[44px] items-center justify-center rounded-xl border border-zinc-700 bg-[#121212] px-3 text-sm font-bold text-white">
                          {item.quantity}
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-[#121212] text-white transition-all hover:border-red-500 hover:bg-red-600"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 transition-all hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 bg-[#111111] p-6">
            <div className="mb-6 rounded-3xl border border-zinc-800 bg-[#1a1a1a] p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  {t("subtotal")}
                </span>

                <span className="text-2xl font-black text-white">
                  MXN$
                  {totalPrice.toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className="text-xs text-zinc-500">
                {t("taxIncluded")}
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/carrito">
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                  }}
                  className="flex h-14 w-full items-center justify-center rounded-2xl bg-red-600 px-6 text-sm font-bold text-white transition-all hover:bg-red-700"
                >
                  {t("checkout")}
                </button>
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="flex h-14 w-full items-center justify-center rounded-2xl border border-zinc-700 bg-[#1a1a1a] px-6 text-sm font-semibold text-zinc-300 transition-all hover:border-red-500 hover:text-white"
              >
                {t("clearCart")}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
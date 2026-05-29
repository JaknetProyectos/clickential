"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import CartDrawer from "./CartDrawer";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("header");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: t("navigation.home") },
    { href: "/planes", label: t("navigation.plans") },
    { href: "/contacto", label: t("navigation.contact") },
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl">
              <Image
                src="/logo.png"
                width={50}
                height={50}
                alt={t("logoAlt")}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight text-white">
                Click Ential
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-200 ${active
                      ? "border border-red-500/20 bg-red-500 text-white"
                      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="group flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-[#1a1a1a] px-4 transition-all duration-300 hover:border-red-500/30 hover:bg-[#202020]"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5 text-white" />

                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                    {totalItems}
                  </span>
                )}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  {t("cart")}
                </p>

                <p className="text-sm font-bold text-white">
                  MXN$
                  {totalPrice.toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </button>

            {/* Mobile button */}
            <button
              type="button"
              aria-label={t("menu")}
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#1a1a1a] text-white transition-all hover:border-red-500/30 hover:bg-[#202020] md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#111111] md:hidden">
            <nav className="container mx-auto flex flex-col gap-2 px-4 py-5">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`rounded-2xl px-4 py-4 text-sm font-semibold transition-all ${active
                        ? "bg-red-500 text-white"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
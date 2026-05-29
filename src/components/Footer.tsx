"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-white/10 bg-[#0f0f10] text-white">
      <div className="container mx-auto px-4">
        {/* TOP */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center">
                <Image
                  src={"/logo.png"}
                  width={50}
                  height={50}
                  alt="logo"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  Click Ential
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {t("brand.subtitle")}
                </p>
              </div>
            </div>

            <div className="mt-8 max-w-md space-y-3 text-sm leading-7 text-zinc-400">
              <p>{t("address.line1")}</p>

              <p>{t("address.line2")}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="tel:+525521216995"
                className="rounded-2xl border border-white/10 bg-[#151516] px-5 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-red-500/30 hover:text-white"
              >
                +52 55 2121 6995
              </a>

              <a
                href="mailto:sales@clickential.com.mx"
                className="rounded-2xl border border-white/10 bg-[#151516] px-5 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-red-500/30 hover:text-white"
              >
                sales@clickential.com.mx
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-red-200">
                {t("navigation.title")}
              </p>

              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {t("navigation.home")}
                </Link>

                <Link
                  href="/planes"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {t("navigation.plans")}
                </Link>

                <Link
                  href="/contacto"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {t("navigation.contact")}
                </Link>
              </div>
            </div>

            <div>
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-red-200">
                {t("legal.title")}
              </p>

              <div className="flex flex-col gap-4">
                <Link
                  href="/aviso-de-privacidad"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {t("legal.privacy")}
                </Link>

                <Link
                  href="/terminos-y-condiciones"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {t("legal.terms")}
                </Link>

                <Link
                  href="/politica-de-reembolsos"
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {t("legal.refunds")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row mr-12 md:items-center md:justify-between">
          <p className="text-sm text-zinc-500">
            {t("copyright")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-zinc-500">
              {t("paymentMethods")}
            </span>

            <div className="flex items-center gap-2">
              <Image
                src={"/cards.png"}
                width={120}
                height={50}
                alt="cards"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
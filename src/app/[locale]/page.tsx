"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  ChevronRight,
  ArrowRight,
  Computer,
  Waypoints,
  NotebookPen,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden border-b border-white/10 pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
              {t("hero.badge")}
            </div>

            <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-300">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-white/10 bg-[#151515] py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 max-w-3xl">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
              {t("features.badge")}
            </span>

            <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              {t("features.title")}
            </h2>

            <p className="text-lg leading-relaxed text-zinc-400">
              {t("features.description")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-3xl border border-white/10 bg-[#1b1b1b] p-8 transition-all hover:border-red-500/30">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600">
                <Computer />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {t("features.cards.experience.title")}
              </h3>

              <p className="leading-relaxed text-zinc-400">
                {t("features.cards.experience.description")}
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl border border-white/10 bg-[#1b1b1b] p-8 transition-all hover:border-red-500/30">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <Waypoints />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {t("features.cards.processes.title")}
              </h3>

              <p className="leading-relaxed text-zinc-400">
                {t("features.cards.processes.description")}
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-white/10 bg-[#1b1b1b] p-8 transition-all hover:border-red-500/30">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
                <NotebookPen />
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {t("features.cards.creativity.title")}
              </h3>

              <p className="leading-relaxed text-zinc-400">
                {t("features.cards.creativity.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-white/10 bg-[#111111] py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
                {t("experience.badge")}
              </span>

              <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
                {t("experience.title")}
              </h2>

              <p className="mb-12 text-lg leading-relaxed text-zinc-400">
                {t("experience.description")}
              </p>

              <div className="space-y-8">
                <div>
                  <div className="mb-3 flex justify-between text-sm font-semibold">
                    <span className="text-white">
                      {t("experience.stats.clientSatisfaction")}
                    </span>
                    <span className="text-red-400">90%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#1f1f1f]">
                    <div className="h-full w-[90%] rounded-full bg-red-600" />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex justify-between text-sm font-semibold">
                    <span className="text-white">
                      {t("experience.stats.marketing")}
                    </span>
                    <span className="text-red-400">80%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#1f1f1f]">
                    <div className="h-full w-[80%] rounded-full bg-red-600" />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex justify-between text-sm font-semibold">
                    <span className="text-white">
                      {t("experience.stats.administration")}
                    </span>
                    <span className="text-red-400">85%</span>
                  </div>

                  <div className="h-3 overflow-hidden rounded-full bg-[#1f1f1f]">
                    <div className="h-full w-[85%] rounded-full bg-red-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt={t("experience.imageAlt")}
                width={900}
                height={900}
                className="h-[650px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="relative container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-white/10 bg-[#151515]/90 p-10 backdrop-blur">
            <h2 className="mb-6 text-4xl font-black tracking-tight text-white md:text-5xl">
              {t("cta.title")}
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {t("cta.description")}
            </p>

            <Link
              href="/contacto"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-red-600 px-10 font-semibold text-white transition-all hover:bg-red-500"
            >
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Check, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { plansEnglish, plansSpanish } from "@/lib/plans-data";
import { useCart } from "@/lib/cart-store";
import { useLocale, useTranslations } from "next-intl";

export default function PlanesPage() {
  const { addItem } = useCart();
  const t = useTranslations("plans");

  const locale = useLocale();
  const plans = locale == "es" ? plansSpanish : plansEnglish;

  const customPlanFeatures = t.raw("customPlan.features") as string[];
  const customPlanBenefits = t.raw("customPlan.benefits") as string[];

  const handleAddToCart = (plan: (typeof plans)[0]) => {
    addItem({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      image: plan.image,
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f10] text-white">
      <Header />

      <main>
        {/* HERO */}
        <section className="border-b border-white/10 pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
                  {t("hero.badge")}
                </span>
              </div>

              <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white md:text-7xl">
                {t("hero.title")}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 md:text-lg">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3 xl:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#151516] transition-all duration-300 hover:border-red-500/30"
                >
                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden border-b border-white/10 bg-[#101011]">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-black text-white">
                          {plan.name}
                        </h2>

                        <div className="mt-3 flex items-end gap-2">
                          <span className="text-3xl font-black tracking-tight text-white">
                            MXN$
                            {plan.price.toLocaleString("es-MX", {
                              minimumFractionDigits: 2,
                            })}
                          </span>

                          <span className="pb-1 text-sm text-zinc-500">
                            {t("vat")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* FEATURES */}
                    <div className="mt-8 space-y-3">
                      {plan.features.map((feature, index) => (
                        <div
                          key={`feature-${plan.id}-${index}`}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
                            <Check className="h-3.5 w-3.5 text-red-400" />
                          </div>

                          <p className="text-sm leading-6 text-zinc-300">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(plan)}
                      className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-red-500 bg-red-500 px-6 text-sm font-bold text-white transition-all hover:bg-red-600"
                    >
                      {t("addToCart")}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* CUSTOM PLAN */}
            <div className="mt-16 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#151516]">
              <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
                {/* IMAGE */}
                <div className="relative min-h-[320px] border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r">
                  <Image
                    src="https://img.magnific.com/free-vector/ui-ux-designers-isometric-composition-with-small-people-creating-custom-design-web-site-3d-vector-illustration_1284-68939.jpg"
                    alt={t("customPlan.imageAlt")}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* CONTENT */}
                <div className="p-8 md:p-10 lg:p-12">
                  {/* BADGE */}
                  <div className="inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-red-200">
                      {t("customPlan.badge")}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 className="mt-6 text-4xl font-black tracking-tight text-white">
                    {t("customPlan.title")}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-400">
                    {t("customPlan.description")}
                  </p>

                  {/* FEATURES */}
                  <div className="mt-10">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        {t("customPlan.featuresTitle")}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {customPlanFeatures.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#101011] p-4 transition-all hover:border-red-500/20 hover:bg-[#18181a]"
                        >
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
                            <Check className="h-3.5 w-3.5 text-red-400" />
                          </div>

                          <p className="text-sm leading-6 text-zinc-300">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BENEFITS */}
                  <div className="mt-10">
                    <div className="mb-5 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                        {t("customPlan.benefitsTitle")}
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="space-y-4">
                      {customPlanBenefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#101011] p-4"
                        >
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/10">
                            <Check className="h-3.5 w-3.5 text-red-400" />
                          </div>

                          <p className="text-sm leading-6 text-zinc-300">
                            {benefit}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA TEXT */}
                  <p className="mt-10 max-w-2xl text-sm leading-7 text-zinc-500">
                    {t("customPlan.ctaText")}
                  </p>

                  {/* CTA */}
                  <div className="mt-8">
                    <Link
                      href="/contacto"
                      className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500 px-8 text-sm font-bold text-white transition-all hover:bg-red-600"
                    >
                      {t("customPlan.contact")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
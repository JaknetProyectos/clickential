"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAlert } from "@/context/AlertContext";
import { useCart } from "@/lib/cart-store";
import { useLocale, useTranslations } from "next-intl";

export default function PlanPersonalizadoPage() {
  const { addItem } = useCart();
  const { showAlert } = useAlert();
  const t = useTranslations("PlanPersonalizadoPage");
  const locale = useLocale();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    cotizacionId: "",
    monto: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const monto = Number(formData.monto);

      addItem({
        id: `Custom Plan - ${formData.nombre} - ${formData.cotizacionId}`,
        name:
          locale === "es"
            ? `Plan Personalizado #${formData.cotizacionId}`
            : `Custom Plan #${formData.cotizacionId}`,
        price: monto,
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop",
      });

      showAlert({
        type: "success",
        title: t("alerts.success.title"),
        message: t("alerts.success.message"),
        confirmText: t("alerts.success.confirmText"),
        autoClose: true,
      });

      setFormData({
        nombre: "",
        correo: "",
        cotizacionId: "",
        monto: "",
      });
    } catch {
      showAlert({
        type: "error",
        title: t("alerts.error.title"),
        message: t("alerts.error.message"),
        confirmText: t("alerts.error.confirmText"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Header />

      {/* HERO */}
      <section className="relative mt-10 overflow-hidden border-b border-red-900/30 pt-28 pb-24">
        <div className="absolute inset-0 bg-[#111111]" />

        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative container mx-auto px-4 text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            {t("hero.badge")}
          </p>

          <h1 className="mx-auto max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
            {t("hero.title")}
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-400">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="bg-[#111111] py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            {/* LEFT INFO */}
            <div className="rounded-[2.5rem] border border-zinc-800 bg-[#1a1a1a] p-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                {t("info.badge")}
              </p>

              <h2 className="mb-6 text-4xl font-black text-white">
                {t("info.title")}
              </h2>

              <p className="mb-10 leading-8 text-zinc-400">
                {t("info.description")}
              </p>

              <div className="space-y-6">
                <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {t("cards.customDevelopment.title")}
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    {t("cards.customDevelopment.description")}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {t("cards.professionalSupport.title")}
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    {t("cards.professionalSupport.description")}
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-[#111111] p-6">
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {t("cards.securePayment.title")}
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    {t("cards.securePayment.description")}
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="overflow-hidden rounded-[2.5rem] border border-zinc-800 bg-[#1a1a1a] shadow-2xl">
              {/* HEADER */}
              <div className="border-b border-zinc-800 px-8 py-10 md:px-12">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                  {t("payment.badge")}
                </p>

                <h2 className="text-4xl font-black text-white">
                  {t("payment.title")}
                </h2>
              </div>

              {/* BODY */}
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* NOMBRE */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-white">
                      {t("form.fullName.label")}
                    </label>

                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder={t("form.fullName.placeholder")}
                      className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {/* CORREO */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-white">
                      {t("form.email.label")}
                    </label>

                    <input
                      type="email"
                      name="correo"
                      required
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder={t("form.email.placeholder")}
                      className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {/* ID */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-white">
                      {t("form.quoteId.label")}
                    </label>

                    <input
                      type="text"
                      name="cotizacionId"
                      required
                      value={formData.cotizacionId}
                      onChange={handleChange}
                      placeholder={t("form.quoteId.placeholder")}
                      className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {/* MONTO */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-white">
                      {t("form.amount.label")}
                    </label>

                    <input
                      type="number"
                      name="monto"
                      required
                      min="1"
                      step="0.01"
                      value={formData.monto}
                      onChange={handleChange}
                      placeholder={t("form.amount.placeholder")}
                      className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex h-14 w-full items-center justify-center rounded-2xl bg-red-600 px-6 text-sm font-bold text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      t("form.submit")
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div className="mt-12 text-center">
            <Link
              href="/planes"
              className="text-sm font-semibold text-red-500 transition-colors hover:text-red-400"
            >
              {t("back")}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
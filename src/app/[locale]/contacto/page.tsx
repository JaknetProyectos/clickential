"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Mail,
  MapPin,
  ChevronRight,
  Send,
} from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useContact } from "@/hooks/useContact";
import { useAlert } from "@/context/AlertContext";

export default function ContactoPage() {
  const t = useTranslations("ContactPage");

  const { sendContactForm, isLoading } = useContact();
  const { showAlert } = useAlert();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await sendContactForm({
      nombre: formData.nombre,
      email: formData.email,
      mensaje: formData.mensaje,
    });

    if (result.success) {
      setFormData({
        nombre: "",
        email: "",
        mensaje: "",
      });

      showAlert({
        type: "success",
        title: t("alerts.success.title"),
        message: t("alerts.success.message"),
        confirmText: t("alerts.success.confirmText"),
        autoClose: true,
      });

      return;
    }

    showAlert({
      type: "error",
      title: t("alerts.error.title"),
      message:
        result.error || t("alerts.error.message"),
      confirmText: t("alerts.error.confirmText"),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Header />

      {/* CONTACT */}
      <section className="bg-[#111111] mt-10 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
              {t("hero.badge")}
            </p>

            <h2 className="text-4xl font-black text-white md:text-6xl">
              {t("hero.title")}
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
              {t("hero.description")}
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            {/* LEFT */}
            <div className="space-y-8">
              {/* Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Email */}
                <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1a] p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white">
                    <Mail className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {t("contact.email.title")}
                  </h3>

                  <a
                    href="mailto:sales@clickential.com.mx"
                    className="break-words text-zinc-400 transition-colors hover:text-red-400"
                  >
                    sales@clickential.com.mx
                  </a>
                </div>

                {/* Location */}
                <div className="rounded-3xl border border-zinc-800 bg-[#1a1a1a] p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#111111]">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-white">
                    {t("contact.office.title")}
                  </h3>

                  <p className="text-sm leading-7 text-zinc-400">
                    {t("contact.office.addressLine1")}
                    <br />
                    {t("contact.office.addressLine2")}
                    <br />
                    {t("contact.office.addressLine3")}
                  </p>
                </div>
              </div>

              {/* MAP */}
              <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#1a1a1a]">
                <div className="border-b border-zinc-800 p-8">
                  <h3 className="text-2xl font-bold text-white">
                    {t("location.title")}
                  </h3>
                </div>

                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <iframe
                    title={t("location.mapTitle")}
                    src="https://www.google.com/maps?q=Calle%20Rio%20Guadiana%2031,%20Int.%20203,%20Ofi.%20203-C,%20Col.%20Renacimiento,%20Alcald%C3%ADa%20Cuauhtemoc,%20Ciudad%20de%20M%C3%A9xico,%20C.P.%2006500&output=embed"
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-[2.5rem] border border-zinc-800 bg-[#1a1a1a] p-8 shadow-2xl md:p-12">
              <div className="mb-10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
                  {t("form.badge")}
                </p>

                <h3 className="text-4xl font-black text-white">
                  {t("form.title")}
                </h3>

                <p className="mt-4 max-w-lg leading-7 text-zinc-400">
                  {t("form.description")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="mb-3 block text-sm font-semibold text-white"
                    >
                      {t("form.fields.name.label")}
                    </label>

                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder={t("form.fields.name.placeholder")}
                      className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-semibold text-white"
                    >
                      {t("form.fields.email.label")}
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={t("form.fields.email.placeholder")}
                      className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#111111] px-5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-3 block text-sm font-semibold text-white"
                  >
                    {t("form.fields.message.label")}
                  </label>

                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={7}
                    placeholder={t("form.fields.message.placeholder")}
                    className="w-full resize-none rounded-2xl border border-zinc-700 bg-[#111111] px-5 py-4 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-red-600 px-8 font-semibold text-white transition-all hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      {t("form.submit")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 bg-[#0d0d0d] py-28">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-red-500">
            {t("cta.badge")}
          </p>

          <h2 className="mx-auto mb-8 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
            {t("cta.title")}
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
            {t("cta.description")}
          </p>

          <Link
            href="/personalizado"
            className="inline-flex items-center justify-center rounded-full bg-red-600 px-10 py-4 font-semibold text-white transition-all hover:bg-red-500"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
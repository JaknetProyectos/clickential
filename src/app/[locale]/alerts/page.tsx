"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useAlert } from "@/context/AlertContext";

export default function WarpZonePage() {
  const { showAlert } = useAlert();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      <section className="relative overflow-hidden pt-32 pb-24">
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <div className="absolute left-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-3xl" />

          <div className="absolute bottom-0 right-[-10%] h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          {/* HEADER */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-red-500">
              Warp Zone
            </p>

            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Sistema de Alertas
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Panel de pruebas visuales para validar
              todos los estados y layouts de tus
              alertas.
            </p>
          </div>

          {/* GRID */}
          <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-2">
            {/* SUCCESS */}
            <button
              type="button"
              onClick={() =>
                showAlert({
                  type: "success",
                  title: "Pago realizado",
                  message:
                    "Tu transacción fue procesada correctamente.",
                  confirmText: "Perfecto",
                })
              }
              className="rounded-[2rem] border border-emerald-500/20 bg-[#121212] p-8 text-left transition-all hover:-translate-y-1 hover:border-emerald-500/40"
            >
              <div className="mb-6 h-16 w-16 rounded-2xl bg-emerald-500/10" />

              <h3 className="text-2xl font-black text-white">
                Success Alert
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Alertas de confirmación y procesos
                exitosos.
              </p>
            </button>

            {/* ERROR */}
            <button
              type="button"
              onClick={() =>
                showAlert({
                  type: "error",
                  title: "Error del sistema",
                  message:
                    "Ocurrió un problema inesperado.",
                  confirmText: "Cerrar",
                })
              }
              className="rounded-[2rem] border border-red-500/20 bg-[#121212] p-8 text-left transition-all hover:-translate-y-1 hover:border-red-500/40"
            >
              <div className="mb-6 h-16 w-16 rounded-2xl bg-red-500/10" />

              <h3 className="text-2xl font-black text-white">
                Error Alert
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Estados críticos y errores de backend.
              </p>
            </button>

            {/* WARNING */}
            <button
              type="button"
              onClick={() =>
                showAlert({
                  type: "warning",
                  title: "Atención requerida",
                  message:
                    "Debes revisar los datos antes de continuar.",
                  confirmText: "Entendido",
                })
              }
              className="rounded-[2rem] border border-yellow-500/20 bg-[#121212] p-8 text-left transition-all hover:-translate-y-1 hover:border-yellow-500/40"
            >
              <div className="mb-6 h-16 w-16 rounded-2xl bg-yellow-500/10" />

              <h3 className="text-2xl font-black text-white">
                Warning Alert
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Confirmaciones y validaciones.
              </p>
            </button>

            {/* INFO */}
            <button
              type="button"
              onClick={() =>
                showAlert({
                  type: "info",
                  title: "Información",
                  message:
                    "Tu sesión se actualizará automáticamente.",
                  confirmText: "Continuar",
                })
              }
              className="rounded-[2rem] border border-blue-500/20 bg-[#121212] p-8 text-left transition-all hover:-translate-y-1 hover:border-blue-500/40"
            >
              <div className="mb-6 h-16 w-16 rounded-2xl bg-blue-500/10" />

              <h3 className="text-2xl font-black text-white">
                Info Alert
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Mensajes informativos y estados neutros.
              </p>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
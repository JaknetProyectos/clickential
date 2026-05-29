"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAlert } from "@/context/AlertContext";
import { useCart } from "@/lib/cart-store";
import { processOctanoPayment } from "@/lib/payment";
import Image from "next/image";

type CheckoutForm = {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    empresa: string;
    direccion: string;
    direccion2: string;
    ciudad: string;
    estado: string;
    pais: string;
    cp: string;
    notes: string;
    cardNumber: string;
    cardName: string;
    cardMonth: string;
    cardYear: string;
    cardCvv: string;
};

type PaymentData = {
    amount: number;
    orderId: string;
    cardData: {
        number: string;
        name: string;
        month: string;
        year: string;
        cvv: string;
    };
    customer: {
        nombre: string;
        apellido: string;
        email: string;
        telefono: string;
        direccion: string;
        direccion2?: string;
        ciudad: string;
        estado: string;
        pais?: string;
        cp: string;
        empresa?: string;
    };
    metadata?: {
        ip?: string;
        deviceId?: string;
        notes?: string;
        couponCode?: string;
        couponDiscount?: number;
    };
};

type Coupon = {
    code: string;
    discount: number;
};

const availableCoupons: Coupon[] = [
    { code: "BIENVENIDO10", discount: 10 },
    { code: "PROMO15", discount: 15 },
    { code: "VIP20", discount: 20 },
];

const mexicanStates = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Estado de México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
] as const;

export default function CheckoutPage() {
    const t = useTranslations("checkout");
    const locale = useLocale();
    const { showAlert } = useAlert();
    const { items, totalPrice, clearCart } = useCart();

    const [step, setStep] = useState<1 | 2>(1);
    const [isLoading, setIsLoading] = useState(false);
    const [orderId] = useState(() => `CK-${Date.now()}`);

    const [couponInput, setCouponInput] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

    const [formData, setFormData] = useState<CheckoutForm>({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        empresa: "",
        direccion: "",
        direccion2: "",
        ciudad: "",
        estado: "",
        pais: "MX",
        cp: "",
        notes: "",
        cardNumber: "",
        cardName: "",
        cardMonth: "",
        cardYear: "",
        cardCvv: "",
    });

    const subtotal = totalPrice;
    const discountAmount = appliedCoupon
        ? Number(((subtotal * appliedCoupon.discount) / 100).toFixed(2))
        : 0;
    const subtotalWithDiscount = Number(
        Math.max(subtotal - discountAmount, 0).toFixed(2)
    );
    const iva = Number((subtotalWithDiscount * 0.16).toFixed(2));
    const totalConIva = Number((subtotalWithDiscount + iva).toFixed(2));

    const money = (value: number) =>
        new Intl.NumberFormat(locale === "es" ? "es-MX" : "en-US", {
            style: "currency",
            currency: "MXN",
        }).format(value);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const numericFields = new Set([
            "telefono",
            "cp",
            "cardNumber",
            "cardMonth",
            "cardYear",
            "cardCvv",
        ]);

        const nextValue = numericFields.has(name)
            ? value.replace(/\D/g, "")
            : value;

        const maxLengths: Record<string, number> = {
            telefono: 10,
            cp: 5,
            cardNumber: 16,
            cardMonth: 2,
            cardYear: 4,
            cardCvv: 4,
        };

        const limitedValue =
            maxLengths[name] !== undefined
                ? nextValue.slice(0, maxLengths[name])
                : nextValue;

        setFormData((prev) => ({
            ...prev,
            [name]: limitedValue,
        }));
    };

    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCouponInput(e.target.value.toUpperCase());
    };

    const applyCoupon = () => {
        const normalized = couponInput.trim().toUpperCase();
        const found = availableCoupons.find((coupon) => coupon.code === normalized);

        if (!found) {
            setAppliedCoupon(null);
            showAlert({
                type: "warning",
                title: t("alerts.couponInvalid.title"),
                message: t("alerts.couponInvalid.message"),
                confirmText: t("alerts.couponInvalid.confirmText"),
            });
            return;
        }

        setAppliedCoupon(found);

        showAlert({
            type: "success",
            title: t("alerts.couponApplied.title"),
            message: t("alerts.couponApplied.message", { discount: found.discount }),
            confirmText: t("alerts.couponApplied.confirmText"),
            autoClose: true,
        });
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput("");
    };

    const buildDeviceId = () => {
        if (typeof window === "undefined") return undefined;

        const storageKey = "bi-desk-device-id";
        const existing = window.localStorage.getItem(storageKey);

        if (existing) return existing;

        const created =
            window.crypto?.randomUUID?.() ||
            `device-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

        window.localStorage.setItem(storageKey, created);
        return created;
    };

    const emailItems = useMemo(
        () =>
            items.map((item) => ({
                nombre: item.name,
                cantidad: item.quantity,
                precioFormateado: money(item.price * item.quantity),
            })),
        [items]
    );

    const goToPaymentStep = () => {
        if (items.length === 0) {
            showAlert({
                type: "warning",
                title: t("alerts.cartEmpty.title"),
                message: t("alerts.cartEmpty.message"),
                confirmText: t("alerts.cartEmpty.confirmText"),
            });
            return;
        }

        setStep(2);
    };

    const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (items.length === 0) {
            showAlert({
                type: "warning",
                title: t("alerts.cartEmpty.title"),
                message: t("alerts.cartEmpty.message"),
                confirmText: t("alerts.cartEmpty.confirmText"),
            });
            return;
        }

        if (
            !formData.nombre.trim() ||
            !formData.apellido.trim() ||
            !formData.email.trim() ||
            !formData.telefono.trim() ||
            !formData.direccion.trim() ||
            !formData.ciudad.trim() ||
            !formData.estado.trim() ||
            !formData.cp.trim() ||
            !formData.cardNumber.trim() ||
            !formData.cardName.trim() ||
            !formData.cardMonth.trim() ||
            !formData.cardYear.trim() ||
            !formData.cardCvv.trim()
        ) {
            showAlert({
                type: "warning",
                title: t("alerts.missingData.title"),
                message: t("alerts.missingData.message"),
                confirmText: t("alerts.missingData.confirmText"),
            });
            return;
        }

        setIsLoading(true);

        try {
            const paymentData: PaymentData = {
                amount: totalConIva,
                orderId,
                cardData: {
                    number: formData.cardNumber.replace(/\s/g, ""),
                    name: formData.cardName.trim(),
                    month: formData.cardMonth.trim(),
                    year: formData.cardYear.trim(),
                    cvv: formData.cardCvv.trim(),
                },
                customer: {
                    nombre: formData.nombre.trim(),
                    apellido: formData.apellido.trim(),
                    email: formData.email.trim(),
                    telefono: formData.telefono.trim(),
                    direccion: formData.direccion.trim(),
                    direccion2: formData.direccion2.trim() || undefined,
                    ciudad: formData.ciudad.trim(),
                    estado: formData.estado,
                    pais: formData.pais || "MX",
                    cp: formData.cp.trim(),
                    empresa: formData.empresa.trim() || undefined,
                },
                metadata: {
                    deviceId: buildDeviceId(),
                    notes: formData.notes.trim(),
                    couponCode: appliedCoupon?.code,
                    couponDiscount: appliedCoupon?.discount,
                },
            };

            const paymentResult = await processOctanoPayment(paymentData);

            if (!paymentResult.success) {
                throw new Error(
                    paymentResult.error ||
                        t("errors.paymentNotApproved")
                );
            }

            const emailResponse = await fetch(`/${locale}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: totalConIva,
                    reference: orderId,
                    customer: {
                        nombre: formData.nombre.trim(),
                        apellido: formData.apellido.trim(),
                        email: formData.email.trim(),
                        telefono: formData.telefono.trim(),
                        direccion: formData.direccion.trim(),
                        direccion2: formData.direccion2.trim() || undefined,
                        ciudad: formData.ciudad.trim(),
                        estado: formData.estado,
                        pais: formData.pais || "MX",
                        cp: formData.cp.trim(),
                        empresa: formData.empresa.trim() || undefined,
                    },
                    items: emailItems,
                    total: totalConIva,
                    metadata: {
                        notes: formData.notes.trim(),
                        deviceId: buildDeviceId(),
                        subtotal,
                        discountAmount,
                        couponCode: appliedCoupon?.code,
                        couponDiscount: appliedCoupon?.discount,
                        iva,
                        totalConIva,
                    },
                }),
            });

            if (!emailResponse.ok) {
                const errorData = await emailResponse.json().catch(() => null);
                throw new Error(
                    errorData?.error ||
                        t("errors.emailNotSent")
                );
            }

            clearCart();

            showAlert({
                type: "success",
                title: t("alerts.paymentConfirmed.title"),
                message: t("alerts.paymentConfirmed.message"),
                confirmText: t("alerts.paymentConfirmed.confirmText"),
                autoClose: true,
            });
        } catch (error) {
            showAlert({
                type: "error",
                title: t("alerts.paymentFailed.title"),
                message:
                    error instanceof Error
                        ? error.message
                        : t("alerts.paymentFailed.message"),
                confirmText: t("alerts.paymentFailed.confirmText"),
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] text-white">
            <Header />

            <main className="pt-24">
                <section className="border-b border-white/10 bg-[#131314]">
                    <div className="container mx-auto px-4 py-10">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                                    {t("pageTitle")}
                                </h1>
                                <div className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
                                    <span className={step === 1 ? "text-white" : ""}>
                                        {t("steps.cart")}
                                    </span>
                                    <span className="h-px w-8 bg-white/15" />
                                    <span className={step === 2 ? "text-white" : ""}>
                                        {t("steps.payment")}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-red-500/30 hover:text-white"
                            >
                                {step === 2 ? t("back") : t("stepOne")}
                            </button>
                        </div>
                    </div>
                </section>

                <section className="pb-24 pt-10">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
                            <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#151516] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                                {step === 1 ? (
                                    <>
                                        <div className="border-b border-white/10 p-8 md:p-10">
                                            <h2 className="text-3xl font-black tracking-tight">
                                                {t("cartTitle")}
                                            </h2>
                                        </div>

                                        <div className="p-8 md:p-10">
                                            <div className="space-y-4">
                                                {items.length === 0 ? (
                                                    <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-zinc-500">
                                                        {t("emptyCart")}
                                                    </div>
                                                ) : (
                                                    items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-center gap-4 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4"
                                                        >
                                                            <div className="relative h-18 w-18 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b]">
                                                                <Image
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    width={60}
                                                                    height={60}
                                                                    className="object-cover"
                                                                />
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate font-bold text-white">
                                                                    {item.name}
                                                                </p>
                                                                <p className="mt-1 text-sm text-zinc-400">
                                                                    {t("quantity", {quantity: item.quantity,})}
                                                                </p>
                                                            </div>

                                                            <div className="text-right">
                                                                <p className="text-base font-bold text-white">
                                                                    {money(item.price * item.quantity)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>

                                            <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#111111] p-6">
                                                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                                                    <input
                                                        type="text"
                                                        value={couponInput}
                                                        onChange={handleCouponChange}
                                                        placeholder={t("couponPlaceholder")}
                                                        className="h-14 rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={applyCoupon}
                                                        className="h-14 rounded-2xl bg-red-500 px-5 font-bold text-white transition-colors hover:bg-red-600"
                                                    >
                                                        {t("applyCoupon")}
                                                    </button>
                                                </div>

                                                {appliedCoupon && (
                                                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                                                        <div>
                                                            <p className="text-sm font-semibold text-white">
                                                                {appliedCoupon.code}
                                                            </p>
                                                            <p className="text-xs text-red-200">
                                                                {t("couponDiscount", {
                                                                    discount: appliedCoupon.discount,
                                                                })}
                                                            </p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={removeCoupon}
                                                            className="text-sm font-semibold text-zinc-300 hover:text-white"
                                                        >
                                                            {t("removeCoupon")}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={goToPaymentStep}
                                                disabled={items.length === 0}
                                                className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-red-500 px-6 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                            >
                                                {t("continueToPayment")}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="border-b border-white/10 p-8 md:p-10">
                                            <h2 className="text-3xl font-black tracking-tight">
                                                {t("paymentDetailsTitle")}
                                            </h2>
                                        </div>

                                        <div className="p-8 md:p-10">
                                            <form onSubmit={handlePayment} className="space-y-8">
                                                <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2 md:p-6">
                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.nombre")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="nombre"
                                                            value={formData.nombre}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.apellido")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="apellido"
                                                            value={formData.apellido}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.email")}
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.telefono")}
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            name="telefono"
                                                            value={formData.telefono}
                                                            onChange={handleChange}
                                                            required
                                                            inputMode="numeric"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.empresa")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="empresa"
                                                            value={formData.empresa}
                                                            onChange={handleChange}
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2 md:p-6">
                                                    <div className="md:col-span-2">
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.direccion")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="direccion"
                                                            value={formData.direccion}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.direccion2")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="direccion2"
                                                            value={formData.direccion2}
                                                            onChange={handleChange}
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.ciudad")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="ciudad"
                                                            value={formData.ciudad}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.estado")}
                                                        </label>
                                                        <select
                                                            name="estado"
                                                            value={formData.estado}
                                                            onChange={handleChange}
                                                            required
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        >
                                                            <option value="">
                                                                {t("select")}
                                                            </option>
                                                            {mexicanStates.map((state) => (
                                                                <option key={state} value={state}>
                                                                    {state}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.pais")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="pais"
                                                            value={formData.pais}
                                                            onChange={handleChange}
                                                            readOnly
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#171718] px-4 text-zinc-300 outline-none"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.cp")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cp"
                                                            value={formData.cp}
                                                            onChange={handleChange}
                                                            required
                                                            inputMode="numeric"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.notes")}
                                                        </label>
                                                        <textarea
                                                            name="notes"
                                                            value={formData.notes}
                                                            onChange={handleChange}
                                                            rows={3}
                                                            className="w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid gap-5 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 md:grid-cols-2 md:p-6">
                                                    <div className="md:col-span-2">
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.cardNumber")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardNumber"
                                                            value={formData.cardNumber}
                                                            onChange={handleChange}
                                                            required
                                                            maxLength={16}
                                                            inputMode="numeric"
                                                            autoComplete="cc-number"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.cardName")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardName"
                                                            value={formData.cardName}
                                                            onChange={handleChange}
                                                            required
                                                            autoComplete="cc-name"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.cardMonth")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardMonth"
                                                            value={formData.cardMonth}
                                                            onChange={handleChange}
                                                            required
                                                            maxLength={2}
                                                            inputMode="numeric"
                                                            autoComplete="cc-exp-month"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.cardYear")}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="cardYear"
                                                            value={formData.cardYear}
                                                            onChange={handleChange}
                                                            required
                                                            maxLength={4}
                                                            inputMode="numeric"
                                                            autoComplete="cc-exp-year"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="mb-2 block text-sm font-semibold text-zinc-200">
                                                            {t("fields.cardCvv")}
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="cardCvv"
                                                            value={formData.cardCvv}
                                                            onChange={handleChange}
                                                            required
                                                            maxLength={4}
                                                            inputMode="numeric"
                                                            autoComplete="cc-csc"
                                                            className="h-14 w-full rounded-2xl border border-white/10 bg-[#0f0f10] px-4 text-white outline-none placeholder:text-zinc-600 focus:border-red-500/40 focus:ring-4 focus:ring-red-500/10"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => setStep(1)}
                                                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-red-500/30 hover:text-white"
                                                    >
                                                        {t("back")}
                                                    </button>

                                                    <button
                                                        type="submit"
                                                        disabled={isLoading || items.length === 0}
                                                        className="flex h-14 items-center justify-center rounded-2xl bg-red-500 px-6 text-sm font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        {isLoading ? (
                                                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                        ) : (
                                                            t("pay")
                                                        )}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                )}
                            </div>

                            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
                                <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#151516] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
                                    <div className="border-b border-white/10 p-8">
                                        <h2 className="text-2xl font-black tracking-tight text-white">
                                            {t("summaryTitle")}
                                        </h2>
                                    </div>

                                    <div className="p-6">
                                        <div className="space-y-4">
                                            {items.length === 0 ? (
                                                <div className="rounded-[1.8rem] border border-dashed border-white/10 bg-white/[0.03] p-8 text-center text-sm text-zinc-500">
                                                    {t("emptyCart")}
                                                </div>
                                            ) : (
                                                items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-4 rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-4"
                                                    >
                                                        <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-[#1b1b1b]">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>

                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate font-bold text-white">
                                                                {item.name}
                                                            </p>
                                                            <p className="mt-1 text-sm text-zinc-400">
                                                                {t("quantity", {
                                                                    quantity: item.quantity,
                                                                })}
                                                            </p>
                                                        </div>

                                                        <div className="text-right">
                                                            <p className="text-base font-bold text-white">
                                                                {money(item.price * item.quantity)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        <div className="mt-8 rounded-[2rem] border border-white/10 bg-[#111111] p-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-zinc-400">
                                                    {t("subtotal")}
                                                </span>
                                                <span className="text-sm font-semibold text-white">
                                                    {money(subtotal)}
                                                </span>
                                            </div>

                                            {appliedCoupon && (
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span className="text-sm text-zinc-400">
                                                        {t("couponLine", {
                                                            code: appliedCoupon.code,
                                                        })}
                                                    </span>
                                                    <span className="text-sm font-semibold text-red-300">
                                                        -{money(discountAmount)}
                                                    </span>
                                                </div>
                                            )}

                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-sm text-zinc-400">
                                                    {t("iva")}
                                                </span>
                                                <span className="text-sm font-semibold text-white">
                                                    {money(iva)}
                                                </span>
                                            </div>

                                            <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
                                                <div>
                                                    <p className="text-sm text-zinc-500">
                                                        {t("total")}
                                                    </p>
                                                    <p className="mt-1 text-xs text-zinc-600">
                                                        {t("taxesIncluded")}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-3xl font-black tracking-tight text-white">
                                                        {money(totalConIva)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-row justify-between py-6">
                                                <Image
                                                    src={"/secure-payment.png"}
                                                    width={120}
                                                    height={30}
                                                    alt={t("logoAlt")}
                                                />
                                                <Image
                                                    src={"/octano.png"}
                                                    width={180}
                                                    height={10}
                                                    alt={t("logoAlt")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Link
                                        href="/planes"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-zinc-300 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
                                    >
                                        {t("backToPlans")}
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
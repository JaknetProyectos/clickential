# Forma de hacer los pagos
"use server";

import axios from "axios";

interface PaymentData {
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
  };
}

const OCTANO_BASE_URL =
  "https://pagos.octanopayments.com/api/v1";

export async function processOctanoPayment(
  payment: PaymentData
) {
  try {
    /*
    |--------------------------------------------------------------------------
    | Auth
    |--------------------------------------------------------------------------
    */

    const authResponse = await axios.post(
      `${OCTANO_BASE_URL}/signin`,
      {
        email: process.env.OCTANO_USER,
        password: process.env.OCTANO_PASSWORD,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );

    const authToken =
      authResponse.data?.authToken;

    if (!authToken) {
      throw new Error(
        "No se pudo obtener el token de Octano."
      );
    }

    const config = {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    /*
    |--------------------------------------------------------------------------
    | Card tokenization
    |--------------------------------------------------------------------------
    */

    const tokenResponse = await axios.post(
      `${OCTANO_BASE_URL}/card/tokenizer`,
      {
        cardData: {
          cardNumber:
            payment.cardData.number.replace(/\s/g, ""),

          cardholderName:
            payment.cardData.name,

          expirationYear:
            payment.cardData.year,

          expirationMonth:
            payment.cardData.month,
        },
      },
      config
    );

    const cardToken =
      tokenResponse.data?.cardNumberToken;

    if (!cardToken) {
      throw new Error(
        "No se pudo tokenizar la tarjeta."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Customer info
    |--------------------------------------------------------------------------
    */

    const customerFirstName =
      payment.customer.nombre?.trim() || "N/A";

    const customerLastName =
      payment.customer.apellido?.trim() || "N/A";

    /*
    |--------------------------------------------------------------------------
    | Sale request
    |--------------------------------------------------------------------------
    */

    const salePayload = {
      amount: Number(payment.amount),

      currency: "484",

      reference: payment.orderId,

      customerInformation: {
        firstName: customerFirstName,

        lastName: customerLastName,

        email: payment.customer.email,

        phone1: payment.customer.telefono,

        address1: payment.customer.direccion,

        address2:
          payment.customer.direccion2 || "",

        city: payment.customer.ciudad,

        state: payment.customer.estado,

        postalCode: payment.customer.cp,

        country:
          payment.customer.pais || "MX",

        company:
          payment.customer.empresa || "",

        ip:
          payment.metadata?.ip ||
          "127.0.0.1",
      },

      cardData: {
        cardNumberToken: cardToken,

        cvv: payment.cardData.cvv,
      },
    };

    const saleResponse = await axios.post(
      `${OCTANO_BASE_URL}/sale`,
      salePayload,
      config
    );

    return {
      success: true,
      data: saleResponse.data,
    };
  } catch (error: any) {
    const errorDetail =
      error?.response?.data ||
      error?.message;

    console.error(
      "❌ Error en pasarela Octano:",
      errorDetail
    );

    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Hubo un problema al procesar la transacción.",
      details: errorDetail,
    };
  }
}

# Cart Context
"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("clickential-cart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading cart", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("clickential-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

# Objetivo
Crear la página de checkout de forma profesional, y debe cumplir los siguientes criterios.

1. Debe incluir todos los campos requeridos por octano, sería genial un selector de estado en méxico. Quita los campos de segundo nombre (middlename). Icluye la metadata notes. 
2. La llamada al plugin de octano se debe hacer en el handlePayment, no en una ruta extraña, no en el servidor, se hace en el propio componente. Luego de que la plataforma acepte el pago, se envía un correo únicamente de confirmación a la ruta /locale/api/checkout sólo se envía la confirmación no se procesa el pago ahí. Esta es una parte del email.
3. Quiero que se sume el IVA 16% al monto total.
4. No omitas ningún campo de los detalles de pago.
5. El cartcontexttype es todo lo que necesitas, no le cambies el nombre a las propiedades que ya la has cagado con eso, lo mismo par alos métodos del cart, no inventes nuevos.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      reference,
      customer,
      items,
      total,
    } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Monto inválido" },
        { status: 400 }
      );
    }

    if (!customer?.email) {
      return NextResponse.json(
        { error: "Correo del cliente requerido" },
        { status: 400 }
      );
    }

    const customerName = customer.nombre;

    const itemsHtml = (items ?? [])
      .map(
        (item: any) => `
          <tr>
            <td style="padding:18px 0;border-bottom:1px solid #f3e8ff;">
              <div>
                <p style="
                  margin:0;
                  color:#2e1065;
                  font-size:15px;
                  font-weight:700;
                ">
                  ${item.nombre}
                </p>

                <p style="
                  margin:6px 0 0;
                  color:#8b5cf6;
                  font-size:12px;
                ">
                  Servicio digital
                </p>
              </div>
            </td>

            <td style="
              padding:18px 0;
              border-bottom:1px solid #f3e8ff;
              text-align:center;
              color:#6b7280;
              font-size:14px;
              font-weight:600;
            ">
              ${item.cantidad ?? 1}
            </td>

            <td style="
              padding:18px 0;
              border-bottom:1px solid #f3e8ff;
              text-align:right;
              color:#581c87;
              font-size:15px;
              font-weight:800;
            ">
              ${item.precioFormateado}
            </td>
          </tr>
        `
      )
      .join("");

QUiero el componente completo y funcional, no quiero errores, no quiero que te saltes mis indicaciones y hagas las cosas a "tu modo".
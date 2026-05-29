import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      amount,
      reference,
      customer,
      items,
      total,
      metadata,
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
    const customerFullName = `${customer.nombre ?? ""} ${customer.apellido ?? ""}`.trim();
    const notes = metadata?.notes || "";

    const itemsHtml = (items ?? [])
      .map(
        (item: any) => `
          <tr>
            <td style="padding:18px 0;border-bottom:1px solid #2a2a2a;">
              <div>
                <p style="
                  margin:0;
                  color:#ffffff;
                  font-size:15px;
                  font-weight:700;
                  line-height:1.4;
                ">
                  ${item.nombre}
                </p>

                <p style="
                  margin:6px 0 0;
                  color:#f87171;
                  font-size:12px;
                  font-weight:600;
                  letter-spacing:.08em;
                  text-transform:uppercase;
                ">
                  Servicio digital
                </p>
              </div>
            </td>

            <td style="
              padding:18px 0;
              border-bottom:1px solid #2a2a2a;
              text-align:center;
              color:#d4d4d8;
              font-size:14px;
              font-weight:700;
            ">
              ${item.cantidad ?? 1}
            </td>

            <td style="
              padding:18px 0;
              border-bottom:1px solid #2a2a2a;
              text-align:right;
              color:#ffffff;
              font-size:15px;
              font-weight:900;
            ">
              ${item.precioFormateado}
            </td>
          </tr>
        `
      )
      .join("");

    /**
     * CLIENT EMAIL
     */
    await resend.emails.send({
      from: "Click Ential <contacto@innovacodigo.com>",
      to: [customer.email],
      subject: `Confirmación de compra ${reference} | Click Ential`,
      html: `
        <div style="
          margin:0;
          padding:40px 16px;
          background:#0f0f10;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="max-width:760px;margin:0 auto;">

            <!-- BRAND -->
            <div style="text-align:center;margin-bottom:18px;">
              <div style="
                display:inline-flex;
                align-items:center;
                justify-content:center;
                width:72px;
                height:72px;
                border-radius:22px;
                background:#151516;
                border:1px solid rgba(239,68,68,.25);
                box-shadow:0 18px 50px rgba(0,0,0,.35);
                margin-bottom:14px;
              ">
                <div style="
                  width:24px;
                  height:24px;
                  border-radius:999px;
                  border:4px solid #ef4444;
                  border-top-color:#ffffff;
                  box-sizing:border-box;
                "></div>
              </div>

              <p style="
                margin:0;
                color:#f87171;
                font-size:12px;
                font-weight:800;
                letter-spacing:.28em;
                text-transform:uppercase;
              ">
                Click Ential
              </p>
            </div>

            <!-- CARD -->
            <div style="
              background:#151516;
              border-radius:40px;
              overflow:hidden;
              border:1px solid #27272a;
              box-shadow:0 30px 80px rgba(0,0,0,.45);
            ">

              <!-- HERO -->
              <div style="
                padding:52px 42px 78px;
                color:#ffffff;
                background:#111111;
                border-bottom:1px solid #27272a;
                position:relative;
                overflow:hidden;
              ">
                <div style="
                  position:absolute;
                  top:-120px;
                  right:-80px;
                  width:260px;
                  height:260px;
                  border-radius:999px;
                  background:rgba(239,68,68,.12);
                "></div>

                <div style="
                  position:absolute;
                  bottom:-120px;
                  left:-80px;
                  width:260px;
                  height:260px;
                  border-radius:999px;
                  background:rgba(255,255,255,.04);
                "></div>

                <div style="
                  position:relative;
                  z-index:2;
                ">
                  <p style="
                    margin:0 0 16px;
                    color:#f87171;
                    font-size:12px;
                    font-weight:800;
                    letter-spacing:.22em;
                    text-transform:uppercase;
                  ">
                    Compra confirmada
                  </p>

                  <h1 style="
                    margin:0;
                    font-size:44px;
                    line-height:1.02;
                    font-weight:900;
                    max-width:520px;
                    color:#ffffff;
                  ">
                    Gracias por tu compra
                  </h1>

                  <p style="
                    margin:20px 0 0;
                    font-size:17px;
                    line-height:1.8;
                    max-width:560px;
                    color:#d4d4d8;
                  ">
                    Tu pago fue aprobado correctamente y ya iniciamos la preparación de tu servicio.
                  </p>
                </div>
              </div>

              <!-- SUMMARY -->
              <div style="
                margin:-42px 24px 0;
                background:#111111;
                border-radius:28px;
                border:1px solid #2a2a2a;
                box-shadow:0 16px 40px rgba(0,0,0,.25);
                position:relative;
                z-index:10;
              ">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:24px 26px;border-right:1px solid #2a2a2a;">
                      <p style="
                        margin:0 0 8px;
                        color:#f87171;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Referencia
                      </p>

                      <p style="
                        margin:0;
                        color:#ffffff;
                        font-size:18px;
                        font-weight:900;
                        word-break:break-word;
                      ">
                        ${reference}
                      </p>
                    </td>

                    <td style="padding:24px 26px;">
                      <p style="
                        margin:0 0 8px;
                        color:#f87171;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Total pagado
                      </p>

                      <p style="
                        margin:0;
                        color:#ffffff;
                        font-size:34px;
                        line-height:1;
                        font-weight:900;
                      ">
                        ${total}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- BODY -->
              <div style="padding:34px 34px 40px;">

                <!-- CUSTOMER -->
                <div style="
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:28px;
                  padding:28px;
                  margin-bottom:26px;
                ">
                  <p style="
                    margin:0 0 8px;
                    color:#f87171;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.18em;
                    text-transform:uppercase;
                  ">
                    Cliente
                  </p>

                  <h2 style="
                    margin:0 0 18px;
                    color:#ffffff;
                    font-size:28px;
                    font-weight:900;
                    line-height:1.1;
                  ">
                    ${customerFullName || customerName}
                  </h2>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:0 0 10px;color:#9ca3af;font-size:14px;">Correo</td>
                      <td style="padding:0 0 10px;color:#ffffff;font-size:14px;font-weight:700;text-align:right;">${customer.email}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 10px;color:#9ca3af;font-size:14px;">Teléfono</td>
                      <td style="padding:0 0 10px;color:#ffffff;font-size:14px;font-weight:700;text-align:right;">${customer.telefono ?? ""}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 10px;color:#9ca3af;font-size:14px;">Ciudad</td>
                      <td style="padding:0 0 10px;color:#ffffff;font-size:14px;font-weight:700;text-align:right;">${customer.ciudad ?? ""}</td>
                    </tr>
                    <tr>
                      <td style="padding:0;color:#9ca3af;font-size:14px;">Estado</td>
                      <td style="padding:0;color:#ffffff;font-size:14px;font-weight:700;text-align:right;">${customer.estado ?? ""}</td>
                    </tr>
                  </table>
                </div>

                <!-- ADDRESS -->
                <div style="
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:28px;
                  padding:28px;
                  margin-bottom:26px;
                ">
                  <p style="
                    margin:0 0 8px;
                    color:#f87171;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.18em;
                    text-transform:uppercase;
                  ">
                    Dirección
                  </p>

                  <p style="
                    margin:0;
                    color:#ffffff;
                    font-size:15px;
                    line-height:1.9;
                    font-weight:600;
                  ">
                    ${customer.direccion ?? ""}${customer.direccion2 ? `<br>${customer.direccion2}` : ""}<br>
                    ${customer.cp ?? ""} · ${customer.ciudad ?? ""} · ${customer.estado ?? ""} · ${customer.pais ?? "MX"}
                  </p>
                </div>

                <!-- ITEMS -->
                <div style="
                  border:1px solid #2a2a2a;
                  border-radius:30px;
                  padding:28px;
                  background:#111111;
                ">
                  <div style="margin-bottom:22px;">
                    <p style="
                      margin:0 0 8px;
                      color:#f87171;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Resumen
                    </p>

                    <h3 style="
                      margin:0;
                      color:#ffffff;
                      font-size:26px;
                      font-weight:900;
                    ">
                      Servicios adquiridos
                    </h3>
                  </div>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <thead>
                      <tr>
                        <th align="left" style="
                          padding-bottom:14px;
                          color:#f87171;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:.18em;
                        ">
                          Servicio
                        </th>

                        <th align="center" style="
                          padding-bottom:14px;
                          color:#f87171;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:.18em;
                        ">
                          Cant.
                        </th>

                        <th align="right" style="
                          padding-bottom:14px;
                          color:#f87171;
                          font-size:11px;
                          text-transform:uppercase;
                          letter-spacing:.18em;
                        ">
                          Precio
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      ${itemsHtml}
                    </tbody>
                  </table>
                </div>

                ${notes ? `
                  <div style="
                    margin-top:26px;
                    background:#111111;
                    border:1px solid #2a2a2a;
                    border-radius:28px;
                    padding:28px;
                  ">
                    <p style="
                      margin:0 0 8px;
                      color:#f87171;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Notes
                    </p>

                    <p style="
                      margin:0;
                      color:#d4d4d8;
                      font-size:15px;
                      line-height:1.9;
                    ">
                      ${notes}
                    </p>
                  </div>
                ` : ""}

                <!-- CTA -->
                <div style="
                  margin-top:26px;
                  background:#1a1a1a;
                  border:1px solid #2a2a2a;
                  border-radius:28px;
                  padding:28px;
                ">
                  <h3 style="
                    margin:0 0 14px;
                    color:#ffffff;
                    font-size:22px;
                    font-weight:900;
                  ">
                    ¿Qué sigue ahora?
                  </h3>

                  <p style="
                    margin:0;
                    color:#d4d4d8;
                    font-size:15px;
                    line-height:1.9;
                  ">
                    Nuestro equipo revisará tu pedido y comenzará el proceso.
                    Si necesitas agregar información adicional, puedes responder
                    directamente a este correo.
                  </p>
                </div>

              </div>

              <!-- FOOTER -->
              <div style="
                padding:28px 34px;
                background:#111111;
                border-top:1px solid #2a2a2a;
                text-align:center;
              ">
                <p style="
                  margin:0 0 10px;
                  color:#ffffff;
                  font-size:14px;
                  font-weight:800;
                  letter-spacing:.08em;
                ">
                  Click Ential
                </p>

                <p style="
                  margin:0;
                  color:#9ca3af;
                  font-size:12px;
                  line-height:1.8;
                ">
                  Automatizaciones, dashboards y desarrollo inteligente para empresas modernas.
                </p>
              </div>

            </div>
          </div>
        </div>
      `,
    });

    /**
     * BUSINESS EMAIL
     */
    await resend.emails.send({
      from: "Click Ential <contacto@innovacodigo.com>",
      to: ["contacto@innovacodigo.com"],
      subject: `Nuevo pedido ${reference} | Click Ential`,
      html: `
        <div style="
          margin:0;
          padding:40px 16px;
          background:#0f0f10;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:820px;
            margin:0 auto;
            background:#151516;
            border-radius:40px;
            overflow:hidden;
            border:1px solid #27272a;
            box-shadow:0 30px 80px rgba(0,0,0,.45);
          ">

            <!-- HEADER -->
            <div style="
              padding:44px 40px;
              background:#111111;
              border-bottom:1px solid #27272a;
              position:relative;
              overflow:hidden;
            ">
              <div style="
                position:absolute;
                top:-100px;
                right:-70px;
                width:240px;
                height:240px;
                border-radius:999px;
                background:rgba(239,68,68,.12);
              "></div>

              <div style="
                position:absolute;
                bottom:-100px;
                left:-70px;
                width:240px;
                height:240px;
                border-radius:999px;
                background:rgba(255,255,255,.04);
              "></div>

              <div style="position:relative;z-index:2;">
                <p style="
                  margin:0 0 12px;
                  color:#f87171;
                  font-size:12px;
                  font-weight:800;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                ">
                  Nuevo checkout recibido
                </p>

                <h1 style="
                  margin:0;
                  color:#ffffff;
                  font-size:36px;
                  font-weight:900;
                  line-height:1.05;
                ">
                  ${reference}
                </h1>
              </div>
            </div>

            <!-- BODY -->
            <div style="padding:36px 40px;">

              <!-- SUMMARY GRID -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:26px;">
                <tr>
                  <td style="vertical-align:top;padding-right:10px;width:50%;">
                    <div style="
                      background:#111111;
                      border:1px solid #2a2a2a;
                      border-radius:28px;
                      padding:24px;
                      height:100%;
                    ">
                      <p style="
                        margin:0 0 8px;
                        color:#f87171;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Cliente
                      </p>

                      <h2 style="
                        margin:0 0 18px;
                        color:#ffffff;
                        font-size:28px;
                        font-weight:900;
                        line-height:1.1;
                      ">
                        ${customerFullName || customerName}
                      </h2>

                      <p style="margin:0 0 10px;color:#d4d4d8;font-size:14px;line-height:1.8;">
                        <strong style="color:#ffffff;">Correo:</strong> ${customer.email}
                      </p>

                      <p style="margin:0 0 10px;color:#d4d4d8;font-size:14px;line-height:1.8;">
                        <strong style="color:#ffffff;">Teléfono:</strong> ${customer.telefono ?? ""}
                      </p>

                      <p style="margin:0;color:#d4d4d8;font-size:14px;line-height:1.8;">
                        <strong style="color:#ffffff;">Estado:</strong> ${customer.estado ?? ""}
                      </p>
                    </div>
                  </td>

                  <td style="vertical-align:top;padding-left:10px;width:50%;">
                    <div style="
                      background:#111111;
                      border:1px solid #2a2a2a;
                      border-radius:28px;
                      padding:24px;
                      height:100%;
                    ">
                      <p style="
                        margin:0 0 8px;
                        color:#f87171;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Total
                      </p>

                      <p style="
                        margin:0 0 18px;
                        color:#ffffff;
                        font-size:34px;
                        line-height:1;
                        font-weight:900;
                      ">
                        ${total}
                      </p>

                      <p style="
                        margin:0 0 8px;
                        color:#9ca3af;
                        font-size:14px;
                      ">
                        Referencia
                      </p>

                      <p style="
                        margin:0;
                        color:#ffffff;
                        font-size:15px;
                        font-weight:700;
                        word-break:break-word;
                      ">
                        ${reference}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- ADDRESS -->
              <div style="
                background:#111111;
                border:1px solid #2a2a2a;
                border-radius:28px;
                padding:28px;
                margin-bottom:26px;
              ">
                <p style="
                  margin:0 0 10px;
                  color:#f87171;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:.18em;
                  text-transform:uppercase;
                ">
                  Dirección
                </p>

                <p style="
                  margin:0;
                  color:#ffffff;
                  font-size:15px;
                  line-height:1.9;
                  font-weight:600;
                ">
                  ${customer.direccion ?? ""}${customer.direccion2 ? `<br>${customer.direccion2}` : ""}<br>
                  ${customer.cp ?? ""} · ${customer.ciudad ?? ""} · ${customer.estado ?? ""} · ${customer.pais ?? "MX"}
                </p>
              </div>

              <!-- ITEMS -->
              <div style="
                border:1px solid #2a2a2a;
                border-radius:30px;
                padding:28px;
                background:#111111;
              ">
                <div style="margin-bottom:22px;">
                  <p style="
                    margin:0 0 8px;
                    color:#f87171;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.18em;
                    text-transform:uppercase;
                  ">
                    Resumen
                  </p>

                  <h3 style="
                    margin:0;
                    color:#ffffff;
                    font-size:26px;
                    font-weight:900;
                  ">
                    Servicios adquiridos
                  </h3>
                </div>

                <table width="100%" cellpadding="0" cellspacing="0">
                  <thead>
                    <tr>
                      <th align="left" style="
                        padding-bottom:14px;
                        color:#f87171;
                        font-size:11px;
                        text-transform:uppercase;
                        letter-spacing:.18em;
                      ">
                        Servicio
                      </th>

                      <th align="center" style="
                        padding-bottom:14px;
                        color:#f87171;
                        font-size:11px;
                        text-transform:uppercase;
                        letter-spacing:.18em;
                      ">
                        Cant.
                      </th>

                      <th align="right" style="
                        padding-bottom:14px;
                        color:#f87171;
                        font-size:11px;
                        text-transform:uppercase;
                        letter-spacing:.18em;
                      ">
                        Precio
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
              </div>

              ${
                notes
                  ? `
                <div style="
                  margin-top:26px;
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:28px;
                  padding:28px;
                ">
                  <p style="
                    margin:0 0 8px;
                    color:#f87171;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.18em;
                    text-transform:uppercase;
                  ">
                    Notes
                  </p>

                  <p style="
                    margin:0;
                    color:#d4d4d8;
                    font-size:15px;
                    line-height:1.9;
                  ">
                    ${notes}
                  </p>
                </div>
              `
                  : ""
              }

            </div>

            <!-- FOOTER -->
            <div style="
              padding:26px 40px;
              background:#111111;
              border-top:1px solid #2a2a2a;
              text-align:center;
            ">
              <p style="
                margin:0 0 8px;
                color:#ffffff;
                font-size:14px;
                font-weight:800;
                letter-spacing:.08em;
              ">
                Click Ential
              </p>

              <p style="
                margin:0;
                color:#9ca3af;
                font-size:12px;
                line-height:1.8;
              ">
                Automatizaciones, dashboards y desarrollo inteligente para empresas modernas.
              </p>
            </div>

          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Emails enviados correctamente",
    });
  } catch (error) {
    console.error("CHECKOUT EMAIL ERROR:", error);

    return NextResponse.json(
      {
        error: "Error al enviar los emails",
      },
      {
        status: 500,
      }
    );
  }
}
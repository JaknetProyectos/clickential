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
          <div style="
            border:1px solid #2a2a2a;
            border-radius:24px;
            background:#111111;
            margin:0 0 14px;
            overflow:hidden;
          ">
            <div style="
              padding:18px 18px 14px;
              border-bottom:1px solid #2a2a2a;
            ">
              <p style="
                margin:0;
                color:#ffffff;
                font-size:15px;
                line-height:1.5;
                font-weight:800;
                word-break:break-word;
              ">
                ${item.nombre}
              </p>

              <p style="
                margin:8px 0 0;
                color:#f87171;
                font-size:11px;
                line-height:1.4;
                font-weight:800;
                letter-spacing:.16em;
                text-transform:uppercase;
              ">
                Servicio digital
              </p>
            </div>

            <table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
              <tr>
                <td style="
                  width:33.33%;
                  padding:14px 18px;
                  border-right:1px solid #2a2a2a;
                  vertical-align:top;
                ">
                  <p style="
                    margin:0 0 6px;
                    color:#9ca3af;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.14em;
                    text-transform:uppercase;
                  ">
                    Cantidad
                  </p>

                  <p style="
                    margin:0;
                    color:#ffffff;
                    font-size:15px;
                    font-weight:800;
                    word-break:break-word;
                  ">
                    ${item.cantidad ?? 1}
                  </p>
                </td>

                <td style="
                  width:66.67%;
                  padding:14px 18px;
                  vertical-align:top;
                ">
                  <p style="
                    margin:0 0 6px;
                    color:#9ca3af;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.14em;
                    text-transform:uppercase;
                  ">
                    Precio
                  </p>

                  <p style="
                    margin:0;
                    color:#ffffff;
                    font-size:15px;
                    font-weight:900;
                    word-break:break-word;
                  ">
                    ${item.precioFormateado}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        `
      )
      .join("");

    /**
     * CLIENT EMAIL
     */
    await resend.emails.send({
      from: "Click Ential <sales@clickential.com.mx>",
      to: [customer.email],
      subject: `Confirmación de compra ${reference} | Click Ential`,
      html: `
        <div style="
          margin:0;
          padding:28px 14px;
          background:#0f0f10;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:760px;
            margin:0 auto;
          ">

            <!-- BRAND -->
            <div style="
              text-align:center;
              margin:0 0 16px;
            ">
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

            <!-- MAIN CARD -->
            <div style="
              background:#151516;
              border-radius:34px;
              overflow:hidden;
              border:1px solid #27272a;
              box-shadow:0 30px 80px rgba(0,0,0,.45);
            ">

              <!-- HERO -->
              <div style="
                padding:42px 24px 56px;
                color:#ffffff;
                background:#111111;
                border-bottom:1px solid #27272a;
                position:relative;
                overflow:hidden;
              ">
                <div style="
                  position:absolute;
                  top:-110px;
                  right:-70px;
                  width:220px;
                  height:220px;
                  border-radius:999px;
                  background:rgba(239,68,68,.12);
                "></div>

                <div style="
                  position:absolute;
                  bottom:-120px;
                  left:-70px;
                  width:220px;
                  height:220px;
                  border-radius:999px;
                  background:rgba(255,255,255,.04);
                "></div>

                <div style="position:relative;z-index:2;">
                  <p style="
                    margin:0 0 14px;
                    color:#f87171;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.22em;
                    text-transform:uppercase;
                  ">
                    Compra confirmada
                  </p>

                  <h1 style="
                    margin:0;
                    font-size:34px;
                    line-height:1.08;
                    font-weight:900;
                    max-width:520px;
                    color:#ffffff;
                  ">
                    Gracias por tu compra
                  </h1>

                  <p style="
                    margin:18px 0 0;
                    font-size:16px;
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
                margin:-28px 14px 0;
                background:#111111;
                border-radius:26px;
                border:1px solid #2a2a2a;
                box-shadow:0 16px 40px rgba(0,0,0,.25);
                position:relative;
                z-index:10;
              ">
                <table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
                  <tr>
                    <td style="
                      width:50%;
                      padding:18px 16px;
                      border-right:1px solid #2a2a2a;
                      vertical-align:top;
                    ">
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
                        font-size:15px;
                        font-weight:900;
                        word-break:break-word;
                        line-height:1.4;
                      ">
                        ${reference}
                      </p>
                    </td>

                    <td style="
                      width:50%;
                      padding:18px 16px;
                      vertical-align:top;
                    ">
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
                        font-size:28px;
                        line-height:1.1;
                        font-weight:900;
                        word-break:break-word;
                      ">
                        ${total}
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- BODY -->
              <div style="padding:24px 14px 28px;">

                <!-- CUSTOMER -->
                <div style="
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:26px;
                  padding:22px 18px;
                  margin-bottom:18px;
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
                    margin:0 0 16px;
                    color:#ffffff;
                    font-size:24px;
                    font-weight:900;
                    line-height:1.15;
                    word-break:break-word;
                  ">
                    ${customerFullName || customerName}
                  </h2>

                  <table width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;">
                    <tr>
                      <td style="padding:0 0 10px;color:#9ca3af;font-size:13px;width:34%;vertical-align:top;">Correo</td>
                      <td style="padding:0 0 10px;color:#ffffff;font-size:13px;font-weight:700;text-align:right;word-break:break-word;vertical-align:top;">${customer.email}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 10px;color:#9ca3af;font-size:13px;width:34%;vertical-align:top;">Teléfono</td>
                      <td style="padding:0 0 10px;color:#ffffff;font-size:13px;font-weight:700;text-align:right;word-break:break-word;vertical-align:top;">${customer.telefono ?? ""}</td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 10px;color:#9ca3af;font-size:13px;width:34%;vertical-align:top;">Ciudad</td>
                      <td style="padding:0 0 10px;color:#ffffff;font-size:13px;font-weight:700;text-align:right;word-break:break-word;vertical-align:top;">${customer.ciudad ?? ""}</td>
                    </tr>
                    <tr>
                      <td style="padding:0;color:#9ca3af;font-size:13px;width:34%;vertical-align:top;">Estado</td>
                      <td style="padding:0;color:#ffffff;font-size:13px;font-weight:700;text-align:right;word-break:break-word;vertical-align:top;">${customer.estado ?? ""}</td>
                    </tr>
                  </table>
                </div>

                <!-- ADDRESS -->
                <div style="
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:26px;
                  padding:22px 18px;
                  margin-bottom:18px;
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
                    font-size:14px;
                    line-height:1.9;
                    font-weight:600;
                    word-break:break-word;
                  ">
                    ${customer.direccion ?? ""}${customer.direccion2 ? `<br>${customer.direccion2}` : ""}<br>
                    ${customer.cp ?? ""} · ${customer.ciudad ?? ""} · ${customer.estado ?? ""} · ${customer.pais ?? "MX"}
                  </p>
                </div>

                <!-- ITEMS -->
                <div style="
                  border:1px solid #2a2a2a;
                  border-radius:28px;
                  padding:22px 14px;
                  background:#111111;
                ">
                  <div style="margin-bottom:18px;">
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
                      font-size:22px;
                      font-weight:900;
                      line-height:1.2;
                    ">
                      Servicios adquiridos
                    </h3>
                  </div>

                  ${itemsHtml}
                </div>

                ${
                  notes
                    ? `
                <div style="
                  margin-top:18px;
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:26px;
                  padding:22px 18px;
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
                    font-size:14px;
                    line-height:1.9;
                    word-break:break-word;
                  ">
                    ${notes}
                  </p>
                </div>
              `
                    : ""
                }

                <!-- CTA -->
                <div style="
                  margin-top:18px;
                  background:#1a1a1a;
                  border:1px solid #2a2a2a;
                  border-radius:26px;
                  padding:22px 18px;
                ">
                  <h3 style="
                    margin:0 0 12px;
                    color:#ffffff;
                    font-size:20px;
                    font-weight:900;
                  ">
                    ¿Qué sigue ahora?
                  </h3>

                  <p style="
                    margin:0;
                    color:#d4d4d8;
                    font-size:14px;
                    line-height:1.9;
                  ">
                    Nuestro equipo revisará tu pedido y comenzará el proceso.
                    Si necesitas agregar información adicional, puedes responder directamente a este correo.
                  </p>
                </div>

              </div>

              <!-- FOOTER -->
              <div style="
                padding:24px 16px;
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
        </div>
      `,
    });

    /**
     * BUSINESS EMAIL
     */
    await resend.emails.send({
      from: "Click Ential <sales@clickential.com.mx>",
      to: ["sales@clickential.com.mx"],
      subject: `Nuevo pedido ${reference} | Click Ential`,
      html: `
        <div style="
          margin:0;
          padding:28px 14px;
          background:#0f0f10;
          font-family:Inter,Arial,sans-serif;
        ">
          <div style="
            max-width:820px;
            margin:0 auto;
            background:#151516;
            border-radius:34px;
            overflow:hidden;
            border:1px solid #27272a;
            box-shadow:0 30px 80px rgba(0,0,0,.45);
          ">

            <!-- HEADER -->
            <div style="
              padding:40px 20px;
              background:#111111;
              border-bottom:1px solid #27272a;
              position:relative;
              overflow:hidden;
            ">
              <div style="
                position:absolute;
                top:-90px;
                right:-60px;
                width:220px;
                height:220px;
                border-radius:999px;
                background:rgba(239,68,68,.12);
              "></div>

              <div style="
                position:absolute;
                bottom:-100px;
                left:-60px;
                width:220px;
                height:220px;
                border-radius:999px;
                background:rgba(255,255,255,.04);
              "></div>

              <div style="position:relative;z-index:2;">
                <p style="
                  margin:0 0 12px;
                  color:#f87171;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                ">
                  Nuevo checkout recibido
                </p>

                <h1 style="
                  margin:0;
                  color:#ffffff;
                  font-size:30px;
                  font-weight:900;
                  line-height:1.08;
                  word-break:break-word;
                ">
                  ${reference}
                </h1>
              </div>
            </div>

            <!-- BODY -->
            <div style="padding:26px 14px;">

              <!-- SUMMARY GRID -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;table-layout:fixed;">
                <tr>
                  <td style="vertical-align:top;padding-right:6px;width:50%;">
                    <div style="
                      background:#111111;
                      border:1px solid #2a2a2a;
                      border-radius:26px;
                      padding:20px 16px;
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
                        margin:0 0 14px;
                        color:#ffffff;
                        font-size:22px;
                        font-weight:900;
                        line-height:1.15;
                        word-break:break-word;
                      ">
                        ${customerFullName || customerName}
                      </h2>

                      <p style="margin:0 0 8px;color:#d4d4d8;font-size:13px;line-height:1.8;word-break:break-word;">
                        <strong style="color:#ffffff;">Correo:</strong> ${customer.email}
                      </p>

                      <p style="margin:0 0 8px;color:#d4d4d8;font-size:13px;line-height:1.8;word-break:break-word;">
                        <strong style="color:#ffffff;">Teléfono:</strong> ${customer.telefono ?? ""}
                      </p>

                      <p style="margin:0;color:#d4d4d8;font-size:13px;line-height:1.8;word-break:break-word;">
                        <strong style="color:#ffffff;">Estado:</strong> ${customer.estado ?? ""}
                      </p>
                    </div>
                  </td>

                  <td style="vertical-align:top;padding-left:6px;width:50%;">
                    <div style="
                      background:#111111;
                      border:1px solid #2a2a2a;
                      border-radius:26px;
                      padding:20px 16px;
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
                        margin:0 0 14px;
                        color:#ffffff;
                        font-size:28px;
                        line-height:1.1;
                        font-weight:900;
                        word-break:break-word;
                      ">
                        ${total}
                      </p>

                      <p style="
                        margin:0 0 8px;
                        color:#9ca3af;
                        font-size:13px;
                      ">
                        Referencia
                      </p>

                      <p style="
                        margin:0;
                        color:#ffffff;
                        font-size:14px;
                        font-weight:700;
                        word-break:break-word;
                        line-height:1.4;
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
                border-radius:26px;
                padding:22px 16px;
                margin-bottom:18px;
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
                  font-size:14px;
                  line-height:1.9;
                  font-weight:600;
                  word-break:break-word;
                ">
                  ${customer.direccion ?? ""}${customer.direccion2 ? `<br>${customer.direccion2}` : ""}<br>
                  ${customer.cp ?? ""} · ${customer.ciudad ?? ""} · ${customer.estado ?? ""} · ${customer.pais ?? "MX"}
                </p>
              </div>

              <!-- ITEMS -->
              <div style="
                border:1px solid #2a2a2a;
                border-radius:28px;
                padding:22px 14px;
                background:#111111;
              ">
                <div style="margin-bottom:16px;">
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
                    font-size:22px;
                    font-weight:900;
                    line-height:1.2;
                  ">
                    Servicios adquiridos
                  </h3>
                </div>

                ${itemsHtml}
              </div>

              ${
                notes
                  ? `
                <div style="
                  margin-top:18px;
                  background:#111111;
                  border:1px solid #2a2a2a;
                  border-radius:26px;
                  padding:22px 16px;
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
                    font-size:14px;
                    line-height:1.9;
                    word-break:break-word;
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
              padding:22px 16px;
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
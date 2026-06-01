import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = "https://innovacodigo.com/logo.png";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      telefono,
      asunto,
      mensaje,
    } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Faltan campos obligatorios",
        },
        { status: 400 }
      );
    }

    const safeAsunto = asunto || "Nuevo contacto";
    const safeMensaje = mensaje || "Sin mensaje";
    const safeTelefono = telefono || "No proporcionado";

    /**
     * EMAIL NEGOCIO
     */
    await resend.emails.send({
      from: "Click Ential <contacto@innovacodigo.com>",
      to: ["contacto@innovacodigo.com"],
      replyTo: email,
      subject: `Nuevo contacto: ${safeAsunto}`,
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

            <!-- HERO -->
            <div style="
              position:relative;
              overflow:hidden;
              border-radius:34px 34px 0 0;
              background:#111111;
              padding:40px 22px 56px;
              border:1px solid #27272a;
              border-bottom:none;
            ">
              <div style="
                position:absolute;
                top:-110px;
                right:-80px;
                width:240px;
                height:240px;
                border-radius:999px;
                background:rgba(239,68,68,.12);
              "></div>

              <div style="
                position:absolute;
                bottom:-120px;
                left:-80px;
                width:240px;
                height:240px;
                border-radius:999px;
                background:rgba(255,255,255,.04);
              "></div>

              <img
                src="${LOGO_URL}"
                alt="Click Ential"
                style="
                  width:82px;
                  height:auto;
                  display:block;
                  margin-bottom:22px;
                  position:relative;
                  z-index:2;
                "
              />

              <p style="
                margin:0 0 14px;
                color:#f87171;
                font-size:11px;
                font-weight:800;
                letter-spacing:.28em;
                text-transform:uppercase;
                position:relative;
                z-index:2;
              ">
                Nuevo lead recibido
              </p>

              <h1 style="
                margin:0;
                max-width:540px;
                color:#ffffff;
                font-size:38px;
                line-height:1.08;
                font-weight:900;
                position:relative;
                z-index:2;
              ">
                Solicitud de contacto desde el sitio web
              </h1>

              <p style="
                margin:18px 0 0;
                max-width:560px;
                color:#d4d4d8;
                font-size:16px;
                line-height:1.9;
                position:relative;
                z-index:2;
              ">
                Se recibió un nuevo mensaje desde el formulario principal de Click Ential.
              </p>
            </div>

            <!-- WRAPPER -->
            <div style="
              background:#151516;
              border-radius:0 0 34px 34px;
              border:1px solid #27272a;
              border-top:none;
              overflow:hidden;
              box-shadow:0 30px 80px rgba(0,0,0,.45);
            ">

              <!-- CLIENT -->
              <div style="
                padding:28px 22px 18px;
                background:#151516;
              ">
                <p style="
                  margin:0 0 8px;
                  color:#f87171;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                ">
                  Cliente
                </p>

                <h2 style="
                  margin:0;
                  color:#ffffff;
                  font-size:30px;
                  line-height:1.15;
                  font-weight:900;
                  word-break:break-word;
                ">
                  ${nombre}
                </h2>
              </div>

              <!-- INFO GRID -->
              <div style="padding:0 22px 18px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;table-layout:fixed;">
                  <tr>
                    <td style="width:50%;padding-right:8px;vertical-align:top;">
                      <div style="
                        border:1px solid #2a2a2a;
                        border-radius:22px;
                        padding:20px;
                        background:#111111;
                        min-height:100%;
                      ">
                        <p style="
                          margin:0 0 8px;
                          color:#f87171;
                          font-size:11px;
                          font-weight:800;
                          letter-spacing:.16em;
                          text-transform:uppercase;
                        ">
                          Correo electrónico
                        </p>

                        <p style="
                          margin:0;
                          color:#ffffff;
                          font-size:15px;
                          line-height:1.8;
                          font-weight:700;
                          word-break:break-word;
                        ">
                          ${email}
                        </p>
                      </div>
                    </td>

                    <td style="width:50%;padding-left:8px;vertical-align:top;">
                      <div style="
                        border:1px solid #2a2a2a;
                        border-radius:22px;
                        padding:20px;
                        background:#111111;
                        min-height:100%;
                      ">
                        <p style="
                          margin:0 0 8px;
                          color:#f87171;
                          font-size:11px;
                          font-weight:800;
                          letter-spacing:.16em;
                          text-transform:uppercase;
                        ">
                          Teléfono
                        </p>

                        <p style="
                          margin:0;
                          color:#ffffff;
                          font-size:15px;
                          line-height:1.8;
                          font-weight:700;
                          word-break:break-word;
                        ">
                          ${safeTelefono}
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- MESSAGE -->
              <div style="padding:0 22px 18px;">
                <div style="
                  overflow:hidden;
                  border-radius:26px;
                  border:1px solid #2a2a2a;
                  background:#111111;
                ">
                  <div style="
                    padding:16px 20px;
                    background:#111111;
                    border-bottom:1px solid #2a2a2a;
                  ">
                    <p style="
                      margin:0;
                      color:#f87171;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Mensaje del cliente
                    </p>
                  </div>

                  <div style="padding:22px 20px;">
                    <p style="
                      margin:0 0 10px;
                      color:#f87171;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Asunto
                    </p>

                    <h3 style="
                      margin:0 0 18px;
                      color:#ffffff;
                      font-size:24px;
                      line-height:1.3;
                      font-weight:900;
                      word-break:break-word;
                    ">
                      ${safeAsunto}
                    </h3>

                    <p style="
                      margin:0;
                      color:#d4d4d8;
                      font-size:15px;
                      line-height:1.95;
                      white-space:pre-line;
                      word-break:break-word;
                    ">
                      ${safeMensaje}
                    </p>
                  </div>
                </div>
              </div>

              <!-- FOOTER -->
              <div style="
                padding:22px;
                border-top:1px solid #2a2a2a;
                background:#111111;
                text-align:center;
              ">
                <p style="
                  margin:0;
                  color:#9ca3af;
                  font-size:13px;
                  line-height:1.8;
                ">
                  Este mensaje fue generado automáticamente desde el formulario de contacto de Click Ential.
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    /**
     * EMAIL CLIENTE
     */
    await resend.emails.send({
      from: "Click Ential <contacto@innovacodigo.com>",
      to: [email],
      subject: "Recibimos tu mensaje | Click Ential",
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

            <!-- HERO -->
            <div style="
              position:relative;
              overflow:hidden;
              border-radius:34px 34px 0 0;
              background:#111111;
              padding:44px 22px 78px;
              border:1px solid #27272a;
              border-bottom:none;
              text-align:center;
            ">
              <div style="
                position:absolute;
                top:-120px;
                left:-110px;
                width:260px;
                height:260px;
                border-radius:999px;
                background:rgba(239,68,68,.10);
              "></div>

              <img
                src="${LOGO_URL}"
                alt="Click Ential"
                style="
                  width:90px;
                  height:auto;
                  display:block;
                  margin:0 auto 22px;
                  position:relative;
                  z-index:2;
                "
              />

              <p style="
                margin:0 0 14px;
                color:#f87171;
                font-size:11px;
                font-weight:800;
                letter-spacing:.28em;
                text-transform:uppercase;
                position:relative;
                z-index:2;
              ">
                Mensaje recibido
              </p>

              <h1 style="
                margin:0 auto;
                max-width:560px;
                color:#ffffff;
                font-size:40px;
                line-height:1.08;
                font-weight:900;
                position:relative;
                z-index:2;
              ">
                Gracias por contactarnos
              </h1>

              <p style="
                margin:18px auto 0;
                max-width:560px;
                color:#d4d4d8;
                font-size:16px;
                line-height:1.9;
                position:relative;
                z-index:2;
              ">
                Ya recibimos tu mensaje y nuestro equipo revisará tu solicitud para responderte lo antes posible.
              </p>
            </div>

            <!-- MAIN CARD -->
            <div style="
              margin:-34px auto 0;
              width:calc(100% - 24px);
              position:relative;
              z-index:10;
              background:#151516;
              border-radius:34px;
              border:1px solid #27272a;
              overflow:hidden;
              box-shadow:0 30px 80px rgba(0,0,0,.45);
            ">

              <div style="padding:28px 22px 0;">
                <p style="
                  margin:0 0 10px;
                  color:#f87171;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                ">
                  Hola ${nombre}
                </p>

                <h2 style="
                  margin:0;
                  color:#ffffff;
                  font-size:32px;
                  line-height:1.15;
                  font-weight:900;
                ">
                  Estamos listos para conocer tu proyecto
                </h2>

                <p style="
                  margin:16px 0 0;
                  color:#d4d4d8;
                  font-size:15px;
                  line-height:1.95;
                ">
                  Gracias por confiar en Click Ential.
                  Nuestro equipo revisará tu mensaje para ayudarte con una propuesta clara, moderna y enfocada en resultados.
                </p>
              </div>

              <!-- SUMMARY -->
              <div style="padding:22px 22px 18px;">
                <div style="
                  border-radius:26px;
                  overflow:hidden;
                  border:1px solid #2a2a2a;
                  background:#111111;
                ">
                  <div style="
                    padding:16px 20px;
                    border-bottom:1px solid #2a2a2a;
                    background:#111111;
                  ">
                    <p style="
                      margin:0;
                      color:#ffffff;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Resumen de tu solicitud
                    </p>
                  </div>

                  <div style="padding:22px 20px;">
                    <p style="
                      margin:0 0 10px;
                      color:#f87171;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Asunto
                    </p>

                    <h3 style="
                      margin:0 0 18px;
                      color:#ffffff;
                      font-size:24px;
                      line-height:1.3;
                      font-weight:900;
                      word-break:break-word;
                    ">
                      ${safeAsunto}
                    </h3>

                    <div style="
                      border-top:1px solid #2a2a2a;
                      padding-top:18px;
                    ">
                      <p style="
                        margin:0 0 10px;
                        color:#f87171;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Tu mensaje
                      </p>

                      <p style="
                        margin:0;
                        color:#d4d4d8;
                        font-size:15px;
                        line-height:1.95;
                        white-space:pre-line;
                        word-break:break-word;
                      ">
                        ${safeMensaje}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA -->
              <div style="padding:0 22px 22px;">
                <div style="
                  border-radius:26px;
                  border:1px solid #2a2a2a;
                  background:#111111;
                  padding:22px 20px;
                ">
                  <p style="
                    margin:0 0 10px;
                    color:#f87171;
                    font-size:11px;
                    font-weight:800;
                    letter-spacing:.22em;
                    text-transform:uppercase;
                  ">
                    Click Ential
                  </p>

                  <h3 style="
                    margin:0 0 12px;
                    color:#ffffff;
                    font-size:24px;
                    line-height:1.25;
                    font-weight:900;
                  ">
                    Tecnología diseñada para crecer contigo
                  </h3>

                  <p style="
                    margin:0;
                    color:#d4d4d8;
                    font-size:14px;
                    line-height:1.95;
                  ">
                    Creamos plataformas, automatizaciones y soluciones digitales modernas enfocadas en escalabilidad, experiencia de usuario y crecimiento empresarial.
                  </p>
                </div>
              </div>

              <!-- FOOTER -->
              <div style="
                padding:22px;
                border-top:1px solid #2a2a2a;
                background:#111111;
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
                  contacto@innovacodigo.com
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo enviar el formulario",
      },
      { status: 500 }
    );
  }
}
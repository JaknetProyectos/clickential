import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL =
  "https://innovacodigo.com/logo.png";

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

    /**
     * EMAIL NEGOCIO
     */
    await resend.emails.send({
      from: "Click Ential <contacto@innovacodigo.com>",
      to: ["contacto@innovacodigo.com"],
      replyTo: email,
      subject: `Nuevo contacto: ${asunto}`,

      html: `
        <div style="
          margin:0;
          padding:40px 18px;
          background:#0b0b0c;
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
              border-radius:42px 42px 0 0;
              background:
                radial-gradient(circle at top left,#38f2af22 0%,transparent 30%),
                radial-gradient(circle at bottom right,#7c3ee633 0%,transparent 40%),
                linear-gradient(135deg,#151516 0%,#1d1b22 100%);
              padding:52px 46px 120px;
              border:1px solid rgba(255,255,255,.06);
              border-bottom:none;
            ">

              <div style="
                position:absolute;
                top:-100px;
                right:-100px;
                width:240px;
                height:240px;
                border-radius:999px;
                background:#7c3ee622;
              "></div>

              <div style="
                position:absolute;
                bottom:-120px;
                left:-120px;
                width:260px;
                height:260px;
                border-radius:999px;
                background:#38f2af12;
              "></div>

              <img
                src="${LOGO_URL}"
                alt="Click Ential"
                style="
                  width:80px;
                  height:auto;
                  display:block;
                  margin-bottom:28px;
                  position:relative;
                  z-index:2;
                "
              />

              <p style="
                margin:0 0 14px;
                color:#38f2af;
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
                max-width:520px;
                color:#ffffff;
                font-size:46px;
                line-height:1.08;
                font-weight:900;
                position:relative;
                z-index:2;
              ">
                Solicitud de contacto desde el sitio web
              </h1>

              <p style="
                margin:22px 0 0;
                max-width:560px;
                color:rgba(255,255,255,.72);
                font-size:16px;
                line-height:1.9;
                position:relative;
                z-index:2;
              ">
                Se recibió un nuevo mensaje desde el formulario principal de Click Ential.
              </p>
            </div>

            <!-- FLOAT CARD -->
            <div style="
              margin:-70px auto 0;
              width:calc(100% - 48px);
              position:relative;
              z-index:10;
              background:#ffffff;
              border-radius:34px;
              border:1px solid #ececec;
              overflow:hidden;
              box-shadow:0 30px 80px rgba(0,0,0,.18);
            ">

              <!-- CLIENT -->
              <div style="
                padding:34px;
                background:
                  linear-gradient(180deg,#ffffff 0%,#fafafa 100%);
              ">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>
                    <td>
                      <p style="
                        margin:0 0 10px;
                        color:#7c3ee6;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.22em;
                        text-transform:uppercase;
                      ">
                        Cliente
                      </p>

                      <h2 style="
                        margin:0;
                        color:#151516;
                        font-size:34px;
                        line-height:1.1;
                        font-weight:900;
                      ">
                        ${nombre}
                      </h2>
                    </td>
                  </tr>
                </table>

              </div>

              <!-- INFO GRID -->
              <div style="
                padding:0 34px 34px;
              ">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <tr>

                    <td
                      valign="top"
                      style="
                        width:50%;
                        padding-right:10px;
                      "
                    >
                      <div style="
                        border:1px solid #efefef;
                        border-radius:24px;
                        padding:24px;
                        background:#fcfcfc;
                        height:100%;
                      ">
                        <p style="
                          margin:0 0 8px;
                          color:#7c3ee6;
                          font-size:11px;
                          font-weight:800;
                          letter-spacing:.16em;
                          text-transform:uppercase;
                        ">
                          Correo electrónico
                        </p>

                        <p style="
                          margin:0;
                          color:#1f2937;
                          font-size:16px;
                          line-height:1.8;
                          font-weight:600;
                        ">
                          ${email}
                        </p>
                      </div>
                    </td>

                    <td
                      valign="top"
                      style="
                        width:50%;
                        padding-left:10px;
                      "
                    >
                      <div style="
                        border:1px solid #efefef;
                        border-radius:24px;
                        padding:24px;
                        background:#fcfcfc;
                        height:100%;
                      ">
                        <p style="
                          margin:0 0 8px;
                          color:#38f2af;
                          font-size:11px;
                          font-weight:800;
                          letter-spacing:.16em;
                          text-transform:uppercase;
                        ">
                          Teléfono
                        </p>

                        <p style="
                          margin:0;
                          color:#1f2937;
                          font-size:16px;
                          line-height:1.8;
                          font-weight:600;
                        ">
                          ${telefono || "No proporcionado"}
                        </p>
                      </div>
                    </td>

                  </tr>
                </table>

              </div>

              <!-- MESSAGE -->
              <div style="
                padding:0 34px 34px;
              ">

                <div style="
                  overflow:hidden;
                  border-radius:30px;
                  border:1px solid #ededed;
                  background:white;
                ">

                  <div style="
                    padding:18px 24px;
                    background:#151516;
                    border-bottom:1px solid #232326;
                  ">
                    <p style="
                      margin:0;
                      color:#ffffff;
                      font-size:12px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Mensaje del cliente
                    </p>
                  </div>

                  <div style="
                    padding:30px 26px;
                  ">

                    <p style="
                      margin:0 0 12px;
                      color:#7c3ee6;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Asunto
                    </p>

                    <h3 style="
                      margin:0 0 24px;
                      color:#151516;
                      font-size:28px;
                      line-height:1.3;
                      font-weight:900;
                    ">
                      ${asunto}
                    </h3>

                    <p style="
                      margin:0;
                      color:#52525b;
                      font-size:16px;
                      line-height:2;
                      white-space:pre-line;
                    ">
                      ${mensaje}
                    </p>
                  </div>

                </div>

              </div>

              <!-- FOOTER -->
              <div style="
                padding:28px 34px;
                border-top:1px solid #efefef;
                background:#fafafa;
              ">

                <p style="
                  margin:0;
                  color:#71717a;
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
          padding:40px 18px;
          background:#0b0b0c;
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
              border-radius:42px 42px 0 0;
              background:
                radial-gradient(circle at top left,#7c3ee655 0%,transparent 34%),
                radial-gradient(circle at bottom right,#38f2af22 0%,transparent 38%),
                linear-gradient(135deg,#151516 0%,#1d1b22 100%);
              padding:60px 46px 140px;
              border:1px solid rgba(255,255,255,.06);
              border-bottom:none;
              text-align:center;
            ">

              <div style="
                position:absolute;
                top:-120px;
                left:-120px;
                width:260px;
                height:260px;
                border-radius:999px;
                background:#7c3ee622;
              "></div>

              <img
                src="${LOGO_URL}"
                alt="Click Ential"
                style="
                  width:90px;
                  height:auto;
                  display:block;
                  margin:0 auto 28px;
                  position:relative;
                  z-index:2;
                "
              />

              <p style="
                margin:0 0 16px;
                color:#38f2af;
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
                font-size:50px;
                line-height:1.08;
                font-weight:900;
                position:relative;
                z-index:2;
              ">
                Gracias por contactarnos
              </h1>

              <p style="
                margin:22px auto 0;
                max-width:560px;
                color:rgba(255,255,255,.74);
                font-size:17px;
                line-height:1.9;
                position:relative;
                z-index:2;
              ">
                Ya recibimos tu mensaje y nuestro equipo revisará tu solicitud para responderte lo antes posible.
              </p>
            </div>

            <!-- CONTENT -->
            <div style="
              margin:-80px auto 0;
              width:calc(100% - 48px);
              position:relative;
              z-index:10;
              background:#ffffff;
              border-radius:34px;
              border:1px solid #ececec;
              overflow:hidden;
              box-shadow:0 30px 80px rgba(0,0,0,.18);
            ">

              <div style="
                padding:40px 34px;
              ">

                <p style="
                  margin:0 0 12px;
                  color:#7c3ee6;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                ">
                  Hola ${nombre}
                </p>

                <h2 style="
                  margin:0;
                  color:#151516;
                  font-size:36px;
                  line-height:1.2;
                  font-weight:900;
                ">
                  Estamos listos para conocer tu proyecto
                </h2>

                <p style="
                  margin:22px 0 0;
                  color:#52525b;
                  font-size:16px;
                  line-height:2;
                ">
                  Gracias por confiar en Click Ential.
                  Nuestro equipo revisará tu mensaje para ayudarte con una propuesta clara, moderna y enfocada en resultados.
                </p>

              </div>

              <!-- SUMMARY -->
              <div style="
                padding:0 34px 34px;
              ">

                <div style="
                  border-radius:30px;
                  overflow:hidden;
                  border:1px solid #ededed;
                ">

                  <div style="
                    padding:18px 24px;
                    background:#151516;
                    border-bottom:1px solid #232326;
                  ">
                    <p style="
                      margin:0;
                      color:#ffffff;
                      font-size:12px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Resumen de tu solicitud
                    </p>
                  </div>

                  <div style="
                    padding:30px 26px;
                    background:#fcfcfc;
                  ">

                    <p style="
                      margin:0 0 10px;
                      color:#38f2af;
                      font-size:11px;
                      font-weight:800;
                      letter-spacing:.18em;
                      text-transform:uppercase;
                    ">
                      Asunto
                    </p>

                    <h3 style="
                      margin:0 0 24px;
                      color:#151516;
                      font-size:28px;
                      line-height:1.3;
                      font-weight:900;
                    ">
                      ${asunto}
                    </h3>

                    <div style="
                      border-top:1px solid #ececec;
                      padding-top:24px;
                    ">

                      <p style="
                        margin:0 0 12px;
                        color:#7c3ee6;
                        font-size:11px;
                        font-weight:800;
                        letter-spacing:.18em;
                        text-transform:uppercase;
                      ">
                        Tu mensaje
                      </p>

                      <p style="
                        margin:0;
                        color:#52525b;
                        font-size:15px;
                        line-height:2;
                        white-space:pre-line;
                      ">
                        ${mensaje}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <!-- CTA BLOCK -->
              <div style="
                margin:0 34px 34px;
                border-radius:32px;
                overflow:hidden;
                background:
                  radial-gradient(circle at top right,#38f2af22 0%,transparent 30%),
                  linear-gradient(135deg,#151516 0%,#1d1b22 100%);
                padding:34px;
              ">

                <p style="
                  margin:0 0 10px;
                  color:#38f2af;
                  font-size:11px;
                  font-weight:800;
                  letter-spacing:.22em;
                  text-transform:uppercase;
                ">
                  Click Ential
                </p>

                <h3 style="
                  margin:0 0 16px;
                  color:#ffffff;
                  font-size:30px;
                  line-height:1.2;
                  font-weight:900;
                ">
                  Tecnología diseñada para crecer contigo
                </h3>

                <p style="
                  margin:0;
                  color:rgba(255,255,255,.72);
                  font-size:15px;
                  line-height:2;
                ">
                  Creamos plataformas, automatizaciones y soluciones digitales modernas enfocadas en escalabilidad, experiencia de usuario y crecimiento empresarial.
                </p>

              </div>

              <!-- FOOTER -->
              <div style="
                padding:26px 34px;
                border-top:1px solid #efefef;
                background:#fafafa;
                text-align:center;
              ">

                <p style="
                  margin:0 0 8px;
                  color:#151516;
                  font-size:14px;
                  font-weight:700;
                ">
                  Click Ential
                </p>

                <p style="
                  margin:0;
                  color:#71717a;
                  font-size:12px;
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
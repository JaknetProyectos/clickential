"use client";

import { useLocale } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function LegalEs() {
    return (
        <div className="legal-container">
            <style dangerouslySetInnerHTML={{
                __html: `
        .legal-container {
          color: #1a1a1a;
          line-height: 1.6;
          font-family: sans-serif;
        }
        .legal-container h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .legal-container h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #3048ab; }
        .legal-container h3 { font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; }
        .legal-container p { margin-bottom: 1.2rem; text-align: justify; }
        .legal-container ul { margin-bottom: 1.2rem; padding-left: 1.5rem; list-style-type: disc; }
        .legal-container li { margin-bottom: 0.5rem; }
        .legal-container section { margin-bottom: 3rem; }
      `}} />

            <section>
                <h1 id="politica-de-devoluciones-y-reembolsos"><strong>Política de devoluciones y reembolsos</strong></h1>

                <p><strong>BOTTLENECK CART, S.A. DE C.V. (<strong>INNOVA CÓDIGO</strong>)</strong></p>

                <p><strong>1. DISPOSICIONES GENERALES</strong></p>

                <p>
                    La presente Política regula las condiciones para solicitudes de cancelación y reembolso aplicables a los servicios, productos y plataformas SaaS proporcionados por <strong>BOTTLENECK CART, S.A. DE C.V.</strong> (“INNOVA CÓDIGO” o “la Empresa”), de conformidad con los Términos y Condiciones aceptados por el Usuario.
                </p>

                <p>
                    Al contratar, utilizar o acceder a los servicios de INNOVA CÓDIGO, el Usuario reconoce haber leído y aceptado esta Política.
                </p>

                <p><strong>2. SOBRE CANCELACIONES</strong></p>

                <p><strong>2.1. Solicitud de Cancelación</strong></p>

                <p>
                    Las solicitudes de cancelación deberán enviarse por escrito al correo:
                    <strong>contacto@innovacodigo.com</strong>
                </p>

                <p>La solicitud deberá incluir:</p>

                <ul>
                    <li>Nombre del Usuario</li>
                    <li>Servicio o paquete contratado</li>
                    <li>Fecha de contratación</li>
                    <li>Motivo de la cancelación</li>
                </ul>

                <p>
                    INNOVA CÓDIGO analizará cada solicitud caso por caso y comunicará su resolución al Usuario.
                </p>

                <p><strong>2.2. Cancelaciones de Servicios Recurrentes</strong></p>

                <p>En servicios con modalidad de suscripción o pagos recurrentes:</p>

                <ul>
                    <li>La cancelación <strong>no exime</strong> al Usuario de cubrir pagos previamente generados o facturados.</li>
                    <li>
                        Para evitar el siguiente ciclo de cobro, la cancelación deberá solicitarse
                        <strong>antes de la fecha de renovación</strong>
                        publicada o indicada en la cotización.
                    </li>
                </ul>

                <p><strong>2.3. Efecto de la Cancelación</strong></p>

                <p>Al confirmarse la cancelación:</p>

                <ul>
                    <li>Se deshabilitará el acceso del Usuario a la plataforma o servicio.</li>
                    <li>
                        No se conservarán integraciones, automatizaciones, dashboards o configuraciones,
                        salvo que exista acuerdo por escrito para su resguardo.
                    </li>
                </ul>

                <p><strong>3. REEMBOLSOS</strong></p>

                <p><strong>3.1. Política General</strong></p>

                <p>
                    Como regla general, <strong>INNOVA CÓDIGO no ofrece reembolsos</strong>, salvo que:
                </p>

                <ul>
                    <li>El servicio no haya sido provisto conforme a lo ofertado.</li>
                    <li>
                        Tras la evaluación interna de INNOVA CÓDIGO, se determine que el Usuario tiene derecho al reembolso.
                    </li>
                </ul>

                <p>El reembolso no procede por:</p>

                <ul>
                    <li>Errores del Usuario al proporcionar información.</li>
                    <li>Falta de interés, tiempo, uso o desconocimiento del funcionamiento de la plataforma.</li>
                    <li>Problemas originados por servicios o proveedores externos ajenos a INNOVA CÓDIGO.</li>
                    <li>
                        Falta de resultados derivados de mal uso, uso incompleto o interpretación de datos,
                        dashboards o predicciones.
                    </li>
                </ul>

                <p><strong>3.2. Servicios Personalizados o a la Medida</strong></p>

                <p>No son reembolsables:</p>

                <ul>
                    <li>Desarrollo de dashboards personalizados.</li>
                    <li>Modelos predictivos hechos a la medida.</li>
                    <li>Consultorías, integraciones o automatizaciones personalizadas.</li>
                    <li>Diseño, configuración o parametrización específica solicitada por el Usuario.</li>
                </ul>

                <p><strong>3.3. Servicios de Suscripción</strong></p>

                <p>
                    No se realizan reembolsos parciales o proporcionales por meses, semanas o días no utilizados.
                </p>

                <p>
                    Si el Usuario cancela antes de finalizar el periodo contratado,
                    <strong>el acceso se suspenderá</strong>,
                    pero no se realizará devolución alguna.
                </p>

                <p><strong>4. PROCEDIMIENTO DE REEMBOLSO (CUANDO PROCEDA)</strong></p>

                <p>
                    En los casos excepcionales donde INNOVA CÓDIGO determine procedencia de reembolso:
                </p>

                <ul>
                    <li>La Empresa notificará por correo la aprobación del reembolso.</li>
                    <li>El proceso se realizará mediante el mismo método de pago utilizado.</li>
                    <li>
                        El tiempo para ver reflejado el reembolso dependerá del banco o institución emisora de la tarjeta.
                    </li>
                    <li>
                        INNOVA CÓDIGO únicamente procesa la devolución;
                        <strong>
                            el reflejo del dinero en la cuenta del Usuario está sujeto a los tiempos de la institución bancaria
                        </strong>.
                    </li>
                </ul>

                <p><strong>5. TIEMPOS DE PROCESAMIENTO</strong></p>

                <ul>
                    <li>
                        INNOVA CÓDIGO confirmará la recepción de la solicitud dentro de
                        <strong>24 horas hábiles</strong>.
                    </li>
                    <li>
                        Una vez aprobada la solicitud, el reembolso será procesado en un plazo de
                        <strong>15 a 30 días hábiles</strong>,
                        dependiendo de los tiempos de la institución bancaria.
                    </li>
                </ul>

                <p><strong>6. EXCEPCIÓN POR FALLAS EN EL SERVICIO</strong></p>

                <p>
                    Si se presenta una falla técnica atribuible directamente a INNOVA CÓDIGO que imposibilite el uso del servicio contratado por un periodo prolongado, la Empresa podrá otorgar, a su criterio:
                </p>

                <ul>
                    <li>Un ajuste proporcional en la renovación.</li>
                    <li>Una nota de crédito para servicios futuros.</li>
                    <li>
                        Un reembolso parcial o total, únicamente en casos extraordinarios.
                    </li>
                </ul>

                <p><strong>7. CONTACTO</strong></p>

                <p>Para cualquier duda o solicitud relacionada con esta Política:</p>

                <ul>
                    <li>
                        <a href="mailto:contacto@innovacodigo.com" title="mailto:contacto@innovacodigo.com">
                            <strong>contacto@innovacodigo.com</strong>
                        </a>
                    </li>
                    <li><strong>innovacodigo.com</strong></li>
                </ul>

            </section>
        </div>
    );
}

function LegalEn() {
    return (
        <div className="legal-container">
            <style dangerouslySetInnerHTML={{
                __html: `
        .legal-container {
          color: #1a1a1a;
          line-height: 1.6;
          font-family: sans-serif;
        }
        .legal-container h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .legal-container h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #3048ab; }
        .legal-container h3 { font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; }
        .legal-container p { margin-bottom: 1.2rem; text-align: justify; }
        .legal-container ul { margin-bottom: 1.2rem; padding-left: 1.5rem; list-style-type: disc; }
        .legal-container li { margin-bottom: 0.5rem; }
      `}} />

            <section>
                <h1 id="refund-and-return-policy"><strong>Refund and Return Policy</strong></h1>

                <p><strong>BOTTLENECK CART, S.A. DE C.V. (<strong>INNOVA CÓDIGO</strong>)</strong></p>

                <p><strong>1. GENERAL PROVISIONS</strong></p>

                <p>
                    This Policy governs the conditions for cancellation and refund requests applicable to the services, products, and SaaS platforms provided by <strong>BOTTLENECK CART, S.A. DE C.V.</strong> (“INNOVA CÓDIGO” or “the Company”), in accordance with the Terms and Conditions accepted by the User.
                </p>

                <p>
                    By contracting, using, or accessing the services of INNOVA CÓDIGO, the User acknowledges having read and accepted this Policy.
                </p>

                <p><strong>2. CANCELLATIONS</strong></p>

                <p><strong>2.1. Cancellation Request</strong></p>

                <p>
                    Cancellation requests must be submitted in writing to:
                    <strong>contacto@innovacodigo.com</strong>
                </p>

                <p>The request must include:</p>

                <ul>
                    <li>User’s Name</li>
                    <li>Contracted service or package</li>
                    <li>Contract date</li>
                    <li>Reason for cancellation</li>
                </ul>

                <p>
                    INNOVA CÓDIGO will review each request on a case-by-case basis and communicate its resolution to the User.
                </p>

                <p><strong>2.2. Recurring Service Cancellations</strong></p>

                <p>For subscription-based or recurring payment services:</p>

                <ul>
                    <li>The cancellation <strong>does not exempt</strong> the User from paying previously generated or invoiced charges.</li>
                    <li>
                        To avoid the next billing cycle, the cancellation request must be submitted
                        <strong>before the renewal date</strong>
                        published or indicated in the quotation.
                    </li>
                </ul>

                <p><strong>2.3. Effect of Cancellation</strong></p>

                <p>Once the cancellation is confirmed:</p>

                <ul>
                    <li>The User’s access to the platform or service will be disabled.</li>
                    <li>
                        Integrations, automations, dashboards, or configurations will not be retained,
                        unless there is a written agreement for their preservation.
                    </li>
                </ul>

                <p><strong>3. REFUNDS</strong></p>

                <p><strong>3.1. General Policy</strong></p>

                <p>
                    As a general rule, <strong>INNOVA CÓDIGO does not offer refunds</strong>, except when:
                </p>

                <ul>
                    <li>The service was not provided as offered.</li>
                    <li>
                        After INNOVA CÓDIGO’s internal evaluation, it is determined that the User is entitled to a refund.
                    </li>
                </ul>

                <p>Refunds will not apply in cases of:</p>

                <ul>
                    <li>User errors when providing information.</li>
                    <li>Lack of interest, time, use, or understanding of the platform’s operation.</li>
                    <li>Problems caused by external services or providers unrelated to INNOVA CÓDIGO.</li>
                    <li>
                        Lack of results derived from misuse, incomplete use, or interpretation of data,
                        dashboards, or predictions.
                    </li>
                </ul>

                <p><strong>3.2. Customized or Tailored Services</strong></p>

                <p>The following are non-refundable:</p>

                <ul>
                    <li>Development of customized dashboards.</li>
                    <li>Custom predictive models.</li>
                    <li>Customized consulting, integrations, or automations.</li>
                    <li>Specific design, configuration, or parameterization requested by the User.</li>
                </ul>

                <p><strong>3.3. Subscription Services</strong></p>

                <p>
                    Partial or proportional refunds for unused months, weeks, or days are not provided.
                </p>

                <p>
                    If the User cancels before the contracted period ends,
                    <strong>access will be suspended</strong>,
                    but no refund will be issued.
                </p>

                <p><strong>4. REFUND PROCEDURE (WHEN APPLICABLE)</strong></p>

                <p>
                    In exceptional cases where INNOVA CÓDIGO determines that a refund applies:
                </p>

                <ul>
                    <li>The Company will notify the User by email of the refund approval.</li>
                    <li>The process will be carried out using the same payment method originally used.</li>
                    <li>
                        The time required for the refund to appear will depend on the bank or card issuer.
                    </li>
                    <li>
                        INNOVA CÓDIGO only processes the refund;
                        <strong>
                            the reflection of funds in the User’s account is subject to the banking institution’s processing times
                        </strong>.
                    </li>
                </ul>

                <p><strong>5. PROCESSING TIMES</strong></p>

                <ul>
                    <li>
                        INNOVA CÓDIGO will confirm receipt of the request within
                        <strong>24 business hours</strong>.
                    </li>
                    <li>
                        Once the request is approved, the refund will be processed within
                        <strong>15 to 30 business days</strong>,
                        depending on the banking institution’s processing times.
                    </li>
                </ul>

                <p><strong>6. EXCEPTION FOR SERVICE FAILURES</strong></p>

                <p>
                    If a technical failure directly attributable to INNOVA CÓDIGO occurs and prevents the use of the contracted service for an extended period, the Company may, at its discretion, provide:
                </p>

                <ul>
                    <li>A proportional adjustment on renewal.</li>
                    <li>A credit note for future services.</li>
                    <li>
                        A partial or full refund, only in extraordinary cases.
                    </li>
                </ul>

                <p><strong>7. CONTACT</strong></p>

                <p>For any questions or requests related to this Policy:</p>

                <ul>
                    <li>
                        <a href="mailto:contacto@innovacodigo.com" title="mailto:contacto@innovacodigo.com">
                            <strong>contacto@innovacodigo.com</strong>
                        </a>
                    </li>
                    <li><strong>innovacodigo.com</strong></li>
                </ul>


            </section>
        </div>
    );
}

export default function LegalPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                {locale === "es" ? <LegalEs /> : <LegalEn />}
            </main>
            <Footer />
        </div>
    );
}
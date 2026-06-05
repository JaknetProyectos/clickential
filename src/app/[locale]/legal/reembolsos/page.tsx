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
          color: #eee;
          line-height: 1.6;
          font-family: sans-serif;
        }
        .legal-container h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .legal-container h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #eee; }
        .legal-container h3 { font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; }
        .legal-container p { margin-bottom: 1.2rem; text-align: justify; }
        .legal-container ul { margin-bottom: 1.2rem; padding-left: 1.5rem; list-style-type: disc; }
        .legal-container li { margin-bottom: 0.5rem; }
        .legal-container section { margin-bottom: 3rem; }
      `}} />

            <section>
                <h1>Política de Cambios y Devoluciones</h1>

                <h2>Cambios y Devoluciones</h2>

                <p>
                    El COMPRADOR podrá solicitar el cambio de un Servicio o la devolución de su
                    dinero. El COMPRADOR solicitará el intercambio de un Servicio o el reembolso
                    de su dinero por correo electrónico, siempre que el Servicio no esté en la
                    lista de restricciones y el reclamo se presente dentro de los primeros 5
                    días después de haber recibido la orden de compra respectiva.
                </p>

                <p>
                    Los gastos derivados de la devolución o cambio solicitado por El COMPRADOR
                    no serán cubiertos por CLEVERKINK.
                </p>

                <p>
                    Cualquier devolución que realice El COMPRADOR y que resulte procedente, se
                    realizará conforme al método de pago realizado por el cliente y/o mediante
                    abono a su Cuenta Bancaria, para lo cual deberá proporcionar su nombre y
                    número de cuenta a la cual se realizará dicha bonificación por concepto de
                    devolución.
                </p>

                <h2>Mecánica de Devolución</h2>

                <p>
                    Sin perjuicio de lo establecido en estos Términos y Condiciones, el
                    COMPRADOR deberá contactar al área de Atención a Clientes para iniciar su
                    solicitud de cambio de Servicio o bien, para solicitar el reembolso a su
                    tarjeta de crédito, débito, o bien la generación de un cupón por el monto
                    de la compra.
                </p>

                <p>
                    La satisfacción de dicha solicitud estará en todo momento sujeta al
                    cumplimiento de lo dispuesto en estos Términos y Condiciones y en las
                    políticas de CLEVERKINK en general.
                </p>

                <h2>Razones y Tipos de Devolución</h2>

                <p>
                    <strong>(I) Razones para la Devolución:</strong> CLEVERKINK solo procesará
                    devoluciones por las siguientes causas:
                </p>

                <ol type="A">
                    <li>
                        El servicio no se prestó conforme a lo estipulado en el contrato.
                    </li>
                    <li>
                        Se detectaron errores significativos durante la prestación del servicio.
                    </li>
                    <li>
                        El resultado del servicio fue insatisfactorio debido a fallos atribuibles
                        a CLEVERKINK.
                    </li>
                </ol>

                <p>
                    La cantidad pagada será devuelta por uno de los siguientes mecanismos:
                </p>

                <ol>
                    <li>
                        <strong>Transferencia bancaria:</strong> El Comprador podrá solicitar la
                        devolución mediante transferencia bancaria por el total de la compra.
                    </li>
                </ol>

                <h2>Restricciones</h2>

                <p>
                    CLEVERKINK implementa restricciones en las solicitudes de devolución de
                    servicios para prevenir abusos y fraudes, garantizando la estabilidad
                    financiera y operativa de la empresa, así como gestionando adecuadamente las
                    expectativas de los clientes y cumpliendo con las normativas legales.
                </p>

                <p>
                    Estas restricciones permiten mantener altos estándares de calidad,
                    optimizar recursos y asegurar una comunicación clara y transparente,
                    beneficiando tanto a la empresa como a sus clientes.
                </p>

                <p>
                    Las limitaciones en la solicitud de devolución son las siguientes:
                </p>

                <ul>
                    <li>
                        <strong>Servicios Completados:</strong> No se aceptarán devoluciones de
                        servicios que ya hayan sido completados y entregados, salvo en casos de
                        errores o insatisfacción justificada, los cuales serán evaluados por el
                        equipo de CLEVERKINK.
                    </li>

                    <li>
                        <strong>Servicios en Proceso:</strong> Si el cliente desea cancelar un
                        servicio en curso, debe ponerse en contacto con CLEVERKINK lo antes
                        posible enviando un correo electrónico a
                        <a href="mailto:sales@clickential.com.mx">
                            sales@clickential.com.mx
                        </a>.
                        Las devoluciones en estos casos serán evaluadas de manera individual.
                    </li>
                </ul>

                <h2>Cancelaciones por Parte del Comprador</h2>

                <p>
                    Para cancelaciones de servicios programados, la solicitud debe realizarse
                    al menos 15 días antes de la fecha programada del servicio.
                </p>

                <p>
                    Enviar un correo electrónico a
                    <a href="mailto:sales@clickential.com.mx">
                        sales@clickential.com.mx
                    </a>
                    con su nombre, número de contrato y fecha del servicio.
                </p>

                <p>
                    Recibirá una confirmación de la cancelación y detalles sobre el reembolso
                    aplicable.
                </p>

                <p>
                    Casos excepcionales pueden ser considerados individualmente, y podrían
                    aplicarse términos diferentes.
                </p>

                <h2>Contracargo</h2>

                <p>
                    En caso de que se presente una reclamación por cargo a tarjeta de crédito o
                    débito no reconocida por El COMPRADOR (denominado Contracargo),
                    CLEVERKINK se reserva el derecho de iniciar la acción legal, coadyuvando
                    con el Ministerio Público y la Institución Financiera para iniciar la
                    Averiguación Previa por la comisión de un delito.
                </p>

                <p>
                    Así mismo, CLEVERKINK podrá tomar las medidas que considere necesarias
                    dentro del marco de la Ley para recuperar los productos si estos fueron
                    entregados al COMPRADOR.
                </p>

                <p>
                    La baja del COMPRADOR del portal de CLEVERKINK, no exime de su
                    responsabilidad de pago por operaciones realizadas durante la vigencia de
                    esta en el portal de CLEVERKINK.
                </p>
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
          color: #eee;
          line-height: 1.6;
          font-family: sans-serif;
        }
        .legal-container h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 2rem; border-bottom: 2px solid #eee; padding-bottom: 1rem; }
        .legal-container h2 { font-size: 1.5rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #eee; }
        .legal-container h3 { font-size: 1.1rem; font-weight: 700; margin-top: 1.5rem; }
        .legal-container p { margin-bottom: 1.2rem; text-align: justify; }
        .legal-container ul { margin-bottom: 1.2rem; padding-left: 1.5rem; list-style-type: disc; }
        .legal-container li { margin-bottom: 0.5rem; }
        .legal-container section { margin-bottom: 3rem; }
      `}} />

            <section>
                <h1>Exchange and Refund Policy</h1>

                <h2>Exchanges and Refunds</h2>

                <p>
                    The BUYER may request the exchange of a Service or a refund of their money.
                    The BUYER shall request the exchange of a Service or the refund of their
                    money by email, provided that the Service is not included in the list of
                    restrictions and the claim is submitted within the first 5 days after
                    having received the corresponding purchase order.
                </p>

                <p>
                    Expenses arising from the return or exchange requested by the BUYER shall
                    not be covered by CLEVERKINK.
                </p>

                <p>
                    Any refund made to the BUYER and deemed applicable shall be processed
                    according to the payment method used by the customer and/or through a
                    deposit to their Bank Account, for which they must provide their name and
                    account number to which such refund payment shall be made.
                </p>

                <h2>Refund Procedure</h2>

                <p>
                    Without prejudice to the provisions set forth in these Terms and Conditions,
                    the BUYER must contact the Customer Service department to initiate their
                    request for a Service exchange or to request a refund to their credit card,
                    debit card, or the issuance of a coupon for the purchase amount.
                </p>

                <p>
                    Approval of such request shall at all times be subject to compliance with
                    the provisions of these Terms and Conditions and CLEVERKINK’s policies in
                    general.
                </p>

                <h2>Reasons and Types of Refunds</h2>

                <p>
                    <strong>(I) Reasons for Refund:</strong> CLEVERKINK shall only process
                    refunds for the following causes:
                </p>

                <ol type="A">
                    <li>
                        The service was not provided in accordance with the terms established in
                        the contract.
                    </li>
                    <li>
                        Significant errors were detected during the provision of the service.
                    </li>
                    <li>
                        The outcome of the service was unsatisfactory due to failures attributable
                        to CLEVERKINK.
                    </li>
                </ol>

                <p>
                    The amount paid shall be refunded through one of the following methods:
                </p>

                <ol>
                    <li>
                        <strong>Bank Transfer:</strong> The Buyer may request a refund through a
                        bank transfer for the total purchase amount.
                    </li>
                </ol>

                <h2>Restrictions</h2>

                <p>
                    CLEVERKINK implements restrictions on service refund requests to prevent
                    abuse and fraud, ensuring the financial and operational stability of the
                    company, as well as properly managing customer expectations and complying
                    with legal regulations.
                </p>

                <p>
                    These restrictions allow the company to maintain high quality standards,
                    optimize resources, and ensure clear and transparent communication,
                    benefiting both the company and its customers.
                </p>

                <p>
                    The limitations on refund requests are as follows:
                </p>

                <ul>
                    <li>
                        <strong>Completed Services:</strong> Refunds shall not be accepted for
                        services that have already been completed and delivered, except in cases
                        of errors or justified dissatisfaction, which shall be evaluated by the
                        CLEVERKINK team.
                    </li>

                    <li>
                        <strong>Services in Progress:</strong> If the customer wishes to cancel
                        an ongoing service, they must contact CLEVERKINK as soon as possible by
                        sending an email to
                        <a href="mailto:sales@clickential.com.mx">
                            sales@clickential.com.mx
                        </a>.
                        Refunds in these cases shall be evaluated individually.
                    </li>
                </ul>

                <h2>Cancellations by the Buyer</h2>

                <p>
                    For cancellations of scheduled services, the request must be made at least
                    15 days before the scheduled service date.
                </p>

                <p>
                    Send an email to
                    <a href="mailto:sales@clickential.com.mx">
                        sales@clickential.com.mx
                    </a>
                    including your name, contract number, and service date.
                </p>

                <p>
                    You will receive a cancellation confirmation and details regarding the
                    applicable refund.
                </p>

                <p>
                    Exceptional cases may be considered individually, and different terms may
                    apply.
                </p>

                <h2>Chargeback</h2>

                <p>
                    In the event of a claim for an unrecognized charge on a credit or debit
                    card by the BUYER (hereinafter referred to as a Chargeback), CLEVERKINK
                    reserves the right to initiate legal action, cooperating with the Public
                    Prosecutor’s Office and the Financial Institution to begin the corresponding
                    criminal investigation for the commission of a crime.
                </p>

                <p>
                    Likewise, CLEVERKINK may take any measures it deems necessary within the
                    framework of the Law to recover the products if these were delivered to the
                    BUYER.
                </p>

                <p>
                    The BUYER’s removal from the CLEVERKINK portal does not exempt them from
                    payment liability for transactions carried out during the validity of their
                    use of the CLEVERKINK portal.
                </p>
            </section>

        </div>
    );
}

export default function LegalPage() {
    const locale = useLocale();

    return (
        <div className="min-h-screen flex flex-col bg-black mt-6">
            <Header />
            <main className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
                {locale === "es" ? <LegalEs /> : <LegalEn />}
            </main>
            <Footer />
        </div>
    );
}
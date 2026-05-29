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
                <h1 id="politica-de-privacidad"><strong>Política de privacidad</strong></h1>

                <p><strong>BOTTLENECK CART, S.A. DE C.V. (<strong>INNOVA CODIGO</strong>)</strong></p>

                <p><strong>1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE</strong></p>

                <p>
                    BOTTLENECK CART, S.A. DE C.V. (“INNOVA CODIGO”, “la Empresa” o “el Responsable”), con domicilio en
                    <strong>
                        Avenida Homero No. 205, Piso 10, Colonia Polanco V Sección, Alcaldía Miguel Hidalgo, C.P. 11560, Ciudad de México
                    </strong>,
                    es responsable del tratamiento, uso y protección de los datos personales que recaba.
                </p>

                <p>
                    Sitio web:
                    <a href="https://bi-desk.com/" title="https://bi-desk.com/">
                        <strong>innovacodigo.com</strong>
                    </a>
                </p>

                <p>
                    Correo de contacto:
                    <strong>contacto@innovacodigo.com</strong>
                </p>

                <p><strong>2. DATOS PERSONALES QUE RECABAMOS</strong></p>

                <p>
                    INNOVA CODIGO podrá recopilar las siguientes categorías de datos personales:
                </p>

                <p><strong>a) Datos de identificación y contacto</strong></p>

                <ul>
                    <li>Nombre, correo electrónico, teléfono, domicilio</li>
                </ul>

                <p><strong>b) Datos de facturación y financieros</strong></p>

                <ul>
                    <li>
                        RFC, razón social, domicilio fiscal, método de pago
                        (sin almacenar datos sensibles de tarjetas).
                    </li>
                </ul>

                <p><strong>c) Datos técnicos y analíticos</strong></p>

                <ul>
                    <li>
                        Dirección IP, cookies, identificadores únicos, logs de actividad,
                        estadísticas de uso.
                    </li>
                </ul>

                <p><strong>d) Información que el Usuario ingresa a los servicios SaaS</strong></p>

                <p>Incluyendo pero no limitado a:</p>

                <ul>
                    <li>Bases de datos proporcionadas por el Usuario.</li>
                    <li>
                        Información contenida en dashboards, encuestas, métricas,
                        predicciones, modelos y archivos cargados a la plataforma.
                    </li>
                </ul>

                <p>
                    <strong>INNOVA CODIGO no recopila datos personales sensibles</strong>,
                    salvo que el Usuario los cargue voluntariamente en la plataforma
                    como parte del uso de los servicios.
                </p>

                <p><strong>3. FINALIDADES DEL TRATAMIENTO</strong></p>

                <p>Los datos personales serán utilizados para las siguientes:</p>

                <p><strong>Finalidades Primarias (necesarias):</strong></p>

                <ul>
                    <li>
                        Proveer los servicios SaaS, BI, analítica, encuestas,
                        dashboards y consultoría contratados.
                    </li>
                    <li>Crear, administrar y gestionar cuentas de usuario.</li>
                    <li>
                        Brindar soporte técnico, mantenimiento, actualizaciones
                        y servicio al cliente.
                    </li>
                    <li>Procesar pagos, facturación y comprobantes fiscales.</li>
                    <li>
                        Configurar integraciones, automatizaciones y herramientas digitales
                        ofrecidas por INNOVA CODIGO.
                    </li>
                    <li>
                        Contactar al Usuario para seguimiento, notificaciones,
                        cambios, vencimientos y renovaciones.
                    </li>
                    <li>
                        Garantizar la seguridad, integridad y funcionamiento adecuado
                        de la plataforma.
                    </li>
                </ul>

                <p><strong>Finalidades Secundarias (opcionales):</strong></p>

                <ul>
                    <li>
                        Enviar comunicaciones comerciales, newsletters
                        o información promocional.
                    </li>
                    <li>
                        Generar análisis estadísticos y estudios internos
                        de mejoras del servicio.
                    </li>
                    <li>Realizar encuestas de satisfacción.</li>
                </ul>

                <p>
                    El Usuario podrá <strong>negarse o revocar</strong> su consentimiento
                    respecto de las finalidades secundarias enviando un correo a
                    <strong>contacto@innovacodigo.com</strong>.
                </p>

                <p><strong>4. TRANSFERENCIA DE DATOS PERSONALES</strong></p>

                <p>
                    INNOVA CODIGO puede compartir datos personales únicamente
                    en los siguientes casos:
                </p>

                <p><strong>a) Transferencias necesarias sin consentimiento</strong></p>

                <ul>
                    <li>Autoridades competentes cuando sea requerido legalmente.</li>
                    <li>
                        Proveedores de servicios tecnológicos
                        (hosting, procesamiento de datos, seguridad, pagos)
                        únicamente para cumplir las finalidades del servicio.
                    </li>
                    <li>
                        Aliados comerciales estrictamente para la ejecución
                        de los servicios contratados.
                    </li>
                </ul>

                <p><strong>b) Transferencias con consentimiento</strong></p>

                <ul>
                    <li>
                        En caso de enviar materiales comerciales o promociones conjuntas
                        con terceros (previo consentimiento del Usuario).
                    </li>
                </ul>

                <p>
                    En todos los casos, INNOVA CODIGO exige a terceros medidas
                    de seguridad equivalentes a las previstas por la ley mexicana.
                </p>

                <p><strong>5. USO DE COOKIES Y TECNOLOGÍAS SIMILARES</strong></p>

                <p>Nuestro sitio web utiliza:</p>

                <ul>
                    <li>Cookies</li>
                    <li>Web beacons</li>
                    <li>Herramientas de análisis (como Google Analytics)</li>
                </ul>

                <p>Esto con fines de:</p>

                <ul>
                    <li>Mejorar la experiencia del usuario.</li>
                    <li>Analizar tráfico y rendimiento.</li>
                    <li>Recordar configuraciones y preferencias.</li>
                </ul>

                <p>
                    El Usuario puede deshabilitar las cookies desde su navegador,
                    aunque esto podría limitar el funcionamiento de algunas funciones
                    del Sitio o de la plataforma SaaS.
                </p>

                <p><strong>6. MEDIDAS DE SEGURIDAD</strong></p>

                <p>
                    INNOVA CODIGO implementa medidas administrativas, técnicas y físicas
                    para proteger los datos personales contra:
                </p>

                <ul>
                    <li>Acceso no autorizado</li>
                    <li>Pérdida</li>
                    <li>Uso indebido</li>
                    <li>Alteración o destrucción</li>
                </ul>

                <p>
                    Incluyendo cifrado, controles de acceso, firewalls,
                    monitoreo, auditorías y políticas internas de seguridad.
                </p>

                <p><strong>7. DERECHOS ARCO Y REVOCACIÓN DEL CONSENTIMIENTO</strong></p>

                <p>
                    El Usuario puede ejercer en cualquier momento sus derechos:
                </p>

                <ul>
                    <li><strong>Acceso</strong>: conocer los datos que se tienen.</li>
                    <li><strong>Rectificación</strong>: corregir datos incorrectos.</li>
                    <li>
                        <strong>Cancelación</strong>: solicitar que se eliminen los datos
                        cuando sea legalmente procedente.
                    </li>
                    <li>
                        <strong>Oposición</strong>: detener el uso de los datos
                        para ciertos fines.
                    </li>
                </ul>

                <p>
                    Así como <strong>revocar su consentimiento</strong>
                    para el tratamiento.
                </p>

                <p>
                    Para ejercerlos, deberá enviar un correo a:
                    <strong>contacto@innovacodigo.com</strong>
                </p>

                <p>Incluyendo:</p>

                <ol>
                    <li>Nombre completo</li>
                    <li>Descripción clara del derecho que desea ejercer</li>
                    <li>Identificación oficial</li>
                    <li>Correo asociado a su cuenta</li>
                </ol>

                <p>
                    INNOVA CODIGO responderá conforme a los plazos establecidos
                    por la Ley Federal de Protección de Datos Personales
                    en Posesión de los Particulares.
                </p>

                <p><strong>8. CONSERVACIÓN DE LOS DATOS</strong></p>

                <p>
                    Los datos se conservarán únicamente por el tiempo necesario para:
                </p>

                <ul>
                    <li>Cumplir las finalidades del servicio,</li>
                    <li>Cumplir obligaciones legales,</li>
                    <li>Mantener registros operativos por un periodo razonable.</li>
                </ul>

                <p>
                    Una vez concluido el plazo, los datos serán eliminados o anonimizados.
                </p>

                <p><strong>9. CAMBIOS AL AVISO DE PRIVACIDAD</strong></p>

                <p>
                    INNOVA CODIGO podrá actualizar este Aviso de Privacidad
                    en cualquier momento.
                </p>

                <p>
                    Los cambios serán publicados en:
                    <a href="https://bi-desk.com/" title="https://bi-desk.com/">
                        <strong>innovacodigo.com</strong>
                    </a>
                </p>

                <p>
                    El uso continuo de los Servicios después de la publicación
                    implica la aceptación de las modificaciones.
                </p>

                <p><strong>10. ACEPTACIÓN</strong></p>

                <p>
                    Al proporcionar sus datos, navegar en el sitio,
                    contratar o utilizar los servicios de INNOVA CODIGO,
                    el Usuario reconoce que ha leído, entendido y aceptado
                    el presente Aviso de Privacidad.
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
                <h1 id="privacy-policy"><strong>Privacy Policy</strong></h1>

                <p><strong>BOTTLENECK CART, S.A. DE C.V. (<strong>INNOVA CODIGO</strong>)</strong></p>

                <p><strong>1. IDENTITY AND ADDRESS OF THE DATA CONTROLLER</strong></p>

                <p>
                    BOTTLENECK CART, S.A. DE C.V. (“INNOVA CODIGO”, “the Company” or “the Controller”), with address at
                    <strong>
                        Avenida Homero No. 205, Piso 10, Colonia Polanco V Sección, Alcaldía Miguel Hidalgo, C.P. 11560, Mexico City
                    </strong>,
                    is responsible for the processing, use, and protection of the personal data it collects.
                </p>

                <p>
                    Website:
                    <a href="https://bi-desk.com/" title="https://bi-desk.com/">
                        <strong>innovacodigo.com</strong>
                    </a>
                </p>

                <p>
                    Contact email:
                    <strong>contacto@innovacodigo.com</strong>
                </p>

                <p><strong>2. PERSONAL DATA WE COLLECT</strong></p>

                <p>
                    INNOVA CODIGO may collect the following categories of personal data:
                </p>

                <p><strong>a) Identification and contact data</strong></p>

                <ul>
                    <li>Name, email address, phone number, address</li>
                </ul>

                <p><strong>b) Billing and financial data</strong></p>

                <ul>
                    <li>
                        Tax ID (RFC), business name, tax address, payment method
                        (without storing sensitive card data).
                    </li>
                </ul>

                <p><strong>c) Technical and analytical data</strong></p>

                <ul>
                    <li>
                        IP address, cookies, unique identifiers, activity logs,
                        usage statistics.
                    </li>
                </ul>

                <p><strong>d) Information entered by the User into SaaS services</strong></p>

                <p>Including but not limited to:</p>

                <ul>
                    <li>Databases provided by the User.</li>
                    <li>
                        Information contained in dashboards, surveys, metrics,
                        predictions, models, and files uploaded to the platform.
                    </li>
                </ul>

                <p>
                    <strong>INNOVA CODIGO does not collect sensitive personal data</strong>,
                    except when the User voluntarily uploads such information to the platform
                    as part of the use of the services.
                </p>

                <p><strong>3. PURPOSES OF DATA PROCESSING</strong></p>

                <p>The personal data will be used for the following purposes:</p>

                <p><strong>Primary Purposes (necessary):</strong></p>

                <ul>
                    <li>
                        To provide the contracted SaaS, BI, analytics, surveys,
                        dashboards, and consulting services.
                    </li>
                    <li>To create, manage, and administer user accounts.</li>
                    <li>
                        To provide technical support, maintenance, updates,
                        and customer service.
                    </li>
                    <li>To process payments, invoicing, and tax receipts.</li>
                    <li>
                        To configure integrations, automations, and digital tools
                        offered by INNOVA CODIGO.
                    </li>
                    <li>
                        To contact the User regarding follow-ups, notifications,
                        changes, expirations, and renewals.
                    </li>
                    <li>
                        To guarantee the security, integrity, and proper functioning
                        of the platform.
                    </li>
                </ul>

                <p><strong>Secondary Purposes (optional):</strong></p>

                <ul>
                    <li>
                        To send commercial communications, newsletters,
                        or promotional information.
                    </li>
                    <li>
                        To generate statistical analyses and internal studies
                        for service improvements.
                    </li>
                    <li>To conduct satisfaction surveys.</li>
                </ul>

                <p>
                    The User may <strong>deny or revoke</strong> consent
                    regarding the secondary purposes by sending an email to
                    <strong>contacto@innovacodigo.com</strong>.
                </p>

                <p><strong>4. TRANSFER OF PERSONAL DATA</strong></p>

                <p>
                    INNOVA CODIGO may share personal data only
                    in the following cases:
                </p>

                <p><strong>a) Necessary transfers without consent</strong></p>

                <ul>
                    <li>Competent authorities when legally required.</li>
                    <li>
                        Technology service providers
                        (hosting, data processing, security, payments)
                        solely to fulfill the purposes of the service.
                    </li>
                    <li>
                        Business partners strictly for the execution
                        of the contracted services.
                    </li>
                </ul>

                <p><strong>b) Transfers with consent</strong></p>

                <ul>
                    <li>
                        In the event of sending commercial materials or joint promotions
                        with third parties (with the User’s prior consent).
                    </li>
                </ul>

                <p>
                    In all cases, INNOVA CODIGO requires third parties
                    to implement security measures equivalent
                    to those established by Mexican law.
                </p>

                <p><strong>5. USE OF COOKIES AND SIMILAR TECHNOLOGIES</strong></p>

                <p>Our website uses:</p>

                <ul>
                    <li>Cookies</li>
                    <li>Web beacons</li>
                    <li>Analytics tools (such as Google Analytics)</li>
                </ul>

                <p>For the purposes of:</p>

                <ul>
                    <li>Improving the user experience.</li>
                    <li>Analyzing traffic and performance.</li>
                    <li>Remembering settings and preferences.</li>
                </ul>

                <p>
                    The User may disable cookies through their browser,
                    although this may limit the operation of certain features
                    of the Website or the SaaS platform.
                </p>

                <p><strong>6. SECURITY MEASURES</strong></p>

                <p>
                    INNOVA CODIGO implements administrative, technical, and physical measures
                    to protect personal data against:
                </p>

                <ul>
                    <li>Unauthorized access</li>
                    <li>Loss</li>
                    <li>Improper use</li>
                    <li>Alteration or destruction</li>
                </ul>

                <p>
                    Including encryption, access controls, firewalls,
                    monitoring, audits, and internal security policies.
                </p>

                <p><strong>7. ARCO RIGHTS AND REVOCATION OF CONSENT</strong></p>

                <p>
                    The User may exercise their rights at any time:
                </p>

                <ul>
                    <li><strong>Access</strong>: to know what data is held.</li>
                    <li><strong>Rectification</strong>: to correct inaccurate data.</li>
                    <li>
                        <strong>Cancellation</strong>: to request deletion of data
                        when legally applicable.
                    </li>
                    <li>
                        <strong>Opposition</strong>: to stop the use of data
                        for certain purposes.
                    </li>
                </ul>

                <p>
                    As well as <strong>revoking consent</strong>
                    for data processing.
                </p>

                <p>
                    To exercise these rights, the User must send an email to:
                    <strong>contacto@innovacodigo.com</strong>
                </p>

                <p>Including:</p>

                <ol>
                    <li>Full name</li>
                    <li>Clear description of the right they wish to exercise</li>
                    <li>Official identification</li>
                    <li>Email associated with their account</li>
                </ol>

                <p>
                    INNOVA CODIGO will respond in accordance with the deadlines established
                    by the Federal Law on Protection of Personal Data
                    Held by Private Parties.
                </p>

                <p><strong>8. DATA RETENTION</strong></p>

                <p>
                    Data will be retained only for the time necessary to:
                </p>

                <ul>
                    <li>Fulfill the purposes of the service,</li>
                    <li>Comply with legal obligations,</li>
                    <li>Maintain operational records for a reasonable period.</li>
                </ul>

                <p>
                    Once the retention period has ended,
                    the data will be deleted or anonymized.
                </p>

                <p><strong>9. CHANGES TO THE PRIVACY NOTICE</strong></p>

                <p>
                    INNOVA CODIGO may update this Privacy Notice
                    at any time.
                </p>

                <p>
                    Changes will be published at:
                    <a href="https://bi-desk.com/" title="https://bi-desk.com/">
                        <strong>innovacodigo.com</strong>
                    </a>
                </p>

                <p>
                    Continued use of the Services after publication
                    implies acceptance of the modifications.
                </p>

                <p><strong>10. ACCEPTANCE</strong></p>

                <p>
                    By providing personal data, browsing the website,
                    contracting, or using the services of INNOVA CODIGO,
                    the User acknowledges that they have read,
                    understood, and accepted
                    this Privacy Notice.
                </p>


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
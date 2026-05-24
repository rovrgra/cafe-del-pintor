import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ReservationPayload = {
  nombre?: string;
  telefono?: string;
  correo?: string;
  fecha?: string;
  hora?: string;
  personas?: string;
  comentario?: string;
};

const requiredFields: Array<keyof ReservationPayload> = [
  "nombre",
  "telefono",
  "correo",
  "fecha",
  "hora",
  "personas",
];

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ReservationPayload;
    const missingField = requiredFields.find((field) => !payload[field]);

    if (missingField) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios para enviar la reserva." },
        { status: 400 },
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const fromEmail = process.env.RESERVATION_FROM_EMAIL || smtpUser;
    const toEmail =
      process.env.RESERVATION_TO_EMAIL || "cafedelpintor@hotmail.com";

    if (!smtpHost || !smtpUser || !smtpPass || !fromEmail) {
      return NextResponse.json(
        {
          error:
            "El envío automático aún no está configurado. Faltan el usuario SMTP, clave SMTP o correo remitente de Brevo.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = "Solicitud de reserva - Café del Pintor";
    const text = `
Nombre: ${payload.nombre}
Teléfono: ${payload.telefono}
Correo: ${payload.correo}
Fecha: ${payload.fecha}
Hora: ${payload.hora}
Personas: ${payload.personas}
Comentario: ${payload.comentario || "Sin comentario"}
    `.trim();

    const info = await transporter.sendMail({
      from: `"Reservas Café del Pintor" <${fromEmail}>`,
      to: toEmail,
      cc: payload.correo,
      subject,
      text,
    });

    if (!info.accepted?.length || info.rejected?.length) {
      return NextResponse.json(
        {
          error:
            "Brevo no aceptó todos los destinatarios. Revisa el remitente verificado y los logs transaccionales en Brevo.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message.includes("Authentication unsuccessful") ||
        error.message.includes("EAUTH") ||
        error.message.includes("basic authentication is disabled"))
    ) {
      return NextResponse.json(
        {
          error:
            "Outlook rechazó el envío automático. La cuenta debe habilitar SMTP autenticado, usar una contraseña de aplicación o conectarse con OAuth/Microsoft Graph.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "No se pudo enviar la reserva. Inténtalo nuevamente." },
      { status: 500 },
    );
  }
}

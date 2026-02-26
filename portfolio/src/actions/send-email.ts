"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailResult {
    success: boolean;
    message: string;
}

export async function sendEmail(formData: FormData): Promise<SendEmailResult> {
    const senderEmail = formData.get("senderEmail") as string | null;
    const message = formData.get("message") as string | null;

    // ── Basic validation ────────────────────────────────────────────────────────
    if (!senderEmail || !message) {
        return { success: false, message: "Please fill in all fields." };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
        return { success: false, message: "Please provide a valid email address." };
    }

    if (message.length > 5000) {
        return { success: false, message: "Message is too long (max 5 000 chars)." };
    }

    // ── Send via Resend ─────────────────────────────────────────────────────────
    try {
        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "xanthosis122@gmail.com",
            subject: `Portfolio Message from ${senderEmail}`,
            replyTo: senderEmail,
            text: `From: ${senderEmail}\n\n${message}`,
        });

        return { success: true, message: "Message sent successfully!" };
    } catch (error) {
        console.error("Resend error:", error);
        return {
            success: false,
            message: "Failed to send message. Please try again later.",
        };
    }
}

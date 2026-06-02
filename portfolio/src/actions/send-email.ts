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
        const { data, error } = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: "xanthosis122@gmail.com",
            subject: `Portfolio Message from ${senderEmail}`,
            replyTo: senderEmail,
            text: `From: ${senderEmail}\n\n${message}`,
        });

        // CRITICAL FIX: Resend SDK returns an error object on failure instead of throwing
        if (error) {
            console.error("Resend API error:", error);
            return { success: false, message: error.message };
        }

        return { success: true, message: "Message sent successfully! I will get back to you soon." };
    } catch (error: any) {
        console.error("Resend execution error:", error);
        return {
            success: false,
            message: "Failed to connect to the email server. Please try again later.",
        };
    }
}

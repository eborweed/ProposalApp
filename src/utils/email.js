// Simple EmailJS wrapper
import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const OWNER_EMAIL = import.meta.env.VITE_OWNER_EMAIL; // where to send

export async function sendEventEmail({ event, loveCount = 0, page = "home" }) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    if (import.meta.env.DEV) {
      console.warn("[email] Missing EmailJS env vars; skipping send.", { event, loveCount, page });
    }
    return;
  }
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        event,
        loveCount,
        page,
        to_email: OWNER_EMAIL || "",
      },
      { publicKey: PUBLIC_KEY }
    );
  } catch (e) {
    // swallow errors in prod for UX; log in dev
    if (import.meta.env.DEV) console.error("[email] send failed:", e);
  }
}

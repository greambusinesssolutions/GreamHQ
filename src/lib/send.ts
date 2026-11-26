// Sends a form to its endpoint (JSON, Formspree-compatible). With no endpoint it opens
// the visitor's email app addressed to hello@greamhq.com with their answers filled in.
export async function sendForm(endpoint: string, email: string, subject: string, data: Record<string, string>): Promise<"sent" | "mail"> {
  if (endpoint) {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, _subject: subject }),
    });
    if (!r.ok) throw new Error(`Form endpoint returned ${r.status}`);
    return "sent";
  }
  const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return "mail";
}

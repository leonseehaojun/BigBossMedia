import { useState, type ChangeEvent, type FormEvent } from "react";

type Feedback = { type: "success" | "error"; message: string } | null;

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setFeedback(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      setForm({ name: "", email: "", message: "" });
      setFeedback({
        type: "success",
        message: data?.message || "We received your message and will respond soon.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again later.";
      setFeedback({ type: "error", message });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="contact-card">
      <h3>Send us a message</h3>
      <p>Tell us about your project and the impact you’d like to make.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-row">
          <label className="contact-field">
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </label>
          <label className="contact-field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
          </label>
        </div>

        <label className="contact-field">
          <span>What should we know?</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Share goals, timelines or references so we can prepare"
            rows={5}
            required
          />
        </label>

        <button type="submit" disabled={status === "loading"} className="btn full">
          {status === "loading" ? "Sending..." : "Send message"}
        </button>

        <div className="form-feedback" aria-live="polite" role="status">
          {feedback ? (
            <p className={feedback.type === "success" ? "is-success" : "is-error"}>
              {feedback.message}
            </p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100 mt-10">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Send Us a Message</h3>
      <p className="text-gray-500 mb-6">
        Please fill in the form below to get in touch with us.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name & Email in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400"
            />
            <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400"
            />
        </div>

        {/* Message */}
        <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="border border-gray-300 rounded-md px-4 py-3 focus:ring-2 focus:ring-black focus:outline-none placeholder-gray-400 resize-none"
        ></textarea>

        {/* Centered Submit button BELOW */}
        <div className="flex justify-center mt-2">
            <button
            type="submit"
            disabled={status === "loading"}
            className="bg-black text-white font-semibold px-8 py-3 rounded-md hover:bg-gray-800 transition"
            >
            {status === "loading" ? "Sending..." : "Send Message"}
            </button>
        </div>

        {status === "success" && (
            <p className="text-green-600 text-center mt-2">
            ✅ Message sent successfully!
            </p>
        )}
        {status === "error" && (
            <p className="text-red-600 text-center mt-2">
            ❌ Failed to send message. Please try again later.
            </p>
        )}
        </form>
    </div>
  );
}

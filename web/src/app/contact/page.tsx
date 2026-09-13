"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<Status>("idle");
  const [newsletterError, setNewsletterError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contactStatus, setContactStatus] = useState<Status>("idle");
  const [contactError, setContactError] = useState("");

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch (err) {
      setNewsletterStatus("error");
      setNewsletterError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactStatus("loading");
    setContactError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setContactStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setContactStatus("error");
      setContactError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClasses =
    "w-full rounded-2xl border border-white/10 bg-[#0A0C10] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[#D4AF37]/60 focus:ring-1 focus:ring-[#D4AF37]/40";

  return (
    <div className="min-h-screen bg-[#0A0C10] text-white">
      <Header />
      <main className="py-24">
        <div className="mx-auto max-w-3xl px-6 sm:px-10 lg:px-16">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/60">Contact</p>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Get in touch.
          </h1>

          {/* Newsletter */}
          <section className="mt-14 rounded-[36px] border border-white/10 bg-[#11131A] px-6 py-8 shadow-[0_30px_70px_rgba(0,0,0,0.32)] sm:px-8 lg:px-10">
            <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">Newsletter</div>
            <p className="mt-4 text-lg leading-8 text-white/72">
              Subscribe for news on workshops as well as updates on new print collections. All
              email addresses will be kept private and never passed onto third parties.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className={`${inputClasses} sm:flex-1`}
              />
              <button
                type="submit"
                disabled={newsletterStatus === "loading"}
                className="rounded-2xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A0C10] transition hover:bg-[#e2c15a] disabled:opacity-60"
              >
                {newsletterStatus === "loading" ? "Sending…" : "Subscribe"}
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-3 text-sm text-[#D4AF37]">Thanks for subscribing!</p>
            )}
            {newsletterStatus === "error" && (
              <p className="mt-3 text-sm text-red-400">{newsletterError}</p>
            )}
          </section>

          {/* Contact form */}
          <section className="mt-10 rounded-[36px] border border-white/10 bg-[#11131A] px-6 py-8 shadow-[0_30px_70px_rgba(0,0,0,0.32)] sm:px-8 lg:px-10">
            <div className="text-xs uppercase tracking-[0.35em] text-[#D4AF37]/80">Direct contact</div>
            <p className="mt-4 text-lg leading-8 text-white/72">
              For information on workshops, prints, licensing or anything else, complete the form
              below or just write me directly to{" "}
              <a href="mailto:tamas@csizmadia.net" className="text-[#D4AF37] hover:underline">
                tamas@csizmadia.net
              </a>{" "}
              and I&apos;ll get back to you as soon as I can.
            </p>
            <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className={inputClasses}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail address"
                  className={inputClasses}
                />
              </div>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className={inputClasses}
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                rows={6}
                className={inputClasses}
              />
              <button
                type="submit"
                disabled={contactStatus === "loading"}
                className="rounded-2xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-[#0A0C10] transition hover:bg-[#e2c15a] disabled:opacity-60"
              >
                {contactStatus === "loading" ? "Sending…" : "Submit"}
              </button>
            </form>
            {contactStatus === "success" && (
              <p className="mt-3 text-sm text-[#D4AF37]">Thanks — your message has been sent!</p>
            )}
            {contactStatus === "error" && (
              <p className="mt-3 text-sm text-red-400">{contactError}</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

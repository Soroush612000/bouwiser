import { Building2, Mail, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = () => {
    const emailSubject =
      subject.trim() || "Bouwiser website enquiry";

    const emailBody = [
      `Name: ${name.trim() || "Not provided"}`,
      `Email: ${email.trim() || "Not provided"}`,
      "",
      "Message:",
      message.trim() || "No message provided",
    ].join("\n");

    const mailtoLink =
      `mailto:bouwiser.nl@gmail.com` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left side */}
          <section>
            <div className="inline-flex items-center gap-2 text-sm font-black text-orange-500">
              <Mail className="h-4 w-4" />
              Contact Bouwiser
            </div>

            <h1 className="mt-5 max-w-xl text-5xl font-black tracking-tight sm:text-6xl">
              Questions, feedback or partnership interest?
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              We welcome questions and feedback from homeowners, suppliers,
              manufacturers and renovation professionals.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:bouwiser.nl@gmail.com"
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-orange-200 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>

                <div>
                  <p className="font-black">General enquiries</p>
                  <p className="mt-1 text-sm text-slate-500">
                    bouwiser.nl@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <Building2 className="h-5 w-5 text-orange-500" />
                </div>

                <div>
                  <p className="font-black">
                    Supplier &amp; partner enquiries
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Manufacturers, suppliers and renovation professionals
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact form */}
          <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Subject
              </label>

              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="What would you like to discuss?"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Message
              </label>

              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Tell us how we can help..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              type="button"
              onClick={handleContact}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              Contact Bouwiser
              <Send className="h-4 w-4" />
            </button>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              Clicking the button opens your email application with your
              message prepared for Bouwiser.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

import { Building2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";

export default function Contact() {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleContact = () => {
    const emailSubject =
      subject.trim() || t("contactPage.email.defaultSubject");

    const emailBody = [
      `${t("contactPage.email.name")}: ${
        name.trim() || t("contactPage.email.notProvided")
      }`,
      `${t("contactPage.email.email")}: ${
        email.trim() || t("contactPage.email.notProvided")
      }`,
      "",
      `${t("contactPage.email.message")}:`,
      message.trim() || t("contactPage.email.noMessage"),
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
              {t("contactPage.hero.eyebrow")}
            </div>

            <h1 className="mt-5 max-w-xl text-5xl font-black tracking-tight sm:text-6xl">
              {t("contactPage.hero.title")}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              {t("contactPage.hero.description")}
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
                  <p className="font-black">
                    {t("contactPage.general.title")}
                  </p>

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
                    {t("contactPage.partners.title")}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {t("contactPage.partners.description")}
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
                  {t("contactPage.form.name")}
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t("contactPage.form.namePlaceholder")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  {t("contactPage.form.email")}
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
                {t("contactPage.form.subject")}
              </label>

              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder={t("contactPage.form.subjectPlaceholder")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                {t("contactPage.form.message")}
              </label>

              <textarea
                id="message"
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t("contactPage.form.messagePlaceholder")}
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <button
              type="button"
              onClick={handleContact}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-bold text-white transition hover:bg-orange-600"
            >
              {t("contactPage.form.button")}
              <Send className="h-4 w-4" />
            </button>

            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              {t("contactPage.form.note")}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
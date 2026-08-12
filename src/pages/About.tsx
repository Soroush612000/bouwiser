import { Bot, Leaf, Search, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";

export default function About() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Search,
      title: t("aboutPage.pillars.comparison.title"),
      text: t("aboutPage.pillars.comparison.text"),
    },
    {
      icon: Bot,
      title: t("aboutPage.pillars.decisions.title"),
      text: t("aboutPage.pillars.decisions.text"),
    },
    {
      icon: Leaf,
      title: t("aboutPage.pillars.sustainability.title"),
      text: t("aboutPage.pillars.sustainability.text"),
    },
    {
      icon: ShieldCheck,
      title: t("aboutPage.pillars.transparency.title"),
      text: t("aboutPage.pillars.transparency.text"),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              {t("aboutPage.hero.eyebrow")}
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
              {t("aboutPage.hero.title")}
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
              {t("aboutPage.hero.description")}
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-slate-50 px-6 py-16 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <Icon className="h-7 w-7 text-orange-500" />

                <h2 className="mt-5 text-xl font-black">
                  {title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Vision */}
        <section className="px-6 py-16 lg:px-10">
          <div className="mx-auto max-w-7xl rounded-[36px] bg-orange-500 p-10 text-white">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-orange-100">
              {t("aboutPage.vision.eyebrow")}
            </p>

            <h2 className="mt-3 text-4xl font-black">
              {t("aboutPage.vision.title")}
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-orange-50">
              {t("aboutPage.vision.description")}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
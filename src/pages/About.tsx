import { Bot, Leaf, Search, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

const pillars = [
  {
    icon: Search,
    title: "Simplify comparison",
    text:
      "Bring fragmented product, material, cost and renovation information together in one structured environment.",
  },
  {
    icon: Bot,
    title: "Guide smarter decisions",
    text:
      "Combine property information, renovation goals and digital guidance to help homeowners identify relevant options.",
  },
  {
    icon: Leaf,
    title: "Support sustainable renovation",
    text:
      "Make energy performance, renovation measures and sustainable material choices easier to understand and compare.",
  },
  {
    icon: ShieldCheck,
    title: "Improve transparency",
    text:
      "Provide clearer information about products, specifications, suppliers, costs and performance.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">
              About Bouwiser
            </p>

            <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">
              Making home renovation decisions smarter, clearer and more sustainable
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
              Bouwiser is a digital platform designed to make residential
              renovation decisions easier and more transparent in the
              Netherlands. By bringing together renovation guidance, energy
              insights, product and material information, comparison tools and
              supplier information, Bouwiser helps homeowners understand their
              options and make better-informed decisions for their homes.
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
              Our vision
            </p>

            <h2 className="mt-3 text-4xl font-black">
              A smarter and more connected renovation ecosystem
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-orange-50">
              Bouwiser aims to create a transparent digital environment where
              homeowners can move from understanding their renovation needs to
              exploring suitable measures, comparing products and materials,
              and connecting with relevant suppliers and renovation
              professionals.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

import { Bot, Leaf, Search, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

const pillars = [
  { icon: Search, title: "Simplify comparison", text: "Bring fragmented renovation and product information into one digital environment." },
  { icon: Bot, title: "AI-guided decisions", text: "Use property information and renovation goals to provide more relevant recommendations." },
  { icon: Leaf, title: "Support sustainability", text: "Make energy performance and sustainable material choices easier to understand." },
  { icon: ShieldCheck, title: "Improve transparency", text: "Present clearer product, supplier, cost and performance information." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-slate-950"><Navbar /><main>
      <section className="px-6 py-20 lg:px-10"><div className="mx-auto max-w-7xl"><p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">About Bouwiser</p><h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight sm:text-6xl">Making renovation decisions simpler, clearer and more sustainable</h1><p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">Bouwiser is a digital renovation platform being developed for homeowners and renovation professionals in the Netherlands. The platform combines AI guidance, energy insights, product comparison and supplier information.</p></div></section>
      <section className="bg-slate-50 px-6 py-16 lg:px-10"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">{pillars.map(({ icon: Icon, title, text }) => (<article key={title} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"><Icon className="h-7 w-7 text-orange-500" /><h2 className="mt-5 text-xl font-black">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-500">{text}</p></article>))}</div></section>
      <section className="px-6 py-16 lg:px-10"><div className="mx-auto max-w-7xl rounded-[36px] bg-orange-500 p-10 text-white"><p className="text-sm font-black uppercase tracking-[0.18em] text-orange-100">Current stage</p><h2 className="mt-3 text-4xl font-black">Live prototype under active development</h2><p className="mt-4 max-w-3xl leading-7 text-orange-50">The current version demonstrates the product direction, user registration, dashboard, AI Home Scan flow, energy insights and product comparison concept.</p></div></section>
    </main></div>
  );
}

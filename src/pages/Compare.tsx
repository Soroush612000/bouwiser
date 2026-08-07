import { Check, Leaf, Search, ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";

const products = [
  { name: "PIR Roof Insulation Panel", category: "Roof insulation", supplier: "Example Supplier NL", price: "€24.95/m²", sustainability: "Good", performance: "Rd 4.5" },
  { name: "Mineral Wool Insulation", category: "Wall insulation", supplier: "Example Build Store", price: "€18.50/m²", sustainability: "Very good", performance: "Rd 3.7" },
  { name: "Triple Glazing HR+++", category: "Windows", supplier: "Example Glass Partner", price: "€185/m²", sustainability: "High impact", performance: "U 0.7" },
];

export default function Compare() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="px-6 py-16 lg:px-10"><div className="mx-auto max-w-7xl">
        <div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-bold text-orange-600"><ShoppingBag className="h-4 w-4" /> Product comparison</div><h1 className="mt-6 text-5xl font-black tracking-tight">Compare renovation products in one place</h1><p className="mt-5 text-lg leading-8 text-slate-600">Compare indicative price, technical performance, sustainability and supplier information to support better renovation decisions.</p></div>
        <div className="relative mt-10 max-w-xl"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input placeholder="Search insulation, glazing, heat pumps..." className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 shadow-sm outline-none focus:border-orange-400" /></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">{products.map((product) => (<article key={product.name} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600"><Leaf className="h-6 w-6" /></div><p className="mt-5 text-xs font-black uppercase tracking-wider text-orange-500">{product.category}</p><h2 className="mt-2 text-xl font-black">{product.name}</h2><p className="mt-2 text-sm text-slate-500">{product.supplier}</p><div className="mt-6 space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-500">Price</span><strong>{product.price}</strong></div><div className="flex justify-between"><span className="text-slate-500">Performance</span><strong>{product.performance}</strong></div><div className="flex justify-between"><span className="text-slate-500">Sustainability</span><strong>{product.sustainability}</strong></div></div><button type="button" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 font-bold text-white hover:bg-orange-500"><Check className="h-4 w-4" /> Add to comparison</button></article>))}</div>
        <p className="mt-8 text-sm text-slate-400">Prototype product data for demonstration. Supplier feeds and validated product data will be connected later.</p>
      </div></main>
    </div>
  );
}

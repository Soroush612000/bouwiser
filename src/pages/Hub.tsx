import { Building2, Handshake, PackageSearch, Star } from "lucide-react";
import Navbar from "../components/Navbar";

const suppliers = [
  { name: "Example Insulation Partner", specialty: "Insulation", rating: "4.7", products: "42 products" },
  { name: "Example Sustainable Build", specialty: "Eco materials", rating: "4.8", products: "31 products" },
  { name: "Example Energy Solutions", specialty: "Heat pumps & solar", rating: "4.6", products: "28 products" },
];

export default function Hub() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950"><Navbar /><main className="px-6 py-16 lg:px-10"><div className="mx-auto max-w-7xl">
      <div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"><Handshake className="h-4 w-4" /> Supplier & partner hub</div><h1 className="mt-6 text-5xl font-black tracking-tight">Transparent access to suppliers and renovation partners</h1><p className="mt-5 text-lg leading-8 text-slate-600">Bouwiser is building a structured network of manufacturers, suppliers and renovation professionals to make product information easier to compare.</p></div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">{suppliers.map((supplier) => (<article key={supplier.name} className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><Building2 className="h-6 w-6" /></div><h2 className="mt-5 text-xl font-black">{supplier.name}</h2><p className="mt-2 text-sm text-slate-500">{supplier.specialty}</p><div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4"><span className="flex items-center gap-2 text-sm font-bold"><Star className="h-4 w-4 text-orange-500" />{supplier.rating}</span><span className="text-sm text-slate-500">{supplier.products}</span></div></article>))}</div>
      <div className="mt-10 rounded-[32px] bg-slate-950 p-8 text-white"><PackageSearch className="h-8 w-8 text-orange-400" /><h2 className="mt-5 text-3xl font-black">Partner onboarding is in development</h2><p className="mt-3 max-w-2xl leading-7 text-slate-400">Future versions will support structured supplier profiles, verified product data, customer reviews and partner collaboration.</p></div>
    </div></main></div>
  );
}

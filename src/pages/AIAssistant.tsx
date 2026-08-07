import { Bot, CheckCircle2, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const suggestions = [
  "Which renovation should I do first?",
  "How can I improve my energy label?",
  "Compare roof insulation options",
  "What subsidies may be relevant?",
];

export default function AIAssistant() {
  const [message, setMessage] = useState("");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <main className="px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700"><Sparkles className="h-4 w-4" /> Bouwiser AI Assistant</div>
            <h1 className="mt-6 text-5xl font-black tracking-tight">Renovation guidance in one conversation</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">Ask about renovation priorities, energy performance, products, sustainability and indicative costs.</p>
          </div>

          <section className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 p-6"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-orange-400"><Bot className="h-6 w-6" /></div><div><p className="font-black">Bouwiser AI</p><p className="text-sm text-emerald-600">Prototype assistant · online</p></div></div></div>
            <div className="min-h-[360px] bg-slate-50 p-6">
              <div className="max-w-xl rounded-2xl rounded-tl-sm bg-white p-5 shadow-sm"><p className="font-bold">How can I help with your renovation?</p><p className="mt-2 text-sm leading-6 text-slate-500">I can help you understand possible measures, compare options and prepare the next steps for your home.</p></div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">{suggestions.map((item) => (<button type="button" key={item} onClick={() => setMessage(item)} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left text-sm font-bold transition hover:border-orange-300 hover:bg-orange-50"><CheckCircle2 className="h-5 w-5 text-orange-500" />{item}</button>))}</div>
            </div>
            <div className="flex gap-3 border-t border-slate-100 p-5"><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask Bouwiser AI..." className="h-12 flex-1 rounded-xl border border-slate-200 px-4 outline-none focus:border-orange-400" /><button type="button" className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white hover:bg-orange-600" aria-label="Send message"><Send className="h-5 w-5" /></button></div>
          </section>
          <p className="mt-5 text-center text-sm text-slate-400">Prototype interface. Live AI responses will be connected in the next development stage.</p>
        </div>
      </main>
    </div>
  );
}

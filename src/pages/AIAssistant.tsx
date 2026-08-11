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

      <main className="px-6 py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-6xl">

          {/* Hero */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
              <Sparkles className="h-4 w-4" />
              Bouwiser AI Assistant
            </div>

            <h1 className="mx-auto mt-4 max-w-5xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Renovation guidance in one conversation
            </h1>
          </div>

          {/* Assistant */}
          <section className="mx-auto mt-8 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

            {/* Assistant header */}
            <div className="flex items-center gap-3 border-b border-slate-100 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-orange-400">
                <Bot className="h-6 w-6" />
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  Bouwiser AI
                </p>

                <p className="text-sm text-slate-500">
                  Renovation guidance assistant
                </p>
              </div>
            </div>

            {/* Conversation area */}
            <div className="p-5 sm:p-6">

              {/* Welcome message */}
              <div className="max-w-2xl rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="font-bold text-slate-900">
                  How can I help with your renovation?
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Ask about renovation priorities, energy performance,
                  products, sustainability and indicative costs. I can help
                  you understand possible measures, compare options and
                  prepare the next steps for your home.
                </p>
              </div>

              {/* Suggested questions */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setMessage(item)}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left font-medium text-slate-700 transition hover:border-orange-300 hover:bg-orange-50"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-500" />
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <div className="flex gap-3 border-t border-slate-100 p-5">
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Ask Bouwiser AI..."
                className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              />

              <button
                type="button"
                aria-label="Send message"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm transition hover:bg-orange-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
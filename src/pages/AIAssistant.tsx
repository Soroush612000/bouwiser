import {
  Bot,
  CheckCircle2,
  LoaderCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { FormEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTranslation } from "react-i18next";

import Navbar from "../components/Navbar";
import { supabase } from "../utils/supabase";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function AIAssistant() {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    t("aiAssistant.suggestions.first"),
    t("aiAssistant.suggestions.energyLabel"),
    t("aiAssistant.suggestions.compareRoof"),
    t("aiAssistant.suggestions.subsidies"),
  ];

  const sendMessage = async (event?: FormEvent) => {
    event?.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setError("");

    const conversationHistory = messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [...current, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const { data, error: functionError } =
        await supabase.functions.invoke("bouwiser-ai", {
          body: {
            message: trimmedMessage,
            history: conversationHistory,
          },
        });

      if (functionError) {
        throw functionError;
      }

      if (!data?.answer) {
        throw new Error("Bouwiser AI returned no answer.");
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (requestError) {
      console.error("Bouwiser AI error:", requestError);

      setError(
        requestError instanceof Error
          ? requestError.message
          : "Bouwiser AI could not answer your question.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <main className="px-6 py-10 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
              <Sparkles className="h-4 w-4" />
              {t("aiAssistant.badge")}
            </div>

            <h1 className="mx-auto mt-4 max-w-5xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              {t("aiAssistant.title")}
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
                  {t("aiAssistant.subtitle")}
                </p>
              </div>
            </div>

            {/* Conversation area */}
            <div className="max-h-[620px] min-h-[420px] overflow-y-auto p-5 sm:p-6">
              {/* Welcome message */}
              {messages.length === 0 && (
                <>
                  <div className="max-w-2xl rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="font-bold text-slate-900">
                      {t("aiAssistant.welcomeTitle")}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {t("aiAssistant.welcomeDescription")}
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
                </>
              )}

              {/* Chat messages */}
              {messages.length > 0 && (
                <div className="space-y-5">
                  {messages.map((chatMessage) => (
                    <div
                      key={chatMessage.id}
                      className={`flex ${
                        chatMessage.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-3xl rounded-2xl px-5 py-4 text-sm leading-7 ${
                          chatMessage.role === "user"
                            ? "bg-orange-500 text-white"
                            : "border border-slate-200 bg-slate-50 text-slate-700"
                        }`}
                      >
                        {chatMessage.role === "assistant" && (
                          <div className="mb-3 flex items-center gap-2 font-bold text-slate-950">
                            <Bot className="h-4 w-4 text-orange-500" />
                            Bouwiser AI
                          </div>
                        )}

                        {chatMessage.role === "assistant" ? (
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => (
                                <h1 className="mb-3 mt-5 text-2xl font-black text-slate-950 first:mt-0">
                                  {children}
                                </h1>
                              ),

                              h2: ({ children }) => (
                                <h2 className="mb-3 mt-5 text-xl font-black text-slate-950 first:mt-0">
                                  {children}
                                </h2>
                              ),

                              h3: ({ children }) => (
                                <h3 className="mb-2 mt-4 text-base font-bold text-slate-950 first:mt-0">
                                  {children}
                                </h3>
                              ),

                              p: ({ children }) => (
                                <p className="my-3 leading-7 first:mt-0 last:mb-0">
                                  {children}
                                </p>
                              ),

                              strong: ({ children }) => (
                                <strong className="font-bold text-slate-950">
                                  {children}
                                </strong>
                              ),

                              ul: ({ children }) => (
                                <ul className="my-3 list-disc space-y-2 pl-6">
                                  {children}
                                </ul>
                              ),

                              ol: ({ children }) => (
                                <ol className="my-3 list-decimal space-y-2 pl-6">
                                  {children}
                                </ol>
                              ),

                              li: ({ children }) => (
                                <li className="pl-1 leading-7">
                                  {children}
                                </li>
                              ),

                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-semibold text-orange-600 underline underline-offset-2 hover:text-orange-700"
                                >
                                  {children}
                                </a>
                              ),

                              code: ({ children }) => (
                                <code className="rounded bg-slate-200 px-1.5 py-0.5 text-[0.9em] text-slate-900">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {chatMessage.content}
                          </ReactMarkdown>
                        ) : (
                          <div className="whitespace-pre-wrap">
                            {chatMessage.content}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-medium text-slate-600">
                        <LoaderCircle className="h-4 w-4 animate-spin text-orange-500" />
                        Bouwiser AI is thinking...
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}
            </div>

            {/* Message input */}
            <form
              onSubmit={sendMessage}
              className="flex gap-3 border-t border-slate-100 p-5"
            >
              <input
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={t("aiAssistant.placeholder")}
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <button
                type="submit"
                disabled={!message.trim() || isLoading}
                aria-label={t("aiAssistant.send")}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isLoading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
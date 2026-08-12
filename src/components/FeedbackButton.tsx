import { MessageSquareText, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSenXiF_5VexVYraJivpjlLmjUbpFUClON9-dE1yeIKFYZF7cw/viewform?embedded=true";

export default function FeedbackButton() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const isDutch = i18n.language?.startsWith("nl");

  return (
    <>
      {/* Floating feedback button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#a90f35] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#8f0d2d]"
      >
        <MessageSquareText className="h-5 w-5" />
        {isDutch ? "Geef feedback" : "Give feedback"}
      </button>

      {/* Feedback modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
            
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {isDutch ? "Geef ons je feedback" : "Give us your feedback"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {isDutch
                    ? "Help ons Bouwiser te verbeteren."
                    : "Help us improve Bouwiser."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close feedback form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Google Form */}
            <iframe
              src={FEEDBACK_FORM_URL}
              title="Bouwiser Feedback Form"
              className="h-full w-full flex-1 border-0"
            />
          </div>
        </div>
      )}
    </>
  );
}
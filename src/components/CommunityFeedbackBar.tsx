import { MessageSquareText, Users, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const COMMUNITY_COUNT = 122;

const FEEDBACK_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSenXiF_5VexVYraJivpjlLmjUbpFUClON9-dE1yeIKFYZF7cw/viewform?embedded=true";

export default function CommunityFeedbackBar() {
  const { i18n } = useTranslation();

  const [communityOpen, setCommunityOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const isDutch = i18n.language?.startsWith("nl");

  return (
    <>
      {/* Floating action group */}
      <div className="fixed bottom-6 right-6 z-40 overflow-hidden rounded-full border border-[#a90f35]/25 bg-white shadow-xl shadow-slate-900/15">
        <div className="flex items-center">

          {/* Community */}
          <button
            type="button"
            onClick={() => setCommunityOpen(true)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-800 transition hover:bg-[#a90f35]/5"
          >
            <Users className="h-5 w-5 text-[#a90f35]" />

            {isDutch ? "Onze community" : "Our Community"}
          </button>

          {/* Divider */}
          <div className="h-7 w-px bg-[#a90f35]/20" />

          {/* Feedback */}
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#a90f35] transition hover:bg-[#a90f35]/5"
          >
            <MessageSquareText className="h-5 w-5" />

            {isDutch ? "Geef feedback" : "Give feedback"}
          </button>

        </div>
      </div>

      {/* Community modal */}
      {communityOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCommunityOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

            {/* Community modal header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {isDutch ? "Onze community" : "Our Community"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {isDutch ? "Bouwiser-community" : "Bouwiser community"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCommunityOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label={isDutch ? "Sluiten" : "Close community"}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Community count */}
            <div className="px-8 py-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#a90f35]/10 text-[#a90f35]">
                <Users className="h-8 w-8" />
              </div>

              <p className="mt-6 text-6xl font-black tracking-tight text-slate-950">
                {COMMUNITY_COUNT}
              </p>

              <p className="mt-2 text-lg font-semibold text-slate-600">
                {isDutch ? "Leden" : "Members"}
              </p>

            </div>
          </div>
        </div>
      )}

      {/* Feedback modal */}
      {feedbackOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setFeedbackOpen(false);
            }
          }}
        >
          <div className="relative flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

            {/* Feedback modal header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  {isDutch
                    ? "Geef ons je feedback"
                    : "Give us your feedback"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {isDutch
                    ? "Help ons Bouwiser te verbeteren."
                    : "Help us improve Bouwiser."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setFeedbackOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label={
                  isDutch ? "Sluiten" : "Close feedback form"
                }
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
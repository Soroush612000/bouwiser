import { Users, X } from "lucide-react";
import { useState } from "react";

const COMMUNITY_COUNT = 114;

export default function CommunityCounter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating community button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-[205px] z-40 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-lg transition hover:bg-slate-50"
      >
        <Users className="h-5 w-5 text-[#a90f35]" />
        Our Community
      </button>

      {/* Community modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Our Community
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Bouwiser community
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close community"
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
                Members
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
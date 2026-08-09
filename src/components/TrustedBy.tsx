import {
  BrainCircuit,
  Home,
  Users,
  Route,
} from "lucide-react";

const items = [
  {
    icon: BrainCircuit,
    title: "AI guidance",
  },
  {
    icon: Home,
    title: "Energy insights",
  },
  {
    icon: Users,
    title: "Renovation expertise",
  },
  {
    icon: Route,
    title: "Personal roadmap",
  },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center justify-center gap-3 py-5 text-slate-600 ${
                  index % 2 !== 0
                    ? "border-l border-slate-200"
                    : ""
                } ${
                  index > 1
                    ? "border-t border-slate-200 lg:border-t-0"
                    : ""
                } ${
                  index > 0
                    ? "lg:border-l lg:border-slate-200"
                    : ""
                }`}
              >
                <Icon
                  className="h-4 w-4 text-[#a90f35]"
                  strokeWidth={1.8}
                />

                <span className="text-sm font-medium">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
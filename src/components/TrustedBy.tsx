export default function TrustedBy() {
    const items = [
      {
        title: "AI Powered",
        subtitle: "Smart renovation advice",
      },
      {
        title: "Energy Label",
        subtitle: "A–G Assessment",
      },
      {
        title: "Building Experts",
        subtitle: "Verified professionals",
      },
      {
        title: "Personal Roadmap",
        subtitle: "Step-by-step guidance",
      },
    ];
  
    return (
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
  
          <p className="text-center text-sm uppercase tracking-[0.25em] text-slate-500">
            Trusted technology for smarter renovation
          </p>
  
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
  
            {items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
  
                <p className="mt-2 text-sm text-slate-500">
                  {item.subtitle}
                </p>
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }
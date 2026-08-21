export default function StatsSection() {
  const stats = [
    { value: '150+', label: 'Homes Designed' },
    { value: '3 Years', label: 'in Residential Design' },
    { value: '5+', label: 'Localities Served' },
    { value: '100%', label: 'Residential Focus' },
  ];

  return (
    <section className="bg-[#141414] text-white py-20 border-t border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[24px_24px] opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/30 transition-all">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-syne text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-white to-amber-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold tracking-widest text-neutral-300 uppercase font-syne">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

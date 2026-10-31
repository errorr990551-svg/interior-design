import PageLink from '../components/PageLink';

export default function NotFoundPage({ onNavigate }) {
  const links = [
    { page: 'home', label: 'Home' },
    { page: 'services', label: 'Services' },
    { page: 'portfolio', label: 'Portfolio' },
    { page: 'about', label: 'About the studio' },
  ];

  return (
    <section className="min-h-[70vh] flex items-center pt-32 pb-24 bg-[#0e0e0e] text-white">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 space-y-6">
        <span className="text-xs font-mono tracking-widest text-amber-300 uppercase">Error 404</span>
        <h1 className="text-4xl sm:text-6xl font-extrabold font-syne tracking-tight uppercase leading-tight">
          Page not found
        </h1>
        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
          The page you were looking for doesn't exist or has moved. Try one of these instead:
        </p>
        <ul className="flex flex-wrap gap-3 pt-2">
          {links.map((l) => (
            <li key={l.page}>
              <PageLink
                page={l.page}
                onNavigate={onNavigate}
                className="inline-block px-5 py-2.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-widest hover:bg-amber-400 hover:text-black hover:border-amber-400 transition-all"
              >
                {l.label}
              </PageLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

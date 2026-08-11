import { ArrowUpRight } from 'lucide-react';

export default function RecentTransformations({ onSelectProject, onViewAll }) {
  const projects = [
    {
      id: 'linden-house',
      title: 'The Linden House',
      dates: '06.2024 – 09.2024',
      type: 'Private Residence',
      focus: 'Natural light, soft material layering, balanced proportions and calm',
      image: '/images/linden-house.jpg',
    },
    {
      id: 'urban-dwelling',
      title: 'Urban Dwelling',
      dates: '02.2024 – 05.2024',
      type: 'Contemporary Restaurant',
      focus: 'Dark material palettes enhancing warmth, depth, and visual.',
      image: '/images/urban-dwelling.jpg',
    },
    {
      id: 'casa-serene',
      title: 'Casa Serene',
      dates: '03.2024 – 07.2024',
      type: 'Residential Renovation',
      focus: 'Thoughtful seating layouts balancing comfort, privacy.',
      image: '/images/casa-serene.jpg',
    },
  ];

  return (
    <section id="work" className="bg-[#f9f9f8] text-[#111111] py-24 sm:py-32 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header matching Screenshot 5 & Screenshot 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-16 border-b border-neutral-300">
          <div className="md:col-span-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight uppercase font-syne text-neutral-900">
              RECENT TRANSFORMATIONS
            </h2>
          </div>

          <div className="md:col-span-6 md:text-right">
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light max-w-xl md:ml-auto">
              A curated selection of our latest interior projects, showcasing thoughtful design, refined details, and timeless spatial character.
            </p>
          </div>
        </div>

        {/* Project Items List */}
        <div className="divide-y divide-neutral-300">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:bg-neutral-100/60 transition-colors px-4 -mx-4 rounded-lg"
            >
              {/* Project Image */}
              <div className="lg:col-span-6 overflow-hidden rounded-sm bg-neutral-200 aspect-16/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Project Metadata */}
              <div className="lg:col-span-6 lg:pl-8 space-y-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight font-syne text-neutral-900 group-hover:text-neutral-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-neutral-500 mt-2">
                    {project.dates}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-200">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne block mb-1">
                      Project Type
                    </span>
                    <span className="text-sm font-medium text-neutral-800">
                      {project.type}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-syne block mb-1">
                      Design Focus
                    </span>
                    <span className="text-sm text-neutral-700 leading-relaxed font-light block">
                      {project.focus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA button matching Screenshot 1 (Prompt 2) */}
        <div className="pt-16 text-center border-t border-neutral-300">
          <button
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-600 hover:border-neutral-500 transition-all"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

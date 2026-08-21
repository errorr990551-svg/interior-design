import { Layers } from 'lucide-react';

export default function MaterialsSection() {
  const materials = [
    {
      name: 'Rift-Sawn Oak & Walnut',
      category: 'Natural Timber',
      description: 'We favour honest engineered woods and natural grains that age with character rather than wearing out.',
      image: '/images/material_wood.jpg',
    },
    {
      name: 'Calacatta & Travertine Stone',
      category: 'Honed Marble',
      description: 'Honed surfaces specified for tactile warmth, subtle organic veining, and enduring timeless elegance.',
      image: '/images/material_stone.jpg',
    },
    {
      name: 'Champagne Brushed Brass',
      category: 'Architectural Hardware',
      description: 'Always brushed, never high-polished, creating a quieter finish that absorbs light with subtle luxury.',
      image: '/images/material_brass.jpg',
    },
    {
      name: 'Bouclé & Natural Linen',
      category: 'Tactile Textiles',
      description: 'Curated upholstery palettes chosen for comfort, breathability, and rich layered depth across rooms.',
      image: '/images/material_textile.jpg',
    },
  ];

  return (
    <section className="bg-[#0b0b0b] text-white py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
              <Layers className="w-3.5 h-3.5" />
              <span>MATERIAL HONESTY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight leading-tight">
              Materials & Craftsmanship
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
              Good interiors are decided as much by what you can't see as what you can: the ply behind a laminate, the hinge behind a shutter, the finish under a coat of paint. At 2BHK Interiors, every material recommendation in a mood board and every specification in a 3D visualization is chosen with longevity in mind, not just how it looks in a render.
            </p>
          </div>
        </div>

        {/* Material Texture Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((mat, idx) => (
            <div
              key={idx}
              className="group bg-[#141414] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-neutral-900">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-amber-300 rounded-full border border-white/10">
                  {mat.category}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-bold font-syne text-white group-hover:text-amber-200 transition-colors">
                  {mat.name}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {mat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

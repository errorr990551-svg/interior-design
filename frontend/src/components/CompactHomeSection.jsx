import { Ruler } from 'lucide-react';

// Practical planning advice for compact apartments. General guidance, not project claims.
const tips = [
  {
    title: 'Fix switch and socket points before carpentry',
    text: 'Bedside charging, the TV wall, a work-from-home desk and every kitchen appliance (mixer, microwave, chimney, water purifier, fridge) need a point in the right place. Moving one after panelling and cabinets are built means breaking finished work, so we mark them on the 2D plan.',
  },
  {
    title: 'Use the full height of the wall',
    text: 'Floor area is fixed; wall height is not. Lofts above wardrobes, doors and the kitchen take suitcases, festive decorations and seasonal clothes, which keeps everyday storage at arm’s reach free for daily use.',
  },
  {
    title: 'Choose shutters by the space in front of them',
    text: 'A hinged wardrobe door needs clear floor in front of it to open. Where a bed or desk sits close by, sliding shutters keep the walkway usable. This is one of the first things a scaled layout shows.',
  },
  {
    title: 'Make furniture do two jobs',
    text: 'A bed with drawer or hydraulic storage, a window seat with cabinets below, a wall-mounted desk that doubles as a dresser: in a compact flat, pieces that store as well as seat or sleep free up an entire cupboard.',
  },
  {
    title: 'Keep the floor visible',
    text: 'Wall-hung TV units, floating vanities and furniture on slim legs let you see more floor, which makes a small room read larger and makes daily mopping quicker.',
  },
  {
    title: 'Plan for the monsoon',
    text: 'Specify water-resistant ply where cabinets meet water, leave ventilation behind wardrobes on external walls, and plan a place to dry clothes indoors, such as a ceiling-mounted airer in the balcony or utility, before the layout is final.',
  },
];

export default function CompactHomeSection() {
  return (
    <section className="bg-[#f9f9f8] text-[#111111] py-24 sm:py-32 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest text-amber-700 bg-amber-100/80 px-3 py-1 rounded-full uppercase">
              <Ruler className="w-3.5 h-3.5" />
              <span>PLANNING NOTES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight leading-tight">
              Designing a Compact Mumbai Apartment
            </h2>
          </div>
          <p className="lg:col-span-7 text-sm sm:text-base text-neutral-600 leading-relaxed font-light self-end">
            Most Mumbai homes are apartments where every square foot is already spoken for. These are the decisions we look at first on any 1BHK, 2BHK or 3BHK layout, because getting them right on paper is far cheaper than fixing them after the carpenter has left.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, idx) => (
            <div key={tip.title} className="p-7 rounded-2xl bg-white border border-neutral-200 space-y-3">
              <span className="text-xs font-mono text-amber-700">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="text-lg font-bold font-syne tracking-tight">{tip.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-light">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

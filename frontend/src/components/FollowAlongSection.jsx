import { Instagram, ArrowUpRight } from 'lucide-react';

export default function FollowAlongSection() {
  const posts = [
    { image: '/images/home_hero_bg.jpg', tag: 'Living Sanctuary' },
    { image: '/images/service_3d_render.jpg', tag: '3D Bedroom Render' },
    { image: '/images/service_moodboard.jpg', tag: 'Material Swatches' },
    { image: '/images/material_wood.jpg', tag: 'Rift Oak Grain' },
    { image: '/images/about_banner.jpg', tag: 'Minimalist Studio' },
    { image: '/images/home_studio_desk.jpg', tag: 'Design Desk' },
  ];

  return (
    <section className="bg-[#0e0e0e] text-white py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-12">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-syne">
            <Instagram className="w-3.5 h-3.5" />
            <span>BEHIND THE SCENES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold font-syne tracking-tight">
            Follow Our Work
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light">
            More homes, more process, more behind-the-scenes, all over on Instagram.
          </p>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-amber-400 hover:text-black border border-white/20 text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300"
          >
            <span>@2bhkinteriors • Follow Us</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Instagram 6-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="group aspect-square relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.tag}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col items-center justify-center text-center">
                <Instagram className="w-6 h-6 text-amber-300 mb-2" />
                <span className="text-[10px] font-bold font-syne uppercase tracking-wider text-white">
                  {post.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
